# Open WebUI 快速使用指南

## 🚀 在對話窗口中使用 Models、Tools、Knowledge

### 視覺化流程

```
┌─────────────────────────────────────────────────────────────┐
│  Open WebUI 對話窗口                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  第 1 步：選擇 Model（模型）                                │
│  ┌────────────────────────────────┐                        │
│  │ [下拉選單] gpt-4o-mini ▼      │  ← 點擊這裡              │
│  └────────────────────────────────┘                        │
│    可選擇：                                                 │
│    • gpt-4o-mini（API 模型）                               │
│    • Multi Agent（自定義模型）                             │
│    • llama3.2:3b（Ollama 模型）                           │
│    • claude-haiku-4-5（API 模型）                         │
│                                                             │
│  第 2 步：啟用 Tools（工具）- 可選                          │
│  ┌─────┐                                                   │
│  │ 🔧  │  ← 點擊工具圖標                                   │
│  └─────┘                                                   │
│    可選擇：                                                 │
│    ☑ Web Search（網頁搜索）                                │
│    ☐ Code Interpreter（代碼執行）                         │
│    ☐ Custom Tools（自定義工具）                            │
│                                                             │
│  第 3 步：引用 Knowledge（知識庫）- 可選                    │
│  ┌─────────────────────────────────────────────┐          │
│  │ #test_db 請根據我的文檔回答...             │  ← 輸入 # │
│  └─────────────────────────────────────────────┘          │
│                                                             │
│  [發送]                                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 三種功能使用時機

### 1. Models（模型）- 必選

**何時選擇：** 每次對話開始前

```
使用場景：

✅ 一般對話
   → 選擇：gpt-4o-mini
   
✅ 文檔問答（RAG）
   → 選擇：gpt-4o-mini-rag
   
✅ 本地免費模型
   → 選擇：llama3.2:3b（需先下載）
   
✅ 自定義助手
   → 選擇：Multi Agent
```

### 2. Tools（工具）- 可選

**何時啟用：** 需要外部能力時

```
使用場景：

✅ 查詢實時信息
   → 啟用：Web Search
   → 問題：「2024年最新的 AI 新聞」
   
✅ 數據計算
   → 啟用：Code Interpreter
   → 問題：「計算這個數據集的平均值」
   
✅ API 調用
   → 啟用：Custom Tools
   → 問題：「查詢天氣」
```

### 3. Knowledge（知識庫）- 可選

**何時使用：** 需要參考特定文檔時

```
使用場景：

✅ 基於上傳文檔回答
   → 輸入：#test_db 文檔的主要內容是什麼？
   
✅ 企業知識庫查詢
   → 輸入：#company_docs 產品規格是什麼？
   
✅ 個人筆記查詢
   → 輸入：#my_notes 上次會議討論了什麼？
```

---

## 🎯 實戰示例

### 示例 1：純對話（最簡單）

```
Model:  gpt-4o-mini
Tools:  (不啟用)
Input:  你好，請介紹一下自己

結果：AI 直接回答
```

### 示例 2：實時信息查詢

```
Model:  gpt-4o-mini
Tools:  ✅ Web Search
Input:  台灣今天的天氣如何？

流程：
1. AI 識別需要實時信息
2. 自動調用 Web Search
3. 搜索台灣天氣
4. 基於搜索結果回答
```

### 示例 3：文檔問答

```
Model:  gpt-4o-mini
Tools:  (不啟用)
Input:  #test_db 這個文檔講了什麼？

流程：
1. AI 從 test_db 知識庫檢索
2. 找到相關文檔片段
3. 基於文檔內容回答
```

### 示例 4：組合使用（最強大）

```
Model:  gpt-4o-mini-rag
Tools:  ✅ Web Search
Input:  #test_db 根據我的文檔，比較一下與最新業界趨勢的差異

流程：
1. 從 #test_db 讀取你的文檔（Knowledge）
2. 使用 Web Search 查找最新趨勢（Tool）
3. 使用 -rag 模型從 Qdrant 檢索相關資料（Backend RAG）
4. 綜合三方信息回答
```

---

## ⚠️ 關於 MCP 的說明

### 你看到的 "沒有 MCP 服務" 是正常的

**MCP (Model Context Protocol) 是什麼？**
- Anthropic 提出的標準化工具協議
- 類似於 AI 的"插件系統"
- **不是必須的！**

### 你不需要 MCP 的原因

```
✅ 你已經有：
  1. 內建 Web Search 工具
  2. 可以創建自定義工具
  3. 有 Knowledge 功能
  4. 有 Backend RAG API

❌ MCP 只在以下情況需要：
  1. 要與 Claude Desktop 共享工具
  2. 需要標準化協議
  3. 企業級工具管理
```

### 忽略 MCP 警告即可

**對於大多數用戶：**
- ✅ 使用內建 Web Search
- ✅ 創建自定義 Tools
- ✅ 使用 Knowledge 功能
- ❌ 不需要配置 MCP

---

## 📱 UI 位置指南

### 如何找到各個功能？

```
頂部導航欄：
├─ Models      ← 管理和創建模型
├─ Knowledge   ← 管理知識庫
├─ Prompts     ← 提示詞模板
└─ Tools       ← 管理工具

對話窗口內：
├─ 模型選擇器（頂部下拉選單）    ← 選擇 Model
├─ 工具圖標（🔧，輸入框上方）    ← 啟用 Tools
└─ 輸入 # 符號                   ← 引用 Knowledge
```

### 常見位置截圖說明

```
1. 選擇 Model
   位置：對話窗口頂部
   外觀：[模型名稱 ▼] 下拉選單
   
2. 啟用 Tools
   位置：輸入框上方
   外觀：🔧 扳手圖標
   點擊後：顯示工具列表，可勾選
   
3. 引用 Knowledge
   位置：輸入框內
   方法：直接輸入 # 符號
   效果：彈出知識庫列表
```

---

## 🔧 故障排除

### 問題 1：找不到工具圖標

**解決方法：**
```
1. 確認有可用工具
   → Tools 頁面應該有 "Web Search"
   
2. 檢查模型支持
   → 某些模型不支持工具調用
   → 建議使用：gpt-4, gpt-4o-mini, claude-3+
   
3. 檢查設置
   → Settings → Interface → Show Tool Selector
```

### 問題 2：# 沒有彈出知識庫

**解決方法：**
```
1. 確認已創建知識庫
   → Knowledge 頁面應該有 "test_db"
   
2. 確認知識庫有內容
   → 點擊 test_db → 應該有上傳的文檔
   
3. 刷新頁面
   → Ctrl+F5 強制刷新
```

### 問題 3：工具沒有被調用

**解決方法：**
```
1. 明確指示
   → 不要：「天氣如何？」
   → 要：「請搜索網頁告訴我天氣」
   
2. 檢查工具是否啟用
   → 工具圖標應該顯示為已選中
   
3. 查看調試信息
   → Settings → Interface → Show Tool Calls
```

---

## 💡 最佳實踐

### 推薦組合 1：日常對話

```
Model:  gpt-4o-mini
Tools:  ✅ Web Search（需要時）
Input:  正常對話
```

### 推薦組合 2：文檔研究

```
Model:  gpt-4o-mini-rag
Tools:  (不需要)
Input:  #my_docs 分析這些文檔的共同點
```

### 推薦組合 3：綜合研究

```
Model:  claude-sonnet-4-5
Tools:  ✅ Web Search
Input:  #research_papers 根據這些論文，最新的研究進展是什麼？
```

### 推薦組合 4：免費本地

```
Model:  llama3.2:3b（Ollama）
Tools:  (不需要)
Input:  一般對話，完全免費
```

---

## 📚 更多資源

- [OPENWEBUI_ADVANCED_GUIDE.md](OPENWEBUI_ADVANCED_GUIDE.md) - 詳細功能說明
- [KNOWLEDGE_GUIDE.md](KNOWLEDGE_GUIDE.md) - Knowledge 功能完整指南
- [OLLAMA_GUIDE.md](OLLAMA_GUIDE.md) - 本地模型使用指南
- [MODEL_MANAGEMENT_GUIDE.md](MODEL_MANAGEMENT_GUIDE.md) - 模型管理完整指南

---

**總結：**
- ✅ Models：每次對話必選
- ✅ Tools：需要外部能力時啟用
- ✅ Knowledge：需要參考文檔時用 #
- ❌ MCP：大多數情況不需要

**現在就試試：**
1. 新建對話
2. 選擇一個模型
3. 啟用 Web Search
4. 問一個實時問題！

