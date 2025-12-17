import logging
from datetime import datetime
from contextlib import asynccontextmanager
import time

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse

# 依賴注入和服務模組
from config import settings
from schemas import (
    QueryRequest, QueryResponse, HealthCheckResponse,
    ChatCompletionRequest, ChatCompletionResponse, ChatMessage, ChatCompletionChoice,
    ChatCompletionChunk, ChatCompletionChunkChoice
)
from rag_service import RAGService
from model_manager import model_manager

# 設定日誌
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- 全局變數 ---
lifespan_context = {}

# --- FastAPI 生命週期事件 ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI應用生命週期管理
    """
    logger.info("🚀 啟動RAG API服務... (Auto-reload enabled)")
    
    if not settings.OPENAI_API_KEY:
        logger.error("❌ 嚴重錯誤: OPENAI_API_KEY環境變數未設定。")
    
    rag_service = RAGService(settings=settings)
    # Run in background
    import asyncio
    asyncio.create_task(rag_service.init_rag())
    
    lifespan_context["rag_service"] = rag_service
    
    logger.info("📖 API文檔可在 /docs 查閱")
    
    yield
    
    logger.info(" gracefully shutting down...")
    lifespan_context.clear()

# --- 依賴注入 ---
def get_rag_service() -> RAGService:
    """
    依賴注入函數，獲取RAG服務實例。
    """
    service = lifespan_context.get("rag_service")
    if not service:
        raise HTTPException(status_code=503, detail="RAG服務尚未初始化。 সন")
    return service

# --- FastAPI應用實例 ---
app = FastAPI(
    title="OpenAI相容的RAG API服務",
    description="一個為Open-WebUI提供支援的、相容OpenAI API的RAG服務",
    version="3.0.0",
    lifespan=lifespan
)

# --- 中間件 ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API 端點 ---

# --- OpenAI相容端點 ---
@app.get("/v1/models")
async def list_models():
    """
    返回所有可用的模型列表。
    
    支持多個提供商（OpenAI、Anthropic、Google）的模型。
    每個對話模型都有兩個版本：
    - 原始模型 ID: 純 LLM 對話（不使用 RAG）
    - {model_id}-rag: RAG 模式（檢索文檔後回答）
    """
    return {
        "object": "list",
        "data": model_manager.get_models_list()
    }

@app.post("/v1/chat/completions")
async def chat_completions(
    request: ChatCompletionRequest,
    rag_service: RAGService = Depends(get_rag_service)
):
    """
    OpenAI 兼容的 chat completions API。
    
    支援多種模型和模式：
    - 使用模型 ID 不帶 -rag 後綴：純 LLM 對話
    - 使用模型 ID 帶 -rag 後綴：RAG 模式（檢索文檔後回答）
    
    支持的提供商：OpenAI, Anthropic, Google
    """
    # 使用 model_manager 判斷是否為 RAG 模式
    use_rag = model_manager.is_rag_model(request.model)
    base_model_id = model_manager.get_base_model_id(request.model)
    
    # RAG 模式需要等待初始化完成
    if use_rag and not rag_service.prompt:
        raise HTTPException(status_code=503, detail="RAG服務正在初始化，請稍後再試。 সন")
    
    # 檢查模型是否存在
    if not model_manager.get_model_info(request.model):
        raise HTTPException(
            status_code=400, 
            detail=f"模型 '{request.model}' 不存在。請使用 GET /v1/models 查看可用模型。"
        )
        
    last_user_message = next((msg.content for msg in reversed(request.messages) if msg.role == 'user'), None)
    
    if not last_user_message:
        raise HTTPException(status_code=400, detail="請求中沒有用戶消息。 সন")

    if request.stream:
        async def stream_generator():
            try:
                # 根據模式選擇處理方式
                if use_rag:
                    result = rag_service.query(last_user_message, model_id=base_model_id)
                else:
                    result = rag_service.chat(last_user_message, model_id=base_model_id)
                answer = result["answer"]
                
                # 第一個塊發送角色
                chunk = ChatCompletionChunk(
                    model=request.model,
                    choices=[ChatCompletionChunkChoice(
                        index=0, 
                        delta=ChatMessage(role='assistant', content=''),
                        finish_reason=None
                    )]
                )
                yield f"data: {chunk.model_dump_json()}\n\n"
                
                # 逐字發送內容
                for char in answer:
                    chunk = ChatCompletionChunk(
                        model=request.model,
                        choices=[ChatCompletionChunkChoice(
                            index=0, 
                            delta=ChatMessage(role='assistant', content=char),
                            finish_reason=None
                        )]
                    )
                    yield f"data: {chunk.model_dump_json()}\n\n"
                
                # 發送結束塊
                final_chunk = ChatCompletionChunk(
                    model=request.model,
                    choices=[ChatCompletionChunkChoice(
                        index=0,
                        delta=ChatMessage(role='assistant', content=''),
                        finish_reason='stop'
                    )]
                )
                yield f"data: {final_chunk.model_dump_json()}\n\n"
                
                # 結束標誌
                yield "data: [DONE]\n\n"
                
            except Exception as e:
                logger.error(f"Streaming error: {e}", exc_info=True)
                error_chunk = {"error": str(e)}
                yield f"data: {error_chunk}\n\n"
        
        return StreamingResponse(stream_generator(), media_type="text/event-stream")
    else:
        # 根據模式選擇處理方式
        if use_rag:
            result = rag_service.query(last_user_message, model_id=base_model_id)
        else:
            result = rag_service.chat(last_user_message, model_id=base_model_id)
        
        response_message = ChatMessage(role="assistant", content=result["answer"])
        choice = ChatCompletionChoice(index=0, message=response_message)
        
        return ChatCompletionResponse(model=request.model, choices=[choice])

# --- 原有端點 ---
@app.get("/health", response_model=HealthCheckResponse, summary="健康檢查")
async def health_check(rag_service: RAGService = Depends(get_rag_service)):
    is_rag_ready = rag_service.prompt is not None
    service_status = "healthy" if is_rag_ready else "degraded"
    
    return HealthCheckResponse(
        service="模組化RAG API",
        status=service_status,
        version=app.version,
        rag_ready=is_rag_ready,
        timestamp=datetime.now().isoformat()
    )

@app.post("/query", response_model=QueryResponse, summary="RAG問答（舊版）")
async def query_documents(
    request: QueryRequest,
    rag_service: RAGService = Depends(get_rag_service)
):
    if not rag_service.prompt:
        raise HTTPException(status_code=503, detail="RAG服務正在初始化，請稍後再試。 সন")
    try:
        result = rag_service.query(request.question, request.top_k)
        return QueryResponse(**result)
    except Exception as e:
        logger.error(f"查詢處理失敗: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="伺服器發生內部錯誤。 সন")
