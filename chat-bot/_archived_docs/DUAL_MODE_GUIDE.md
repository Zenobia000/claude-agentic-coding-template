# 雙模式功能說明

## 功能概述

本系統提供兩種對話模式，用戶可以在 Open WebUI 中通過選擇不同的模型來切換：

| 模型名稱 | 模式 | 特點 | 適用場景 |
|---------|------|------|---------|
| `gpt-3.5-turbo` | 純 LLM 對話 | 不檢索文檔，直接回答 | 一般問題、閒聊、創意討論 |
| `gpt-3.5-turbo-rag` | RAG 模式 | 檢索文檔知識庫後回答 | 專業問題、文檔查詢、知識問答 |

## 架構設計

### 1. 模型列表 API

**Endpoint:** `GET /v1/models`

返回兩個虛擬模型：

```json
{
  "object": "list",
  "data": [
    {
      "id": "gpt-3.5-turbo",
      "object": "model",
      "description": "純 LLM 對話模式"
    },
    {
      "id": "gpt-3.5-turbo-rag",
      "object": "model",
      "description": "RAG 模式（基於文檔知識回答）"
    }
  ]
}
```

### 2. 智能路由

**Endpoint:** `POST /v1/chat/completions`

根據 `request.model` 字段自動路由：

```python
use_rag = request.model.endswith("-rag")

if use_rag:
    result = rag_service.query(question)  # RAG 模式
else:
    result = rag_service.chat(question)   # 純 LLM 模式
```

### 3. 處理流程對比

#### 純 LLM 模式流程
```
用戶提問
    ↓
直接調用 LLM
    ↓
返回答案
```

#### RAG 模式流程
```
用戶提問
    ↓
查詢向量化 (Embedding)
    ↓
Qdrant 向量搜索
    ↓
提取相關文檔
    ↓
構建 Context + Question
    ↓
LLM 生成回答
    ↓
返回答案 + 來源
```

## 使用方法

### 在 Open WebUI 中使用

1. 登入 Open WebUI
2. 點擊頂部的模型選擇下拉選單
3. 根據需求選擇模型：
   - **一般對話** → 選擇 `gpt-3.5-turbo`
   - **文檔問答** → 選擇 `gpt-3.5-turbo-rag`
4. 開始對話

### 通過 API 調用

**純 LLM 模式：**
```bash
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

**RAG 模式：**
```bash
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo-rag",
    "messages": [{"role": "user", "content": "請總結文檔內容"}]
  }'
```

## 實現細節

### 核心代碼

**`rag_service.py` - 純 LLM 對話方法：**
```python
def chat(self, question: str) -> Dict:
    """純 LLM 對話：不使用 RAG 檢索"""
    message = HumanMessage(content=question)
    answer = self.llm.invoke([message]).content
    
    return {
        "question": question,
        "answer": answer,
        "sources": [],  # 無來源文檔
        "timestamp": datetime.now().isoformat()
    }
```

**`rag_service.py` - RAG 查詢方法：**
```python
def query(self, question: str, top_k: int = 3) -> Dict:
    """執行 RAG 查詢：檢索 + 生成"""
    # 1. 向量化查詢
    query_vector = self.embeddings.embed_query(question)
    
    # 2. 搜索相似文檔
    search_results = self.qdrant_client.query_points(...)
    
    # 3. 構建上下文
    context = "\n\n".join(context_texts)
    
    # 4. LLM 生成
    messages = self.prompt.format_messages(context=context, question=question)
    answer = self.llm.invoke(messages).content
    
    return {
        "question": question,
        "answer": answer,
        "sources": sources,  # 包含來源文檔
        "timestamp": datetime.now().isoformat()
    }
```

## 優勢

1. **用戶友好** - 通過熟悉的模型選擇界面控制
2. **無需修改前端** - 完全兼容 Open WebUI
3. **靈活切換** - 隨時根據需求切換模式
4. **性能優化** - 一般問題無需檢索，節省資源
5. **擴展性強** - 易於添加更多模式（如混合模式）

## 未來擴展

可以考慮添加更多模式：

- `gpt-3.5-turbo-smart` - 自動判斷是否需要 RAG
- `gpt-3.5-turbo-hybrid` - 混合模式（檢索 + 一般對話）
- `gpt-4-rag` - 使用 GPT-4 的 RAG 模式

## 日誌監控

可以通過日誌區分不同模式的調用：

```bash
# 查看 RAG 查詢
docker compose logs backend | grep "RAG 查詢完成"

# 查看純 LLM 對話
docker compose logs backend | grep "純 LLM 對話完成"
```

## 故障排除

**問題：看不到兩個模型**
- 檢查 `/v1/models` API 返回
- 刷新 Open WebUI 頁面
- 檢查後端日誌是否有錯誤

**問題：RAG 模式返回 503 錯誤**
- RAG 服務可能還在初始化
- 檢查 Qdrant 集合是否存在
- 查看後端健康檢查：`curl http://localhost:8000/health`

