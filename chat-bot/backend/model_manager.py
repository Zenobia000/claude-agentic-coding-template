"""
模型管理器
負責加載模型配置、生成模型列表、創建 LLM 實例
"""
import json
import logging
import os
from typing import Dict, List, Optional, Any
from pathlib import Path

logger = logging.getLogger(__name__)

class ModelManager:
    def __init__(self, config_path: str = "models_config.json"):
        self.config_path = config_path
        self.models_config = self._load_config()
        self.available_models = self._generate_available_models()
        
    def _load_config(self) -> Dict:
        """載入模型配置文件"""
        try:
            config_file = Path(__file__).parent / self.config_path
            with open(config_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
            logger.info(f"✅ 成功載入模型配置: {self.config_path}")
            return config
        except Exception as e:
            logger.error(f"❌ 載入模型配置失敗: {e}")
            return {}
    
    def _generate_available_models(self) -> List[Dict]:
        """
        生成可用模型列表
        對於 chat_multimodal 和 reasoning 類型，自動生成兩個版本：
        1. 原始模型 (純 LLM)
        2. {model_id}-rag (RAG 模式)
        """
        models = []
        
        for provider, categories in self.models_config.items():
            # Ollama 不需要 API Key，檢查 BASE_URL
            if provider == "ollama":
                ollama_url = os.getenv("OLLAMA_BASE_URL")
                if not ollama_url:
                    logger.warning(f"⚠️ OLLAMA_BASE_URL 未設定，跳過 ollama 模型")
                    continue
                # 檢查 Ollama 服務是否可用
                try:
                    import requests
                    response = requests.get(f"{ollama_url}/api/tags", timeout=2)
                    if response.status_code != 200:
                        logger.warning(f"⚠️ Ollama 服務未就緒，跳過 ollama 模型")
                        continue
                except Exception as e:
                    logger.warning(f"⚠️ 無法連接 Ollama 服務: {e}，跳過 ollama 模型")
                    continue
            else:
                # 其他提供商檢查 API Key
                api_key_name = f"{provider.upper()}_API_KEY"
                if not os.getenv(api_key_name):
                    logger.warning(f"⚠️ {api_key_name} 未設定，跳過 {provider} 模型")
                    continue
            
            for category, model_list in categories.items():
                # 只對對話類型的模型生成 RAG 版本
                generate_rag_version = category in ["chat_multimodal", "reasoning"]
                
                for model in model_list:
                    model_id = model["id"]
                    tags = model.get("tags", [])
                    
                    # 原始模型 (純 LLM)
                    models.append({
                        "id": model_id,
                        "object": "model",
                        "created": 1234567890,
                        "owned_by": provider,
                        "provider": provider,
                        "category": category,
                        "label": model.get("label", model_id),
                        "tags": tags,
                        "rag_enabled": False
                    })
                    
                    # RAG 版本
                    if generate_rag_version:
                        rag_model_id = f"{model_id}-rag"
                        models.append({
                            "id": rag_model_id,
                            "object": "model",
                            "created": 1234567890,
                            "owned_by": provider,
                            "provider": provider,
                            "category": category,
                            "label": f"{model.get('label', model_id)}_rag",
                            "tags": tags + ["rag"],
                            "rag_enabled": True,
                            "base_model": model_id
                        })
        
        logger.info(f"✅ 生成 {len(models)} 個可用模型")
        return models
    
    def get_models_list(self) -> List[Dict]:
        """
        返回用戶可選擇的模型列表（用於 /v1/models API）
        
        排除以下類型：
        - embedding: RAG 底層技術，用戶無需選擇
        - audio_realtime: 語音功能暫不開放
        """
        # 排除的類型
        excluded_categories = ["embedding", "audio_realtime"]
        
        return [
            {
                "id": model["id"],
                "object": model["object"],
                "created": model["created"],
                "owned_by": model["owned_by"]
            }
            for model in self.available_models
            if model.get("category") not in excluded_categories
        ]
    
    def get_model_info(self, model_id: str) -> Optional[Dict]:
        """獲取特定模型的詳細信息"""
        for model in self.available_models:
            if model["id"] == model_id:
                return model
        return None
    
    def is_rag_model(self, model_id: str) -> bool:
        """判斷是否為 RAG 模型"""
        model_info = self.get_model_info(model_id)
        if model_info:
            return model_info.get("rag_enabled", False)
        # 向後兼容：檢查是否以 -rag 結尾
        return model_id.endswith("-rag")
    
    def get_base_model_id(self, model_id: str) -> str:
        """
        獲取基礎模型 ID（去除 -rag 後綴）
        用於實際調用 LLM API
        """
        model_info = self.get_model_info(model_id)
        if model_info and model_info.get("rag_enabled"):
            return model_info.get("base_model", model_id.replace("-rag", ""))
        return model_id
    
    def get_provider(self, model_id: str) -> Optional[str]:
        """獲取模型的提供商"""
        model_info = self.get_model_info(model_id)
        if model_info:
            return model_info.get("provider")
        return None
    
    def create_llm(self, model_id: str, temperature: float = 0.0):
        """
        根據模型 ID 創建對應的 LLM 實例
        """
        provider = self.get_provider(model_id)
        base_model_id = self.get_base_model_id(model_id)
        
        if not provider:
            raise ValueError(f"未知的模型: {model_id}")
        
        try:
            if provider == "openai":
                from langchain_openai import ChatOpenAI
                api_key = os.getenv("OPENAI_API_KEY")
                return ChatOpenAI(
                    model_name=base_model_id,
                    temperature=temperature,
                    api_key=api_key
                )
            
            elif provider == "anthropic":
                from langchain_anthropic import ChatAnthropic
                api_key = os.getenv("ANTHROPIC_API_KEY")
                return ChatAnthropic(
                    model=base_model_id,
                    temperature=temperature,
                    api_key=api_key
                )
            
            elif provider == "google":
                from langchain_google_genai import ChatGoogleGenerativeAI
                api_key = os.getenv("GOOGLE_API_KEY")
                return ChatGoogleGenerativeAI(
                    model=base_model_id,
                    temperature=temperature,
                    google_api_key=api_key
                )
            
            elif provider == "ollama":
                from langchain_ollama import ChatOllama
                ollama_url = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")
                return ChatOllama(
                    model=base_model_id,
                    temperature=temperature,
                    base_url=ollama_url
                )
            
            else:
                raise ValueError(f"不支援的提供商: {provider}")
                
        except ImportError as e:
            logger.error(f"❌ 缺少必要的依賴: {e}")
            logger.info(f"💡 請安裝對應的套件，例如: pip install langchain-{provider}")
            raise
        except Exception as e:
            logger.error(f"❌ 創建 LLM 實例失敗: {e}")
            raise
    
    def get_models_by_tag(self, tag: str) -> List[Dict]:
        """根據標籤篩選模型"""
        return [
            model for model in self.available_models
            if tag in model.get("tags", [])
        ]
    
    def get_models_by_provider(self, provider: str) -> List[Dict]:
        """根據提供商篩選模型"""
        return [
            model for model in self.available_models
            if model.get("provider") == provider
        ]
    
    def get_chat_models(self) -> List[Dict]:
        """獲取所有對話模型"""
        return [
            model for model in self.available_models
            if model.get("category") in ["chat_multimodal", "reasoning"]
        ]
    
    def get_embedding_models(self) -> List[Dict]:
        """
        獲取所有 embedding 模型
        
        注意：這些模型不會顯示在 /v1/models API 中，
        但仍然可以通過此方法獲取，用於 RAG 系統內部使用
        """
        return [
            model for model in self.available_models
            if model.get("category") == "embedding"
        ]

# 創建全局實例
model_manager = ModelManager()

