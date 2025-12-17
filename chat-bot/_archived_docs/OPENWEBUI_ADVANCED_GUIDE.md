# Open WebUI 高級功能使用指南

## Models、Tools、Knowledge 使用方式

### 📌 在對話中使用的三種方式

Open WebUI 提供三種增強對話的方式：

```
1. Models (模型) - 在對話開始前選擇
2. Tools (工具) - 在對話中自動或手動調用
3. Knowledge (知識庫) - 用 '#' 符號引用
```

---

## 1. Models（模型）使用

### 什麼是 Models？

Open WebUI 的 **Models** 頁面顯示的是：
- **預設模型**：從 Ollama、OpenAI API 等獲取的基礎模型
- **自定義模型**：用戶創建的模型預設（Modelfile）

### 你看到的 "Multi Agent"

這是一個**自定義模型預設**（Model Preset），可能包含：
- 特定的系統提示詞
- 特定的參數設置
- 多代理協作邏輯

### 如何使用 Models

**在對話中使用：**

1. **開始新對話**
   - 點擊左側 "New Chat"

2. **選擇模型**
   - 在對話窗口頂部，點擊模型選擇下拉選單
   - 你會看到：
     ```
     - gpt-4o-mini
     - gpt-4o-mini-rag
     - claude-haiku-4-5
     - ollama 模型（如果已下載）
     - Multi Agent（你的自定義模型）
     ```

3. **開始對話**
   - 選擇後直接輸入問題
   - 模型會按照其配置運行

### 創建自定義 Model

```
Settings → Models → + New Model

配置項：
- Name: 模型名稱
- Base Model: 基礎模型
- System Prompt: 系統提示詞
- Parameters: 溫度、top_p 等
```

---

## 2. Tools（工具）使用

### 什麼是 Tools？

Tools 是 Open WebUI 的**函數調用**（Function Calling）功能：
- 允許 LLM 調用外部工具
- 例如：網頁搜索、計算器、API 調用等

### 你看到的 "Web Search"

這是一個內建工具，可以讓 AI：
- 搜索網頁獲取實時信息
- 在回答時引用網頁內容

### 如何使用 Tools

#### 方法 1：在對話中自動調用（推薦）

1. **啟用工具**
   - 進入對話
   - 點擊輸入框上方的 **工具圖標**（扳手圖標）
   - 選擇要啟用的工具（如 "Web Search"）

2. **提問**
   ```
   問：2024年台灣總統是誰？
   
   AI 會：
   1. 識別需要實時信息
   2. 自動調用 Web Search
   3. 搜索網頁
   4. 基於搜索結果回答
   ```

#### 方法 2：手動配置默認工具

```
Settings → Interface → Tools

選項：
- Default Tools: 選擇默認啟用的工具
- Allow Tools in Chat: 啟用工具功能
```

### 可用的工具類型

| 工具類型 | 說明 | 示例 |
|---------|------|------|
| **Web Search** | 網頁搜索 | 實時信息查詢 |
| **Code Interpreter** | 代碼執行 | Python 計算、數據分析 |
| **Custom Tools** | 自定義工具 | API 調用、數據庫查詢 |
| **MCP Tools** | MCP 協議工具 | 需要配置 MCP 服務器 |

---

## 3. MCP（Model Context Protocol）問題

### 什麼是 MCP？

**Model Context Protocol (MCP)** 是 Anthropic 提出的標準協議：
- 讓 AI 應用統一訪問外部工具和數據源
- 類似於 AI 的"插件系統"
- 支持文件系統、數據庫、API 等

### 為什麼顯示 "沒有 MCP 服務"？

Open WebUI 支持 MCP，但需要：
1. **配置 MCP 服務器**
2. **在 Open WebUI 中連接**

### 解決方案

#### 選項 1：忽略 MCP（使用內建工具）

如果你只需要基本功能：

```
✅ 使用內建工具：
  - Web Search（已有）
  - Code Interpreter
  - Custom Function Tools

❌ 不需要 MCP：
  - 對於大多數用戶，內建工具已足夠
```

#### 選項 2：配置 MCP 服務器（進階）

如果你需要 MCP 功能：

**步驟 1：安裝 MCP 服務器**

```bash
# 使用 npx 運行 MCP 服務器（示例：文件系統 MCP）
npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/files
```

**步驟 2：配置 Open WebUI**

```yaml
# docker-compose.yml
open-webui:
  environment:
    - MCP_SERVERS=filesystem:http://host.docker.internal:3000
```

**步驟 3：在 UI 中啟用**

```
Settings → Tools → MCP
- 添加 MCP 服務器地址
- 選擇要使用的 MCP 工具
```

#### 選項 3：創建自定義 Tools（推薦）

不依賴 MCP，直接在 Open WebUI 創建工具：

**創建自定義工具：**

```
Tools → + New Tool

示例：天氣查詢工具
---
Name: Weather
Description: Get current weather

Code:
```python
import requests

def get_weather(city: str) -> str:
    """Get weather for a city"""
    api_key = "YOUR_API_KEY"
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    response = requests.get(url)
    return response.json()
```
```

---

## 4. 實用配置示例

### 配置 1：啟用 Web Search

```
1. 確認 Web Search 工具存在
   Tools → Web Search ✅

2. 在對話中啟用
   New Chat → 點擊工具圖標 → 選擇 Web Search

3. 測試
   問：「今天的新聞」
   AI 會自動搜索並回答
```

### 配置 2：創建智能助手模型

```
Models → + New Model

Name: Smart Assistant
Base Model: gpt-4o-mini
System Prompt:
  你是一個智能助手，可以使用以下工具：
  - Web Search: 搜索實時信息
  - Code: 執行 Python 代碼
  
  當需要實時信息時，主動使用 Web Search。
  當需要計算時，主動使用 Code。

Default Tools:
  ✅ Web Search
  ✅ Code Interpreter
```

### 配置 3：Knowledge + Tools 組合

```
場景：企業知識助手

1. 創建 Knowledge
   Knowledge → + New Knowledge
   Name: Company Docs
   Upload: 公司文檔

2. 創建帶工具的對話
   New Chat
   - Model: gpt-4o-mini
   - Tools: ✅ Web Search
   - Knowledge: #Company Docs

3. 使用
   問：「根據公司文檔，我們的產品與市場競品比較如何？」
   
   AI 會：
   - 從 #Company Docs 獲取產品信息
   - 用 Web Search 查找競品信息
   - 綜合回答
```

---

## 5. 常見問題

### Q: 為什麼我的工具沒有被調用？

**可能原因：**
1. ❌ 工具未啟用（檢查工具圖標）
2. ❌ 模型不支持函數調用（某些模型不支持）
3. ❌ 問題不明確（AI 認為不需要工具）

**解決方法：**
```
1. 明確要求：「請搜索網頁回答」
2. 檢查模型：使用支持工具的模型（gpt-4, claude-3+）
3. 查看日誌：Settings → Debug → 查看工具調用記錄
```

### Q: MCP 是必須的嗎？

**答：不是！**

```
✅ 大多數情況下，你不需要 MCP：
  - 內建工具已經很強大
  - 自定義工具可以滿足大部分需求
  
⚠️ 只有以下情況才需要 MCP：
  - 需要標準化的工具協議
  - 想要與其他 MCP 兼容應用共享工具
  - 使用 Claude Desktop 等 MCP 生態
```

### Q: 如何查看工具是否成功調用？

**調試方法：**

```
1. 開啟調試模式
   Settings → Interface → Show Tool Calls
   
2. 對話中會顯示：
   🔧 Calling tool: Web Search
   📝 Tool result: [搜索結果]
   
3. 查看完整日誌
   Settings → Admin → Logs
```

### Q: Tools 和 Functions 有什麼區別？

```
Open WebUI 中：
- Tools: UI 上的工具（可視化管理）
- Functions: 底層實現（Python 代碼）

實際上是同一個東西：
  Tools = Functions = Function Calling
```

---

## 6. 推薦工作流

### 工作流 1：研究助手

```
配置：
  Model: claude-sonnet-4-5
  Tools: ✅ Web Search, ✅ Code Interpreter
  Knowledge: #Research Papers

使用：
  1. 問：「根據我的論文，最新的相關研究是什麼？」
  2. AI 從 Knowledge 讀取你的論文
  3. AI 用 Web Search 查找最新研究
  4. AI 用 Code 分析數據
  5. 綜合回答
```

### 工作流 2：數據分析

```
配置：
  Model: gpt-4o-mini
  Tools: ✅ Code Interpreter

使用：
  1. 上傳 CSV 文件（通過對話）
  2. 問：「分析這個數據集的趨勢」
  3. AI 自動調用 Code 執行 pandas 分析
  4. 生成圖表和報告
```

### 工作流 3：實時信息 + 本地知識

```
配置：
  Model: gpt-4o-mini-rag
  Tools: ✅ Web Search
  Knowledge: #Company Policies

使用：
  問：「根據公司政策，我可以申請遠程工作嗎？最新的遠程工作趨勢是什麼？」
  
  AI 會：
  1. 從 #Company Policies 檢索相關政策（RAG）
  2. 用 Web Search 查找最新趨勢
  3. 綜合回答
```

---

## 7. 總結

### 快速參考

| 功能 | 使用方式 | 何時使用 |
|------|---------|---------|
| **Models** | 對話開始時選擇 | 需要特定能力（推理、代碼等） |
| **Tools** | 點擊工具圖標啟用 | 需要實時信息、計算等 |
| **Knowledge** | 輸入 `#` 引用 | 需要參考特定文檔 |
| **MCP** | 進階配置（可選） | 需要標準化工具協議 |

### 當前狀態

**你已經有：**
- ✅ Models: Multi Agent
- ✅ Tools: Web Search
- ✅ Knowledge: test_db

**可以做：**
1. 在對話中選擇 Multi Agent 模型
2. 啟用 Web Search 工具
3. 用 #test_db 引用知識庫

**不需要：**
- ❌ MCP 服務器（除非有特殊需求）

### 下一步

1. **測試 Tools**
   ```
   New Chat → 啟用 Web Search → 問實時問題
   ```

2. **組合使用**
   ```
   Model: Multi Agent
   Tools: Web Search
   Knowledge: #test_db
   ```

3. **創建自定義工具**（如果需要）
   ```
   Tools → + New Tool → 編寫 Python 函數
   ```

---

**相關文檔：**
- [KNOWLEDGE_GUIDE.md](KNOWLEDGE_GUIDE.md) - Knowledge 功能詳解
- Open WebUI 官方文檔：https://docs.openwebui.com/

