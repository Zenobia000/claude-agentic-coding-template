# 多模型管理維運指南

## 架構概覽

本系統支持多個 LLM 提供商（OpenAI、Anthropic、Google）的模型，並為每個對話模型自動生成 RAG 版本。

```
models_config.json          # 模型配置文件（集中管理）
    ↓
model_manager.py            # 模型管理器（加載、創建、路由）
    ↓
rag_service.py              # RAG 服務（動態使用不同模型）
    ↓
main.py                     # API 端點（接收請求並路由）
```

## 配置文件結構

### models_config.json

```json
{
  "提供商名稱": {
    "模型類型": [
      {
        "id": "模型ID",
        "label": "顯示標籤",
        "tags": ["標籤1", "標籤2"]
      }
    ]
  }
}
```

**支持的模型類型：**
- `chat_multimodal` - 多模態對話模型（自動生成 RAG 版本）✅ **用戶可選**
- `reasoning` - 推理模型（自動生成 RAG 版本）✅ **用戶可選**
- `embedding` - 嵌入模型（僅用於向量化）❌ **內部使用，不顯示給用戶**
- `audio_realtime` - 實時音頻模型 ❌ **暫不開放**

**設計決策：**
- **Embedding 模型**：RAG 底層技術，在內部自動使用，用戶無需選擇
- **Audio 模型**：語音功能暫時關閉，不在列表中顯示
- **對話/推理模型**：用戶可在 Open WebUI 中自由選擇

## 環境變數配置

在 `.env` 文件中設置 API Keys：

```bash
# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx

# Anthropic
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# Google
GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
```

**注意：**
- 只有設置了對應 API Key 的提供商才會加載模型
- 未設置 API Key 的提供商會自動跳過

## 模型命名規則

### 原始模型（純 LLM）
- 使用配置文件中的原始 `id`
- 例如：`gpt-4o-mini`, `claude-sonnet-4-5`, `gemini-2.5-flash`

### RAG 版本
- 在原始 `id` 後加 `-rag` 後綴
- 例如：`gpt-4o-mini-rag`, `claude-sonnet-4-5-rag`, `gemini-2.5-flash-rag`

### 自動生成與顯示規則

| 模型類型 | 生成 RAG 版本 | 顯示給用戶 | 說明 |
|---------|-------------|----------|------|
| `chat_multimodal` | ✅ | ✅ | 對話模型，用戶可選 |
| `reasoning` | ✅ | ✅ | 推理模型，用戶可選 |
| `embedding` | ❌ | ❌ | RAG 內部使用，不顯示 |
| `audio_realtime` | ❌ | ❌ | 語音功能暫不開放 |

**過濾機制：**
```python
# model_manager.py 中的過濾邏輯
excluded_categories = ["embedding", "audio_realtime"]

# 只返回對話和推理模型給用戶選擇
return [model for model in models 
        if model["category"] not in excluded_categories]
```

## 添加新模型

### 步驟 1：編輯配置文件

編輯 `backend/models_config.json`：

```json
{
  "openai": {
    "chat_multimodal": [
      {
        "id": "gpt-5-turbo",           // 新模型
        "label": "openai_gpt_5_turbo",
        "tags": ["chat", "multimodal", "next_gen"]
      }
    ]
  }
}
```

### 步驟 2：重啟服務

```bash
docker compose restart backend
```

**就這樣！** 不需要修改任何代碼。

### 系統自動完成：
- ✅ 加載新模型
- ✅ 生成 `gpt-5-turbo` (純 LLM)
- ✅ 生成 `gpt-5-turbo-rag` (RAG 模式)
- ✅ 在 `/v1/models` API 中顯示
- ✅ 在 Open WebUI 中可選擇

## 添加新提供商

### 步驟 1：添加配置

在 `models_config.json` 添加新提供商：

```json
{
  "cohere": {
    "chat_multimodal": [
      {
        "id": "command-r-plus",
        "label": "cohere_command_r_plus",
        "tags": ["chat", "multilingual"]
      }
    ]
  }
}
```

### 步驟 2：添加 API Key

在 `.env` 添加：

```bash
COHERE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
```

### 步驟 3：更新 config.py

```python
class Settings(BaseSettings):
    # ... 其他配置 ...
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY", "")
```

### 步驟 4：更新 model_manager.py

在 `create_llm()` 方法中添加：

```python
elif provider == "cohere":
    from langchain_cohere import ChatCohere
    api_key = os.getenv("COHERE_API_KEY")
    return ChatCohere(
        model=base_model_id,
        temperature=temperature,
        cohere_api_key=api_key
    )
```

### 步驟 5：更新 requirements.txt

```bash
langchain-cohere==x.x.x
```

### 步驟 6：重新構建

```bash
docker compose up -d --build backend
```

## 模型管理 API

### 列出用戶可選模型

```bash
curl http://localhost:8000/v1/models | jq .
```

**注意：** 此 API 只返回用戶可選擇的模型（對話和推理模型）。Embedding 和 Audio 模型不會顯示，但 embedding 模型仍在內部用於 RAG 功能。

### 按標籤篩選（開發用）

```python
# 獲取所有快速模型
fast_models = model_manager.get_models_by_tag("fast")

# 獲取所有 RAG 適用模型
rag_models = model_manager.get_models_by_tag("good_for_RAG")

# 獲取特定提供商的模型
anthropic_models = model_manager.get_models_by_provider("anthropic")
```

## 維運最佳實踐

### 1. 定期更新模型列表

當提供商發布新模型時：
1. 更新 `models_config.json`
2. 重啟 backend 服務
3. 驗證新模型可用：`curl http://localhost:8000/v1/models`

### 2. 監控 API Key 使用

```bash
# 檢查哪些提供商可用
docker compose logs backend | grep "API_KEY 未設定"
```

### 3. 成本控制

使用 `tags` 標記模型成本：

```json
{
  "id": "gpt-4o-mini",
  "tags": ["cheap", "good_for_RAG"]
}
```

然後在應用中優先推薦 `cheap` 標籤的模型。

### 4. 版本管理

對於需要固定版本的場景：

```json
{
  "id": "gpt-4o-mini-2024-07-18",
  "label": "openai_gpt_4o_mini_20240718",
  "tags": ["version_pinned"]
}
```

### 5. 日誌監控

```bash
# 查看哪些模型被使用
docker compose logs backend | grep "純 LLM 對話完成\|RAG 查詢完成"

# 查看模型創建日誌
docker compose logs backend | grep "創建 LLM"
```

## 故障排除

### 問題：模型不顯示在列表中

**檢查清單：**
1. ✅ `models_config.json` 語法正確（JSON 格式）
2. ✅ 對應的 API Key 已設置
3. ✅ Backend 服務已重啟
4. ✅ 檢查日誌：`docker compose logs backend | grep "載入模型配置"`

### 問題：調用模型時報錯

**可能原因：**
1. API Key 無效或過期
2. 模型 ID 拼寫錯誤
3. 缺少對應的 langchain 套件

**調試：**
```bash
# 查看錯誤詳情
docker compose logs backend | tail -50

# 測試特定模型
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "test"}]
  }'
```

### 問題：RAG 版本不工作

**檢查：**
1. Qdrant 集合是否存在且有數據
2. 檢查健康檢查：`curl http://localhost:8000/health`
3. 查看 RAG 初始化日誌

## 性能優化

### 1. 模型緩存

`model_manager` 會在首次調用時創建 LLM 實例，可以考慮添加緩存機制：

```python
# 在 ModelManager 中添加
self.llm_cache = {}

def create_llm(self, model_id: str, temperature: float = 0.0):
    cache_key = f"{model_id}_{temperature}"
    if cache_key not in self.llm_cache:
        self.llm_cache[cache_key] = self._create_llm_instance(...)
    return self.llm_cache[cache_key]
```

### 2. 按需加載

默認情況下，模型在調用時才創建，避免啟動時的開銷。

### 3. 選擇合適的模型

- 一般對話 → `gpt-4o-mini`, `claude-haiku-4-5`
- RAG 查詢 → 標記為 `good_for_RAG` 的模型
- 複雜推理 → `reasoning` 類型的模型

## 安全建議

### 1. API Key 保護

- ❌ 不要提交 `.env` 到版本控制
- ✅ 使用 `.env.example` 作為模板
- ✅ 使用 secrets 管理工具（生產環境）

### 2. 模型訪問控制

可以在 `main.py` 中添加模型訪問權限檢查：

```python
ALLOWED_MODELS = os.getenv("ALLOWED_MODELS", "").split(",")

if ALLOWED_MODELS and request.model not in ALLOWED_MODELS:
    raise HTTPException(403, "模型訪問受限")
```

### 3. 成本監控

記錄每次請求的模型使用：

```python
logger.info(f"Model used: {request.model}, User: {user_id}")
```

## 擴展功能

### 自動模型路由

根據問題類型自動選擇最佳模型：

```python
def suggest_model(question: str) -> str:
    if "code" in question.lower():
        return "claude-sonnet-4-5"  # 適合編程
    elif len(question) > 500:
        return "gemini-1.5-pro"      # 長上下文
    else:
        return "gpt-4o-mini"          # 一般用途
```

### A/B 測試

同時使用多個模型並比較結果：

```python
models = ["gpt-4o-mini", "claude-haiku-4-5"]
results = [rag_service.chat(question, m) for m in models]
```

## 總結

這個多模型架構的優勢：

- ✅ **易於維護** - 集中配置，無需修改代碼
- ✅ **易於擴展** - 添加新模型只需編輯 JSON
- ✅ **靈活選擇** - 用戶可在 UI 中自由切換
- ✅ **自動 RAG** - 每個模型自動生成 RAG 版本
- ✅ **多提供商** - 支持任意數量的 LLM 提供商
- ✅ **成本可控** - 通過標籤管理模型成本

