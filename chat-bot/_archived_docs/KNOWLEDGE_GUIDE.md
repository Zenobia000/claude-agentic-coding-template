# Open WebUI Knowledge 功能完全解析

## Knowledge 是什麼？

Open WebUI 的 **Knowledge** 功能是一個 **完整的 RAG 系統**，允許用戶：
- 創建知識庫集合
- 上傳文檔並自動索引
- 在對話中引用知識庫

## 存儲架構

### 數據存儲位置

```
./open-webui/
├── webui.db              # SQLite 數據庫
│   └── knowledge 表      # 知識庫元數據
│       ├── id            # 知識庫 ID
│       ├── user_id       # 創建者
│       ├── name          # 知識庫名稱
│       ├── description   # 描述
│       └── created_at    # 創建時間
│
└── vector_db/            # ChromaDB 向量數據庫
    └── chroma.sqlite3    # 向量索引和嵌入
        └── collections   # 每個 Knowledge 一個 collection
```

### Knowledge 表結構

```sql
CREATE TABLE knowledge (
    id TEXT NOT NULL,           -- 唯一 ID
    user_id TEXT NOT NULL,      -- 創建者 ID
    name TEXT NOT NULL,         -- 知識庫名稱
    description TEXT,           -- 描述
    data JSON,                  -- 文檔數據
    meta JSON,                  -- 元數據
    created_at BIGINT NOT NULL, -- 創建時間
    updated_at BIGINT,          -- 更新時間
    access_control JSON,        -- 訪問控制
    PRIMARY KEY (id)
)
```

## 是的，這是 RAG！

**Knowledge 功能完整實現了 RAG 流程：**

### RAG 流程

```
1. 文檔上傳
   ↓
2. 文檔分塊 (Chunking)
   ↓
3. 向量化 (Embedding)
   ↓
4. 存入 ChromaDB
   ↓
5. 對話時檢索相關片段
   ↓
6. 結合上下文生成回答
```

### 技術棧

| 組件 | 技術 | 說明 |
|------|------|------|
| **向量數據庫** | ChromaDB | 默認內建 |
| **Embedding 模型** | sentence-transformers | 可配置 |
| **元數據存儲** | SQLite (webui.db) | 知識庫信息 |
| **文檔處理** | Open WebUI 內建 | 支持多種格式 |

## 與我們的 Qdrant RAG 對比

### 架構對比

```
Open WebUI Knowledge (ChromaDB RAG)
├─ 用途：用戶自主創建知識庫
├─ 存儲：./open-webui/vector_db/
├─ 管理：通過 UI 操作
├─ 向量庫：ChromaDB
└─ 使用方式：在對話中用 '#' 引用

我們的 Backend RAG (Qdrant)
├─ 用途：預先索引的專業文檔
├─ 存儲：./qdrant_storage/
├─ 管理：通過腳本批量索引
├─ 向量庫：Qdrant
└─ 使用方式：選擇 -rag 後綴模型
```

### 功能對比

| 特性 | Open WebUI Knowledge | Backend Qdrant RAG |
|------|---------------------|-------------------|
| **創建方式** | UI 上傳文檔 | 腳本批量索引 |
| **用戶控制** | 每個用戶獨立 | 所有用戶共享 |
| **文檔格式** | PDF, TXT, MD 等 | 任意（需處理） |
| **訪問控制** | 支持（per-user） | 無（全局） |
| **向量庫** | ChromaDB（內建） | Qdrant（獨立） |
| **性能** | 適合小規模 | 適合大規模 |
| **使用方式** | '#' 引用 | 選擇特定模型 |

## 如何使用 Knowledge 功能

### 創建知識庫

1. **進入 Knowledge 頁面**
   - 在 Open WebUI 頂部導航欄點擊 "Knowledge"

2. **創建新知識庫**
   - 點擊 "+ New Knowledge" 按鈕
   - 輸入名稱和描述
   - 例如：
     ```
     名稱: test_db
     描述: 我的測試知識庫
     ```

3. **上傳文檔**
   - 在知識庫中上傳 PDF、TXT 或其他文檔
   - 系統自動：
     - 解析文檔
     - 分塊（chunking）
     - 向量化（embedding）
     - 存入 ChromaDB

4. **在對話中使用**
   - 新建對話
   - 在輸入框輸入 `#` 符號
   - 選擇你的知識庫
   - 提問，系統會從知識庫檢索相關內容

### 使用示例

```
用戶: #test_db 這個文檔的主要內容是什麼？

系統流程:
1. 識別 #test_db 引用
2. 從 ChromaDB 檢索相關片段
3. 將片段作為上下文
4. 調用 LLM 生成回答
5. 返回基於文檔的回答
```

## 配置選項

### 環境變數配置

```yaml
# docker-compose.yml
open-webui:
  environment:
    # 向量數據庫類型
    - VECTOR_DB=chroma  # 默認，也可以改成 qdrant
    
    # Embedding 模型
    - RAG_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
    
    # RAG 設置
    - CHUNK_SIZE=1500          # 文檔分塊大小
    - CHUNK_OVERLAP=100        # 重疊大小
    - RAG_TOP_K=5              # 檢索結果數量
    
    # 如果使用外部 Qdrant
    # - VECTOR_DB=qdrant
    # - QDRANT_URI=http://qdrant:6333
```

### 切換到 Qdrant（統一向量庫）

如果想讓 Knowledge 功能也使用 Qdrant：

```yaml
open-webui:
  environment:
    - VECTOR_DB=qdrant
    - QDRANT_URI=http://qdrant:6333
```

**優點：**
- ✅ 統一向量庫，減少資源消耗
- ✅ Qdrant 性能更好
- ✅ 可以共享向量數據

**注意：**
- ⚠️ 需要遷移現有 ChromaDB 數據
- ⚠️ 確保 Qdrant 穩定運行

## 存儲空間管理

### 查看存儲使用

```bash
# ChromaDB 向量數據
du -sh ./open-webui/vector_db/

# 元數據庫
du -sh ./open-webui/webui.db

# 總計
du -sh ./open-webui/
```

### 清理知識庫

**通過 UI：**
1. 進入 Knowledge 頁面
2. 選擇要刪除的知識庫
3. 點擊刪除按鈕

**通過數據庫（不推薦）：**
```sql
-- 查看所有知識庫
SELECT id, name, description FROM knowledge;

-- 刪除特定知識庫（同時會清理 ChromaDB）
-- 建議通過 UI 操作
```

## 最佳實踐

### 使用場景

**適合使用 Knowledge 功能：**
- ✅ 個人文檔管理
- ✅ 臨時項目文檔
- ✅ 需要訪問控制的知識庫
- ✅ 頻繁更新的文檔

**適合使用 Backend Qdrant RAG：**
- ✅ 團隊共享的專業知識庫
- ✅ 大規模文檔集合（>10萬文檔）
- ✅ 需要 API 訪問
- ✅ 預先索引的靜態文檔

### 組合使用策略

```
場景 1: 個人學習筆記
  → 使用 Knowledge 功能
  → 創建個人知識庫
  → 上傳筆記和資料
  → 用 # 引用對話

場景 2: 查詢公司論文庫
  → 使用 -rag 後綴模型
  → 例如：gpt-4o-mini-rag
  → 直接提問
  → 從 Qdrant 檢索

場景 3: 臨時 PDF 問答
  → 使用 Knowledge 功能
  → 上傳 PDF
  → 立即對話
  → 用完可刪除
```

## 數據遷移

### 從 ChromaDB 遷移到 Qdrant

如果決定統一使用 Qdrant：

```python
# migrate_knowledge_to_qdrant.py (示例)

import chromadb
from qdrant_client import QdrantClient

# 1. 連接 ChromaDB
chroma_client = chromadb.PersistentClient(
    path="./open-webui/vector_db"
)

# 2. 連接 Qdrant
qdrant_client = QdrantClient(url="http://localhost:6333")

# 3. 遷移每個 collection
for collection in chroma_client.list_collections():
    # 讀取 ChromaDB 數據
    # 寫入 Qdrant
    # ...
```

**注意：** 實際遷移需要謹慎測試，建議先備份數據。

## 監控與維護

### 檢查 Knowledge 狀態

```bash
# 查看所有知識庫
sqlite3 ./open-webui/webui.db "SELECT name, description, created_at FROM knowledge;"

# 查看 ChromaDB collections
sqlite3 ./open-webui/vector_db/chroma.sqlite3 "SELECT name FROM collections;"

# 存儲使用情況
./check_vector_dbs.sh
```

### 備份知識庫

```bash
# 備份整個 Open WebUI 數據
tar -czf openwebui-backup-$(date +%Y%m%d).tar.gz ./open-webui/

# 只備份向量數據
tar -czf vector-db-backup-$(date +%Y%m%d).tar.gz ./open-webui/vector_db/
```

## 總結

### Knowledge 功能本質

**是的，Knowledge 是完整的 RAG 系統！**

- ✅ 自動文檔索引
- ✅ 向量化存儲（ChromaDB）
- ✅ 檢索增強生成
- ✅ 上下文感知對話

### 與現有架構的關係

```
你的系統現在有兩套 RAG：

1. Open WebUI Knowledge (ChromaDB)
   - 用戶自主管理
   - UI 操作
   - 個人知識庫

2. Backend Qdrant RAG
   - 管理員維護
   - 腳本索引
   - 共享知識庫
```

### 建議

**當前階段：**
- ✅ 保持兩套 RAG 並存
- ✅ 明確使用場景
- ✅ 定期監控存儲

**評估是否整合：**
- 使用 `./check_vector_dbs.sh`
- 3-6 個月後根據使用情況決定
- 參考 `ARCHITECTURE_ANALYSIS.md`

---

**相關文檔：**
- [ARCHITECTURE_ANALYSIS.md](ARCHITECTURE_ANALYSIS.md) - 架構分析
- [check_vector_dbs.sh](check_vector_dbs.sh) - 監控腳本
- [docker-compose.unified-qdrant.yml.example](docker-compose.unified-qdrant.yml.example) - 統一配置

