# MCP 設定指南 - Claude Code 智能協作系統

## 🎯 快速設定步驟

### 1. 複製設定範本
```bash
cp .mcp.json.template .mcp.json
cp .claude/settings.local.json.template .claude/settings.local.json
```

### 2. 取得 API 金鑰

#### 🔍 **Brave Search API** (網路搜尋功能)
1. 前往 [Brave Search API](https://api.search.brave.com/app/dashboard)
2. 註冊並創建 API 金鑰
3. 複製 API 金鑰

#### 📚 **Context7 API** (程式庫文檔查詢)
1. 前往 [Context7 Dashboard](https://upstash.com/context7)
2. 註冊 Upstash 帳號
3. 創建 Context7 專案
4. 複製 API 金鑰

#### 🐙 **GitHub Token** (程式碼管理)
1. 前往 GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. 勾選權限：`repo`, `user`, `workflow`
4. 複製 token

### 3. 更新 API 金鑰

編輯 `.mcp.json` 文件：
```json
{
  "mcpServers": {
    "brave-search": {
      "env": {
        "BRAVE_API_KEY": "你的_Brave_API_金鑰"
      }
    },
    "context7": {
      "env": {
        "CONTEXT7_API_KEY": "你的_Context7_API_金鑰"
      }
    },
    "github": {
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "你的_GitHub_Token"
      }
    }
  }
}
```

編輯 `.claude/settings.local.json` 中對應的權限設定 (如果有需要)。

### 4. 驗證設定

啟動 Claude Code 後執行：
```bash
claude doctor
```

確認所有 MCP 伺服器正常運作。

## 🛡️ 安全注意事項

- ❌ 絕不將 API 金鑰提交到 Git 儲存庫
- ✅ 使用 `.gitignore` 排除 `.mcp.json` 和 `.claude/settings.local.json`
- ✅ 定期更新 API 金鑰
- ✅ 只賦予必要的最小權限

## 🚀 MCP 伺服器功能

| 伺服器 | 功能 | 用途 |
|--------|------|------|
| **brave-search** | 網路搜尋 | 查找最新資訊、技術文檔、解決方案 |
| **context7** | 程式庫文檔 | 查詢任何程式庫的最新 API 文檔和範例 |
| **github** | GitHub 整合 | 管理儲存庫、創建 PR、處理 Issue |
| **playwright** | 瀏覽器自動化 | E2E 測試、UI 驗證、網頁抓取 |

## 🔧 進階設定

### 自定義權限 (Optional)
在 `.claude/settings.local.json` 中調整 `permissions` 設定：

```json
{
  "permissions": {
    "allow": [
      "mcp__brave-search__*",
      "mcp__context7__*",
      "mcp__github__*",
      "mcp__playwright__*"
    ]
  }
}
```

### Hook 系統設定
TaskMaster Hook 系統已預設配置，支援：
- 會話開始檢查
- 使用者輸入處理
- 工具使用前後處理

## ❓ 常見問題

**Q: MCP 伺服器無法啟動？**
A: 執行 `npm install` 確保所有依賴已安裝

**Q: API 金鑰無效？**
A: 檢查金鑰是否正確複製，並確認帳號權限

**Q: GitHub 權限不足？**
A: 確認 Token 包含必要權限：repo, user, workflow

## 🎮 開始使用

設定完成後，你可以：

1. **智能搜尋**：「搜尋最新的 React 18 功能」
2. **文檔查詢**：「查看 Next.js 的路由 API」
3. **GitHub 操作**：「創建新的 issue」
4. **TaskMaster 初始化**：使用 `/task-init [專案名稱]` 開始專案

享受 Claude Code 的強大智能協作體驗！ 🤖⚔️