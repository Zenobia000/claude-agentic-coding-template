# RAG 系統開發實戰

生產級 RAG (Retrieval-Augmented Generation) 系統，支持多模型、多知識庫、本地模型。

## 🚀 5 分鐘快速開始

### 1. 設置 API Key

在**專案根目錄**創建 `.env`：

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```

### 2. 啟動服務

```bash
cd 05-project-development
docker compose up -d
```

### 3. 訪問界面

打開瀏覽器：**http://localhost:8081**

### 4. 開始對話

1. 註冊帳號（首次）
2. 選擇模型（如 `gpt-4o-mini`）
3. 開始對話！

**就這麼簡單！** 🎉

---

## 📚 完整文檔

### 用戶文檔

- **[USER_GUIDE.md](USER_GUIDE.md)** ⭐ **所有用戶必讀**
  - 如何使用 Models、Tools、Knowledge
  - 實戰示例與最佳實踐
  - 常見問題解答

### 管理員文檔

- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** 🔧 **管理員必讀**
  - 添加新模型
  - 管理知識庫
  - 故障排除
  - 性能優化

---

## ⚡ 核心功能

### 多模型支持

- ✅ **OpenAI**: GPT-4.1, GPT-4o-mini, O3-mini 等
- ✅ **Anthropic**: Claude Sonnet 4.5, Haiku 4.5 等
- ✅ **Google**: Gemini 2.5 Pro, Flash 等
- ✅ **Ollama**: 免費本地模型（Llama, Qwen 等）

### 雙 RAG 模式

**模式 A：Knowledge 功能（臨時文檔）**
```
用途：個人上傳的 PDF/文檔
操作：Knowledge → 上傳 → 用 # 引用
```

**模式 B：後端 RAG（專業知識庫）**
```
用途：預先索引的專業文檔（如論文庫）
操作：選擇帶 -rag 後綴的模型
```

### 工具支持

- ✅ **Web Search**: 實時信息查詢
- ✅ **Code Interpreter**: 代碼執行
- ✅ **Custom Tools**: 自定義功能

---

## 🎯 使用場景

### 場景 1：日常對話

```
Model:  gpt-4o-mini
Tools:  (不啟用)
→ 快速對話、一般問題
```

### 場景 2：文檔問答

```
Model:  gpt-4o-mini-rag
Knowledge: #my_docs
→ 基於文檔回答
```

### 場景 3：實時信息

```
Model:  gpt-4o-mini
Tools:  ✅ Web Search
→ 搜索最新信息
```

### 場景 4：免費方案

```
Model:  llama3.2:3b（Ollama）
→ 完全免費，本地運行
```

---

## 🏗️ 系統架構

```
用戶 → Open WebUI → Backend → LLM APIs
              ↓           ↓
         ChromaDB     Qdrant    Ollama
        (臨時文檔)  (專業知識庫) (本地模型)
```

### 服務組件

| 服務 | 端口 | 說明 |
|------|------|------|
| **Open WebUI** | 8081 | 前端界面 |
| **Backend** | 8000 | RAG API |
| **Qdrant** | 6333 | 向量數據庫 |
| **Ollama** | 11434 | 本地模型 |

### 目錄結構

```
05-project-development/
├── backend/
│   ├── main.py              # API 端點
│   ├── rag_service.py       # RAG 邏輯
│   ├── model_manager.py     # 模型管理
│   ├── models_config.json   # 模型配置
│   └── config.py            # 設定
│
├── docker-compose.yml       # 服務編排
├── README.md               # 本文件
├── USER_GUIDE.md           # 用戶指南 ⭐
└── ADMIN_GUIDE.md          # 管理員指南 🔧
```

---

## 🔧 進階配置

### 添加更多模型

編輯 `.env` 添加 API Keys：

```bash
ANTHROPIC_API_KEY=sk-ant-xxx  # Claude 模型
GOOGLE_API_KEY=xxx             # Gemini 模型
```

重啟服務：

```bash
docker compose restart backend
```

### 下載本地模型

**在 UI 中：**
```
右上角頭像 → Settings → Models
→ Pull a model from Ollama.com
→ 輸入：llama3.2:3b
```

**命令行：**
```bash
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b
```

---

## 📊 監控與維護

### 查看日誌

```bash
# 所有服務
docker compose logs -f

# 特定服務
docker compose logs -f backend
```

### 健康檢查

```bash
# Backend API
curl http://localhost:8000/health

# 可用模型
curl http://localhost:8000/v1/models
```

### 備份數據

```bash
tar -czf backup-$(date +%Y%m%d).tar.gz \
  ./open-webui/ \
  ./qdrant_storage/ \
  ./ollama_data/
```

---

## 🆘 常見問題

### Q: 看不到某些模型？

**A:** 檢查 API Key 是否設置：

```bash
cat /path/to/.env | grep API_KEY
docker compose restart backend
```

### Q: RAG 不工作？

**A:** 檢查健康狀態：

```bash
curl http://localhost:8000/health
# 應該看到 "rag_ready": true
```

### Q: 如何停止服務？

**A:**

```bash
docker compose down     # 停止
docker compose down -v  # 停止並刪除數據
```

---

## 📖 完整文檔導航

**我該看哪個文檔？**

```
👤 我是用戶 → USER_GUIDE.md
  - 如何使用 Models、Tools、Knowledge
  - 實戰示例與最佳實踐
  
🔧 我是管理員 → ADMIN_GUIDE.md
  - 添加新模型
  - 管理知識庫
  - 故障排除
  
📋 我想快速了解 → 本 README
  - 5 分鐘快速開始
  - 系統概覽
```

---

## 🎓 技術特點

- ✅ **模組化設計**: 關注點分離，易於維護
- ✅ **容器化部署**: Docker Compose 編排
- ✅ **動態配置**: JSON 配置模型，無需改代碼
- ✅ **自動重載**: 開發模式下代碼自動生效
- ✅ **雙 RAG 架構**: 靈活應對不同場景
- ✅ **多提供商支持**: OpenAI、Anthropic、Google、Ollama
- ✅ **生產就緒**: 完整的監控、備份、故障排除

---

## 📝 License

MIT License

---

**開始使用？** 👉 [USER_GUIDE.md](USER_GUIDE.md)

**需要管理？** 👉 [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

**有問題？** 查看文檔或提交 Issue！
