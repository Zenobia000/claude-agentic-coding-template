# 快速開始指南

## 最小化配置（僅 OpenAI）

### 步驟 1：設置 API Key

在專案**根目錄**創建或編輯 `.env` 文件：

```bash
cd /home/os-sunnie.gd.weng/python_workstation/side-project/RAG/RAG_full_tech_overview

# 編輯 .env 文件
nano .env
```

添加：

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```

### 步驟 2：啟動服務

```bash
cd 05-project-development
docker compose up -d
```

### 步驟 3：訪問

打開瀏覽器：`http://localhost:8081`

**可用模型（僅 OpenAI，共 16 個）：**
- **對話模型**：`gpt-4o-mini`, `gpt-4.1-mini`, `gpt-4.1-nano` 等
- **RAG 版本**：每個模型都有對應的 `-rag` 版本
- **推理模型**：`o3-mini`, `o4-mini`, `o4-mini-deep-research` 等
- **本地模型（Ollama）**：可在 Open WebUI 中下載開源模型（完全免費）

**注意：** 
- Embedding 和音頻模型不會顯示在列表中
- Embedding 模型在 RAG 功能中自動使用
- Ollama 服務已啟用，但需要手動下載模型（見下方）

---

## 快速下載本地模型（Ollama，可選）

### 在 Open WebUI 中下載（推薦）

1. 訪問 `http://localhost:8081`
2. 點擊右上角頭像 → Settings → Models
3. 在 "Pull a model from Ollama.com" 輸入模型名稱：
   - `llama3.2:3b` - 快速輕量（約 2GB）
   - `qwen2.5:7b` - 中文友好（約 5GB）
   - `mistral:7b` - 推理能力強（約 4GB）
4. 點擊下載，等待完成
5. 回到主頁面，在模型選擇中即可看到

### 通過命令行下載

```bash
# 下載 Llama 3.2 (3B) - 推薦新手
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b

# 查看已下載的模型
docker exec 05-project-development-ollama-1 ollama list
```

**詳細說明**：查看 [OLLAMA_GUIDE.md](OLLAMA_GUIDE.md)

---

## 完整配置（OpenAI + Anthropic + Google）

### 步驟 1：設置所有 API Keys

編輯 `.env` 文件（在專案根目錄）：

```bash
# OpenAI (必須)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx

# Anthropic (可選)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# Google (可選)
GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
```

### 步驟 2：重啟服務

```bash
cd 05-project-development
docker compose restart backend
```

### 步驟 3：驗證

檢查可用模型：

```bash
curl http://localhost:8000/v1/models | python3 -m json.tool | grep '"id"'
```

現在你應該能看到來自三個提供商的所有模型！

---

## 常見問題

### Q: 為什麼我看不到 Anthropic/Google 的模型？

**A:** 檢查以下項目：

1. **API Key 是否設置？**
```bash
# 在專案根目錄
cat .env | grep API_KEY
```

2. **服務是否重啟？**
```bash
cd 05-project-development
docker compose restart backend
```

3. **查看日誌：**
```bash
docker compose logs backend | grep "API_KEY"
```

如果看到 `⚠️ ANTHROPIC_API_KEY 未設定`，表示 API Key 沒有正確設置。

### Q: 如何添加新模型？

**A:** 編輯 `backend/models_config.json`，然後重啟：

```bash
# 編輯配置
nano backend/models_config.json

# 重啟服務
docker compose restart backend
```

### Q: 如何測試某個模型？

**A:** 使用 curl 測試：

```bash
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Q: RAG 模式不工作？

**A:** 檢查 RAG 系統狀態：

```bash
# 健康檢查
curl http://localhost:8000/health

# 應該看到 "rag_ready": true
```

如果 `rag_ready: false`，需要先在 `04-embedding-application` 中建立向量索引。

---

## 推薦模型

### 一般對話
- `gpt-4o-mini` - 便宜、快速
- `claude-haiku-4-5` - 質量好、成本低

### 文檔問答（RAG）
- `gpt-4o-mini-rag` - 推薦，性價比高
- `claude-sonnet-4-5-rag` - 高質量回答

### 複雜推理
- `o3-mini` - OpenAI 推理模型
- `claude-sonnet-4-5` - 適合編程和分析

### 長上下文
- `gemini-1.5-pro` - 支持超長上下文

---

## 下一步

1. **查看完整文檔**:
   - [MODEL_MANAGEMENT_GUIDE.md](MODEL_MANAGEMENT_GUIDE.md) - 模型管理
   - [DUAL_MODE_GUIDE.md](DUAL_MODE_GUIDE.md) - 雙模式說明
   - [README.md](README.md) - 專案總覽

2. **探索 API**:
   - Swagger UI: `http://localhost:8000/docs`
   - 模型列表: `http://localhost:8000/v1/models`

3. **監控日誌**:
```bash
docker compose logs -f backend
```

祝使用愉快！ 🚀

