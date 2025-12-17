import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    """
    應用程式設定
    """
    # API Keys for multiple providers
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    
    # Ollama (local models)
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")

    # Default LLM 模型 (用於向後兼容)
    LLM_MODEL_NAME: str = "gpt-4o-mini"
    LLM_TEMPERATURE: float = 0.0

    # Embedding 模型 (用於 RAG)
    EMBEDDING_MODEL: str = "text-embedding-3-small"

    # 文檔路徑
    PAPERS_PATH: str = "/app/papers"

    # 文本分割
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200

    # Qdrant
    QDRANT_URL: str = "http://qdrant:6333"
    QDRANT_COLLECTION_NAME: str = "olmocr_documents"

    # API 服務
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

# 創建一個全局可用的設定實例
settings = Settings()
