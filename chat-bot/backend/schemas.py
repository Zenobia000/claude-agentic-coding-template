from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Literal
import time

class QueryRequest(BaseModel):
    """
    API 查詢請求模型
    """
    question: str
    top_k: Optional[int] = 3

class QueryResponse(BaseModel):
    """
    API 查詢響應模型
    """
    question: str
    answer: str
    sources: List[Dict]
    timestamp: str

class UploadResponse(BaseModel):
    """
    文件上傳響應模型
    """
    message: str
    files_processed: int
    total_chunks: int

class HealthCheckResponse(BaseModel):
    """
    健康檢查響應模型
    """
    service: str
    status: str
    version: str
    rag_ready: bool
    timestamp: str

# --- OpenAI-compatible Schemas ---

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: str
    messages: List[ChatMessage]
    stream: Optional[bool] = False

class ChatCompletionChoice(BaseModel):
    index: int
    message: ChatMessage
    finish_reason: str = "stop"

class ChatCompletionResponse(BaseModel):
    id: str = Field(default_factory=lambda: f"chatcmpl-{time.time()}")
    object: str = "chat.completion"
    created: int = Field(default_factory=lambda: int(time.time()))
    model: str
    choices: List[ChatCompletionChoice]
    usage: Dict[str, int] = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}

class ChatCompletionChunkChoice(BaseModel):
    index: int
    delta: ChatMessage
    finish_reason: Optional[str] = None

class ChatCompletionChunk(BaseModel):
    id: str = Field(default_factory=lambda: f"chatcmpl-{time.time()}")
    object: str = "chat.completion.chunk"
    created: int = Field(default_factory=lambda: int(time.time()))
    model: str = "gpt-3.5-turbo"
    choices: List[ChatCompletionChunkChoice]
