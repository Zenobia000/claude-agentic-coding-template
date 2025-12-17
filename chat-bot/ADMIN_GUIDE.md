# 管理員指南

## 📋 目錄

1. [環境配置](#環境配置)
2. [模型管理](#模型管理)
3. [本地模型（Ollama）](#本地模型ollama)
4. [知識庫管理](#知識庫管理)
5. [架構說明](#架構說明)
6. [故障排除](#故障排除)
7. [效能優化](#效能優化)

---

## 環境配置

### API Keys 設置

在**專案根目錄**創建 `.env` 文件：

```bash
# OpenAI（必須）
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx

# Anthropic（可選）
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# Google（可選）
GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
```

### 服務啟動

```bash
cd 05-project-development

# 啟動所有服務
docker compose up -d --build

# 查看日誌
docker compose logs -f backend

# 重啟特定服務
docker compose restart backend

# 停止所有服務
docker compose down
```

### 開發模式

Backend 已啟用自動重載：

```dockerfile
# backend/Dockerfile
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

**修改程式碼後自動生效，無需重啟！**

---

## 模型管理

### 模型配置文件

所有模型在 `backend/models_config.json` 中集中管理：

```json
{
  "提供商名稱": {
    "模型類別": [
      {
        "id": "模型ID",
        "label": "顯示標籤",
        "tags": ["標籤1", "標籤2"]
      }
    ]
  }
}
```

### 模型類別

| 類別 | 說明 | 生成 RAG | 顯示給使用者 |
|------|------|---------|------------|
| `chat_multimodal` | 對話模型 | ✅ | ✅ |
| `reasoning` | 推理模型 | ✅ | ✅ |
| `embedding` | 嵌入模型 | ❌ | ❌ 內部使用 |
| `audio_realtime` | 音訊模型 | ❌ | ❌ 暫不開放 |

### 添加新模型

**步驟 1：編輯配置**

```bash
nano backend/models_config.json
```

添加模型：

```json
{
  "openai": {
    "chat_multimodal": [
      {
        "id": "gpt-5-turbo",           // 新模型
        "label": "openai_gpt_5_turbo",
        "tags": ["chat", "next_gen"]
      }
    ]
  }
}
```

**步驟 2：重啟服務**

```bash
docker compose restart backend
```

**就這樣！** 系統會自動：
- ✅ 載入 `gpt-5-turbo`
- ✅ 生成 `gpt-5-turbo-rag`
- ✅ 在 UI 中顯示

### 添加新提供商

**示例：添加 Cohere**

**1. 更新 models_config.json**

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

**2. 添加 API Key**

```bash
# .env
COHERE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
```

**3. 更新 config.py**

```python
class Settings(BaseSettings):
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY", "")
```

**4. 更新 model_manager.py**

```python
elif provider == "cohere":
    from langchain_cohere import ChatCohere
    return ChatCohere(
        model=base_model_id,
        temperature=temperature,
        cohere_api_key=self.settings.COHERE_API_KEY
    )
```

**5. 更新 requirements.txt**

```
langchain-cohere==x.x.x
```

**6. 重新構建**

```bash
docker compose up -d --build backend
```

### 查看可用模型

```bash
curl http://localhost:8000/v1/models | python3 -m json.tool
```

---

## 本地模型（Ollama）

### 服務狀態檢查

```bash
# 檢查 Ollama 服務
curl http://localhost:11434/api/tags

# 查看已下載的模型
docker exec 05-project-development-ollama-1 ollama list
```

### 命令列管理

```bash
# 下載模型
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b

# 刪除模型
docker exec 05-project-development-ollama-1 ollama rm llama3.2:3b

# 查看磁碟使用
du -sh ./ollama_data
```

### GPU 配置

**檢查 GPU 使用：**

```bash
nvidia-smi
# 運行模型時應該看到 ollama 進程
```

**如果沒有 GPU（使用 CPU）：**

編輯 `docker-compose.yml`：

```yaml
ollama:
  image: ollama/ollama:latest
  ports:
    - "11434:11434"
  volumes:
    - ./ollama_data:/root/.ollama
  # 註釋掉 deploy 部分
  # deploy:
  #   resources:
  #     reservations:
  #       devices:
  #         - driver: nvidia
  #           count: all
  #           capabilities: [gpu]
```

### 推薦預裝模型

```bash
# 快速模型（推薦新手）
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b

# 中文模型
docker exec 05-project-development-ollama-1 ollama pull qwen2.5:7b

# 程式碼模型
docker exec 05-project-development-ollama-1 ollama pull codellama:7b
```

---

## 知識庫管理

### 雙 RAG 架構

本系統有**兩套 RAG**：

```
1. Open WebUI Knowledge (ChromaDB)
   ├─ 儲存：./open-webui/vector_db/
   ├─ 用途：使用者自主上傳的文檔
   └─ 使用：在對話中用 # 引用

2. Backend RAG (Qdrant)
   ├─ 儲存：./qdrant_storage/
   ├─ 用途：預先索引的專業文檔
   └─ 使用：選擇帶 -rag 後綴的模型
```

### 職責劃分

| 場景 | 使用方式 | 資料位置 |
|------|---------|---------|
| 使用者臨時上傳 PDF | Knowledge 功能 | ChromaDB |
| 企業論文庫 | -rag 模型 | Qdrant |
| 會議文檔分析 | Knowledge 功能 | ChromaDB |
| API 服務 | -rag 模型 | Qdrant |

### 監控儲存使用

```bash
# ChromaDB 使用
du -sh ./open-webui/vector_db/

# Qdrant 使用
du -sh ./qdrant_storage/

# 總計
du -sh ./open-webui/ ./qdrant_storage/
```

### 查看知識庫

**ChromaDB（Open WebUI）：**

```bash
sqlite3 ./open-webui/webui.db "SELECT name, description FROM knowledge;"
```

**Qdrant（Backend）：**

訪問：`http://localhost:6333/dashboard`

### 備份知識庫

```bash
# 備份 Open WebUI 資料
tar -czf openwebui-backup-$(date +%Y%m%d).tar.gz ./open-webui/

# 備份 Qdrant 資料
tar -czf qdrant-backup-$(date +%Y%m%d).tar.gz ./qdrant_storage/

# 備份所有資料
tar -czf full-backup-$(date +%Y%m%d).tar.gz ./open-webui/ ./qdrant_storage/ ./ollama_data/
```

### 清理資料

```bash
# 清理 Open WebUI 資料（Knowledge + 聊天記錄）
rm -rf ./open-webui/

# 清理 Qdrant 資料
rm -rf ./qdrant_storage/

# 清理 Ollama 模型
rm -rf ./ollama_data/

# 重新啟動
docker compose up -d
```

---

## 架構說明

### 服務架構

```
┌─────────────┐
│  使用者瀏覽器│
└──────┬──────┘
       │
       ↓
┌─────────────┐     ┌─────────────┐
│ Open WebUI  │────→│  Backend    │
│  (前端)     │     │  (RAG API)  │
└─────────────┘     └──────┬──────┘
       │                   │
       ↓                   ↓
┌─────────────┐     ┌─────────────┐
│  ChromaDB   │     │   Qdrant    │
│ (臨時文檔)  │     │ (專業知識庫) │
└─────────────┘     └─────────────┘
       │                   │
       └───────┬───────────┘
               ↓
        ┌─────────────┐
        │   Ollama    │
        │ (本地模型)  │
        └─────────────┘
```

### 端口映射

| 服務 | 端口 | 用途 |
|------|------|------|
| Open WebUI | 8081 | 前端界面 |
| Backend | 8000 | RAG API |
| Qdrant | 6333 | 向量資料庫 |
| Ollama | 11434 | 本地模型服務 |

### 資料流向

**純 LLM 對話：**
```
使用者 → Open WebUI → Backend → LLM API → 返回
```

**RAG 模式（-rag）：**
```
使用者 → Open WebUI → Backend → Qdrant 檢索 → LLM API → 返回
```

**Knowledge 功能：**
```
使用者 → Open WebUI → ChromaDB 檢索 → LLM API → 返回
```

---

## 故障排除

### 問題 1：模型不顯示

**檢查清單：**

```bash
# 1. API Key 是否設置？
cat /path/to/project/.env | grep API_KEY

# 2. Backend 是否啟動？
docker compose ps backend

# 3. 查看錯誤日誌
docker compose logs backend | grep -i error

# 4. 驗證 API
curl http://localhost:8000/v1/models
```

### 問題 2：RAG 不工作

**檢查：**

```bash
# 1. 健康檢查
curl http://localhost:8000/health

# 2. Qdrant 是否運行？
curl http://localhost:6333/

# 3. Collection 是否存在？
curl http://localhost:6333/collections

# 4. 查看 RAG 日誌
docker compose logs backend | grep RAG
```

### 問題 3：Ollama 下載失敗

**解決方案：**

```bash
# 1. 檢查網路
ping ollama.com

# 2. 查看 Ollama 日誌
docker compose logs ollama

# 3. 手動下載
docker exec -it 05-project-development-ollama-1 sh
ollama pull llama3.2:3b

# 4. 檢查磁碟空間
df -h
```

### 問題 4：記憶體不足

**優化方案：**

```bash
# 1. 停止不需要的服務
docker compose stop ollama  # 如果不用本地模型

# 2. 限制容器記憶體
# docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 2G

# 3. 使用小模型
# 選擇 mini/haiku 版本
```

### 查看日誌

```bash
# 所有服務
docker compose logs -f

# 特定服務
docker compose logs -f backend
docker compose logs -f open-webui
docker compose logs -f qdrant
docker compose logs -f ollama

# 最近 100 行
docker compose logs --tail=100 backend

# 搜尋錯誤
docker compose logs backend | grep -i error
```

---

## 效能優化

### 模型選擇優化

**成本優化：**

```json
{
  "tags": ["cheap", "fast"]  // 標記便宜的模型
}
```

推薦便宜模型：
- `gpt-4o-mini`
- `claude-haiku-4-5`
- `gemini-2.5-flash`

**效能優化：**

使用本地模型減輕 API 負擔：

```
80% 流量 → Ollama（免費）
20% 流量 → API 模型（高品質）
```

### 向量資料庫優化

**Qdrant 配置：**

```yaml
# docker-compose.yml
qdrant:
  environment:
    - QDRANT__SERVICE__GRPC_PORT=6334  # 啟用 gRPC（更快）
```

**索引優化：**

```python
# 建立索引時使用批次操作
qdrant_client.upsert(
    collection_name="docs",
    points=points,  # 批次插入而不是逐個插入
    wait=False      # 非同步寫入
)
```

### 資源監控

```bash
# 查看容器資源使用
docker stats

# 查看磁碟使用
df -h
du -sh ./open-webui/ ./qdrant_storage/ ./ollama_data/

# 查看記憶體使用
free -h
```

---

## 生產部署建議

### 安全配置

1. **使用 Secrets 管理 API Keys**

```yaml
# docker-compose.prod.yml
services:
  backend:
    secrets:
      - openai_api_key
secrets:
  openai_api_key:
    file: ./secrets/openai_api_key.txt
```

2. **啟用 HTTPS**

```yaml
# 使用 Nginx 反向代理
nginx:
  image: nginx:latest
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf
    - ./ssl:/etc/nginx/ssl
  ports:
    - "443:443"
```

3. **訪問控制**

```python
# main.py
from fastapi.security import HTTPBearer

security = HTTPBearer()

@app.post("/v1/chat/completions")
async def chat(credentials: HTTPAuthorizationCredentials = Security(security)):
    # 驗證 token
    ...
```

### 高可用配置

**多實例 Backend：**

```yaml
backend:
  deploy:
    replicas: 3  # 運行 3 個實例
```

**外部 Qdrant：**

```yaml
# 使用 Qdrant Cloud 或獨立集群
backend:
  environment:
    - QDRANT_URL=https://qdrant-cluster.example.com
```

### 監控與日誌

```bash
# 使用 Prometheus + Grafana
# 或
# 使用 ELK Stack（Elasticsearch + Logstash + Kibana）
```

---

## 遷移與升級

### 統一向量庫遷移

**如果決定統一使用 Qdrant：**

```yaml
# docker-compose.yml
open-webui:
  environment:
    - VECTOR_DB=qdrant
    - QDRANT_URI=http://qdrant:6333
```

**資料遷移腳本：**

```python
# migrate_chromadb_to_qdrant.py
import chromadb
from qdrant_client import QdrantClient

# 1. 連接 ChromaDB
chroma_client = chromadb.PersistentClient(path="./open-webui/vector_db")

# 2. 連接 Qdrant
qdrant_client = QdrantClient(url="http://localhost:6333")

# 3. 遷移資料
for collection in chroma_client.list_collections():
    # 讀取 ChromaDB
    # 寫入 Qdrant
    ...
```

### 版本升級

```bash
# 備份資料
./backup.sh

# 拉取最新鏡像
docker compose pull

# 重新構建
docker compose up -d --build

# 驗證
curl http://localhost:8000/health
```

---

## 維護清單

### 每日

- [ ] 檢查服務狀態：`docker compose ps`
- [ ] 查看錯誤日誌：`docker compose logs backend | grep ERROR`

### 每週

- [ ] 備份資料：`./backup.sh`
- [ ] 檢查磁碟空間：`df -h`
- [ ] 清理舊日誌：`docker system prune`

### 每月

- [ ] 更新鏡像：`docker compose pull && docker compose up -d`
- [ ] 審查 API 使用成本
- [ ] 優化模型配置

### 每季度

- [ ] 評估雙向量庫使用情況
- [ ] 考慮是否遷移到統一 Qdrant
- [ ] 效能測試與優化

---

## 快速命令參考

```bash
# 啟動
docker compose up -d --build

# 停止
docker compose down

# 重啟
docker compose restart

# 查看日誌
docker compose logs -f backend

# 進入容器
docker compose exec backend sh

# 備份資料
tar -czf backup.tar.gz ./open-webui/ ./qdrant_storage/

# 清理資料
rm -rf ./open-webui/ ./qdrant_storage/ ./ollama_data/

# 驗證健康
curl http://localhost:8000/health
curl http://localhost:8000/v1/models
```

---

**需要使用者使用指南？** 查看 [USER_GUIDE.md](USER_GUIDE.md)

**專案概述？** 查看 [README.md](README.md)

