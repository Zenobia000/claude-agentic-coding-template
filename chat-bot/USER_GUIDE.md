# 使用者使用指南

## 🎯 5 分鐘快速上手

### 第一步：啟動系統

```bash
cd 05-project-development
docker compose up -d
```

### 第二步：訪問界面

打開瀏覽器：`http://localhost:8081`

### 第三步：開始對話

1. 註冊帳號（首次）
2. 選擇模型（如 `gpt-4o-mini`）
3. 開始對話！

---

## 📖 完整使用指南

### 一、如何選擇和使用模型

#### 在對話窗口選擇模型

```
對話窗口頂部 → 下拉選單 → 選擇模型
```

#### 模型命名規則

**不帶 `-rag` 後綴** = 純對話
```
gpt-4o-mini          → 快速對話
claude-sonnet-4-5    → 高質量回答
gemini-2.5-flash     → 多語言支持
llama3.2:3b          → 本地免費模型
```

**帶 `-rag` 後綴** = 文檔問答
```
gpt-4o-mini-rag      → 基於知識庫回答
claude-sonnet-4-5-rag → 專業文檔問答
```

#### 使用場景

| 場景 | 推薦模型 | 原因 |
|------|---------|------|
| 日常聊天 | `gpt-4o-mini` | 快速、便宜 |
| 程式碼問題 | `claude-sonnet-4-5` | 編程能力強 |
| 文檔問答 | `gpt-4o-mini-rag` | 基於知識庫 |
| 免費使用 | `llama3.2:3b` | 本地運行 |
| 複雜推理 | `o3-mini` | 推理能力強 |

---

### 二、如何使用工具（Tools）

#### 什麼是工具？

工具讓 AI 可以：
- 搜尋網頁獲取即時資訊
- 執行程式碼進行計算
- 調用 API

#### 如何啟用工具

```
1. 在對話窗口
2. 點擊輸入框上方的 🔧 圖標
3. 勾選需要的工具
   ☑ Web Search
   ☐ Code Interpreter
4. 開始對話
```

#### 實戰示例

**示例 1：即時資訊查詢**
```
✅ 啟用：Web Search
❓ 提問：「2024年最新的 AI 突破是什麼？」
💡 AI 會自動搜尋網頁並回答
```

**示例 2：資料計算**
```
✅ 啟用：Code Interpreter
❓ 提問：「計算 [1,2,3,4,5] 的平均值和標準差」
💡 AI 會執行 Python 程式碼並返回結果
```

---

### 三、如何使用知識庫（Knowledge）

#### 什麼是 Knowledge？

Knowledge 是你上傳的文檔集合，AI 可以從中檢索資訊回答問題。

#### 創建知識庫

```
1. 頂部導航 → Knowledge
2. 點擊 "+ New Knowledge"
3. 輸入名稱（如 my_docs）
4. 上傳文檔（支持 PDF、TXT、MD）
5. 等待索引完成
```

#### 在對話中使用

```
在輸入框輸入：
#my_docs 這個文檔的主要內容是什麼？

AI 會：
1. 從 my_docs 檢索相關內容
2. 基於文檔回答
3. 提供引用來源
```

---

### 四、三種功能組合使用

#### 組合 1：純對話（最簡單）

```
Model:  gpt-4o-mini
Tools:  (不啟用)
Input:  你好，介紹一下自己
```

#### 組合 2：即時資訊 + 對話

```
Model:  gpt-4o-mini
Tools:  ✅ Web Search
Input:  今天的科技新聞
```

#### 組合 3：知識庫問答

```
Model:  gpt-4o-mini
Tools:  (不啟用)
Input:  #my_docs 文檔的核心觀點是什麼？
```

#### 組合 4：完整組合（最強大）

```
Model:  claude-sonnet-4-5-rag
Tools:  ✅ Web Search
Input:  #my_docs 根據我的文檔，比較最新業界趨勢的差異

流程：
1. 從 #my_docs 讀取文檔（Knowledge）
2. 用 Web Search 查找最新趨勢（Tool）
3. 用 -rag 模型從後端知識庫檢索（Backend RAG）
4. 綜合三方資訊回答
```

---

### 五、兩種 RAG 方式（重要）

本系統有**兩種 RAG**，職責不同：

#### RAG 方式 A：Knowledge 功能（臨時文檔）

```
✅ 用途：個人上傳的文檔
✅ 操作：Knowledge → 上傳 → 用 # 引用
✅ 適合：
   - 臨時 PDF 問答
   - 個人筆記查詢
   - 會議文檔分析
```

#### RAG 方式 B：後端 RAG（專業知識庫）

```
✅ 用途：預先索引的專業文檔（如論文庫）
✅ 操作：選擇帶 -rag 後綴的模型
✅ 適合：
   - 團隊共享知識庫
   - 大規模文檔集（>1萬）
   - API 訪問
```

#### 如何選擇？

```
場景：快速查詢一個 PDF
→ 用 Knowledge 功能（上傳 → #引用）

場景：查詢公司論文庫
→ 用 -rag 模型（如 gpt-4o-mini-rag）

場景：臨時文檔 + 專業知識庫
→ 組合使用：選 -rag 模型 + #引用 Knowledge
```

---

### 六、本地模型（Ollama）

#### 為什麼用本地模型？

- ✅ 完全免費
- ✅ 隱私保護（資料不離開本地）
- ✅ 離線可用

#### 下載模型

**方法 1：在 Open WebUI 下載（推薦）**
```
1. 右上角頭像 → Settings → Models
2. 找到 "Pull a model from Ollama.com"
3. 輸入模型名稱：
   - llama3.2:3b（快速，約 2GB）
   - qwen2.5:7b（中文強，約 5GB）
4. 點擊下載
5. 回到主頁面即可使用
```

**方法 2：命令列下載**
```bash
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b
```

#### 推薦模型

| 模型 | 大小 | 特點 | 適合 |
|------|------|------|------|
| `llama3.2:3b` | 2GB | 快速 | 日常對話 |
| `qwen2.5:7b` | 5GB | 中文強 | 中文場景 |
| `codellama:7b` | 4GB | 編程 | 寫程式碼 |

---

### 七、常見問題

#### Q1: 為什麼看不到某些模型？

**A:** 需要設置對應的 API Key

```bash
# 在專案根目錄的 .env 文件
OPENAI_API_KEY=sk-xxx        # OpenAI 模型
ANTHROPIC_API_KEY=sk-ant-xxx  # Claude 模型
GOOGLE_API_KEY=xxx            # Gemini 模型
```

#### Q2: 工具沒有被調用？

**A:** 確保：
1. ✅ 工具已啟用（🔧 圖標已選中）
2. ✅ 問題明確（「請搜尋網頁回答...」）
3. ✅ 模型支持工具（推薦 gpt-4, claude-3+）

#### Q3: Knowledge 沒有找到文檔內容？

**A:** 檢查：
1. ✅ 文檔已上傳並索引完成
2. ✅ 使用 # 正確引用知識庫名稱
3. ✅ 提問與文檔內容相關

#### Q4: MCP 服務缺失？

**A:** 不需要擔心！

```
✅ 你已經有：
   - Web Search 工具
   - Code Interpreter
   - Knowledge 功能

❌ MCP 只在特殊情況需要（企業級應用）
→ 大多數使用者可以忽略
```

---

### 八、最佳實踐

#### 推薦配置 1：日常使用

```
Model:  gpt-4o-mini（便宜快速）
Tools:  Web Search（需要時啟用）
用途：  一般對話、快速查詢
```

#### 推薦配置 2：研究助手

```
Model:  claude-sonnet-4-5
Tools:  ✅ Web Search, ✅ Code Interpreter
Knowledge: #research_papers
用途：  學術研究、資料分析
```

#### 推薦配置 3：免費方案

```
Model:  llama3.2:3b（本地模型）
Tools:  (不需要)
用途：  完全免費，離線可用
```

#### 推薦配置 4：企業知識庫

```
Model:  gpt-4o-mini-rag
Tools:  ✅ Web Search
Knowledge: #company_docs
用途：  企業文檔問答 + 即時資訊
```

---

## 🎓 進階技巧

### 創建自訂模型

```
Settings → Models → + New Model

配置：
- Name: 我的助手
- Base Model: gpt-4o-mini
- System Prompt: 你是一個專業的...
- Default Tools: Web Search
```

### 創建提示詞模板

```
Prompts → + New Prompt

示例：程式碼審查模板
---
請審查以下程式碼：
1. 檢查潛在bug
2. 優化建議
3. 安全問題

程式碼：
{code}
---
```

### 查看工具調用

```
Settings → Interface → Show Tool Calls
→ 對話中會顯示工具調用過程
```

---

## 📚 快速參考卡

### 功能速查表

| 需求 | 操作 | 位置 |
|------|------|------|
| 選擇模型 | 點擊下拉選單 | 對話窗口頂部 |
| 啟用工具 | 點擊 🔧 圖標 | 輸入框上方 |
| 引用知識庫 | 輸入 # | 輸入框內 |
| 上傳文檔 | Knowledge 頁面 | 頂部導航欄 |
| 下載本地模型 | Settings → Models | 右上角頭像 |

### 快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Ctrl + Enter` | 發送訊息 |
| `#` | 引用知識庫 |
| `/` | 快捷命令 |

---

## 🆘 獲取幫助

**查看日誌：**
```bash
docker compose logs -f backend
```

**重啟服務：**
```bash
docker compose restart
```

**完整重啟：**
```bash
docker compose down
docker compose up -d
```

**管理員指南：**
需要添加新模型、配置進階功能？請查看 [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

---

**就這麼簡單！** 🚀

有問題？查看 [README.md](README.md) 或 [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

