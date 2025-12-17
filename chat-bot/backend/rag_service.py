import os
import logging
from typing import Dict, List, Optional
from datetime import datetime

from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from qdrant_client import QdrantClient
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage

# 從同級目錄導入
from config import Settings
from model_manager import model_manager

# 設定日誌
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def elements_to_markdown(elements: List) -> str:
    """將 unstructured 元素轉換為 Markdown 格式"""
    markdown_lines = []
    for element in elements:
        elem_type = element.category
        text = element.text.strip()
        
        if not text:
            continue
        
        if elem_type == "Title":
            markdown_lines.append(f"## {text}\n")
        elif elem_type == "ListItem":
            markdown_lines.append(f"- {text}\n")
        else:
            markdown_lines.append(f"{text}\n")
    
    return "\n".join(markdown_lines)

class RAGService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.qa_chain = None
        self.retriever = None
        self.model_manager = model_manager

        # 初始化核心組件
        self.embeddings = OpenAIEmbeddings(model=self.settings.EMBEDDING_MODEL)
        # 預設 LLM (用於向後兼容)
        self.default_llm = None
        try:
            self.default_llm = model_manager.create_llm(
                self.settings.LLM_MODEL_NAME,
                self.settings.LLM_TEMPERATURE
            )
        except Exception as e:
            logger.warning(f"⚠️ 無法創建預設 LLM: {e}")
        
        self.qdrant_client = QdrantClient(url=self.settings.QDRANT_URL)

        logger.info("✅ RAG 服務核心組件初始化完成")

    async def init_rag(self) -> bool:
        """
        初始化RAG系統：檢查 Qdrant 中是否有數據並建立 QA 鏈。
        """
        try:
            # 檢查集合是否存在
            collection_exists = self.qdrant_client.collection_exists(self.settings.QDRANT_COLLECTION_NAME)

            if not collection_exists:
                logger.warning(f"❌ Qdrant 集合 '{self.settings.QDRANT_COLLECTION_NAME}' 不存在")
                logger.info("💡 請先在 04-embedding-application 中建立向量索引")
                return False

            # 檢查集合中是否有數據
            collection_info = self.qdrant_client.get_collection(self.settings.QDRANT_COLLECTION_NAME)
            if collection_info.points_count == 0:
                logger.warning(f"❌ Qdrant 集合 '{self.settings.QDRANT_COLLECTION_NAME}' 中沒有數據")
                logger.info("💡 請先在 04-embedding-application 中載入文檔數據")
                return False

            logger.info(f"✅ Qdrant 集合 '{self.settings.QDRANT_COLLECTION_NAME}' 可用，包含 {collection_info.points_count} 個向量")

            # 創建QA鏈
            template = """你是一個問答助手。根據以下檢索到的文檔內容來回答問題。
如果檢索到的文檔中沒有相關信息，請明確說明。

Context: {context}

Question: {question}

Answer:"""

            self.prompt = ChatPromptTemplate.from_template(template)

            logger.info("✅ RAG服務初始化成功")
            return True

        except Exception as e:
            logger.error(f"RAG服務初始化失敗: {e}", exc_info=True)
            return False

    def query(self, question: str, model_id: Optional[str] = None, top_k: int = 3) -> Dict:
        """
        執行RAG查詢：將查詢向量化，在 Qdrant 中搜索，用 LLM 生成回答。
        
        Args:
            question: 用戶問題
            model_id: 指定使用的模型 ID，如果為 None 則使用預設模型
            top_k: 檢索的文檔數量
        """
        if not self.prompt:
            raise RuntimeError("RAG系統未初始化，無法執行查詢。")

        try:
            # 獲取 LLM 實例
            llm = self._get_llm(model_id)
            
            # 1. 將查詢轉換為向量
            query_vector = self.embeddings.embed_query(question)
            logger.info(f"✅ 查詢向量化完成，維度: {len(query_vector)}")

            # 2. 在 Qdrant 中搜索相似向量
            search_results = self.qdrant_client.query_points(
                collection_name=self.settings.QDRANT_COLLECTION_NAME,
                query=query_vector,
                with_payload=True,
                limit=top_k
            ).points
            logger.info(f"✅ 找到 {len(search_results)} 個相關文檔")

            # 3. 準備上下文
            context_texts = []
            sources = []

            for hit in search_results:
                content = hit.payload.get('page_content', '')
                metadata = hit.payload.get('metadata', {})

                context_texts.append(content)
                sources.append({
                    "content": content[:500] + "..." if len(content) > 500 else content,
                    "metadata": metadata,
                    "score": hit.score
                })

            context = "\n\n".join(context_texts)

            # 4. 用 LLM 生成回答
            messages = self.prompt.format_messages(context=context, question=question)
            answer = llm.invoke(messages).content

            logger.info(f"✅ RAG 查詢完成 (model: {model_id or 'default'})")
            return {
                "question": question,
                "answer": answer,
                "sources": sources,
                "model": model_id or self.settings.LLM_MODEL_NAME,
                "timestamp": datetime.now().isoformat()
            }

        except Exception as e:
            logger.error(f"執行查詢時出錯: {e}", exc_info=True)
            raise RuntimeError(f"查詢失敗: {str(e)}")
    
    def chat(self, question: str, model_id: Optional[str] = None) -> Dict:
        """
        純 LLM 對話：不使用 RAG 檢索，直接用 LLM 回答。
        適用於一般性問題、閒聊等不需要文檔知識的場景。
        
        Args:
            question: 用戶問題
            model_id: 指定使用的模型 ID，如果為 None 則使用預設模型
        """
        try:
            # 獲取 LLM 實例
            llm = self._get_llm(model_id)
            
            # 直接用 LLM 回答，不檢索文檔
            message = HumanMessage(content=question)
            answer = llm.invoke([message]).content
            
            logger.info(f"✅ 純 LLM 對話完成 (model: {model_id or 'default'})")
            return {
                "question": question,
                "answer": answer,
                "sources": [],  # 純對話模式沒有來源文檔
                "model": model_id or self.settings.LLM_MODEL_NAME,
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            logger.error(f"執行對話時出錯: {e}", exc_info=True)
            raise RuntimeError(f"對話失敗: {str(e)}")
    
    def _get_llm(self, model_id: Optional[str] = None):
        """
        獲取 LLM 實例
        
        Args:
            model_id: 模型 ID，如果為 None 則使用預設模型
        
        Returns:
            LLM 實例
        """
        if model_id is None:
            if self.default_llm is None:
                raise RuntimeError("預設 LLM 未初始化")
            return self.default_llm
        
        # 動態創建 LLM
        try:
            return self.model_manager.create_llm(model_id, self.settings.LLM_TEMPERATURE)
        except Exception as e:
            logger.error(f"創建 LLM 失敗 ({model_id}): {e}")
            # 回退到預設 LLM
            logger.warning(f"回退到預設 LLM")
            if self.default_llm is None:
                raise RuntimeError("預設 LLM 未初始化且無法創建指定模型")
            return self.default_llm