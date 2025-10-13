# ✅ Claude Code 模板設定檢查清單

使用此檢查清單確保模板正確設定並可以立即使用。

## 🚀 **必要設定 (必須完成)**

### 📋 **步驟 1: 基本設定**
- [ ] **複製模板目錄** 到新專案位置
- [ ] **重命名專案目錄** 為您的專案名稱
- [ ] **確認檔案完整性** - 檢查主要檔案是否存在：
  - [ ] `Claude Code Starter Template/CLAUDE_TEMPLATE_zh-TW.md`
  - [ ] `.claude/` 目錄及所有子目錄
  - [ ] `VibeCoding_Workflow_Templates/` 目錄
  - [ ] `.mcp.json`
  - [ ] `TEMPLATE_USAGE_GUIDE.md`

### 🔑 **步驟 2: API Keys 設定**
- [ ] **編輯 .mcp.json**:
  - [ ] 替換 `YOUR_BRAVE_API_KEY` 為實際的 Brave Search API key
  - [ ] 替換 `YOUR_CONTEXT7_API_KEY` 為實際的 Context7 API key
  - [ ] 替換 `your_github_token` 為實際的 GitHub Personal Access Token

- [ ] **編輯 .claude/settings.local.json**:
  - [ ] 替換 `YOUR_BRAVE_API_KEY` 為實際的 Brave Search API key
  - [ ] 替換 `YOUR_CONTEXT7_API_KEY` 為實際的 Context7 API key

### 🔧 **步驟 3: Claude Code 設定**
- [ ] **啟動 Claude Code**:
  ```bash
  claude code
  ```
- [ ] **確認 MCP 服務狀態**:
  ```bash
  claude mcp list
  ```
- [ ] **驗證權限設定** - 確認 Claude Code 可以執行必要操作

## 🎯 **驗證測試 (建議執行)**

### 📋 **功能驗證**
- [ ] **模板偵測測試**:
  - [ ] Claude Code 是否自動偵測到 CLAUDE_TEMPLATE_zh-TW.md？
  - [ ] 是否提示 "偵測到專案初始化模板"？

- [ ] **MCP 服務測試**:
  - [ ] Brave Search 服務是否正常運作？
  - [ ] Context7 服務是否正常運作？
  - [ ] GitHub 服務是否正常運作？
  - [ ] Playwright 服務是否正常運作？

- [ ] **Subagent 系統測試**:
  - [ ] 嘗試說 "檢查程式碼品質" - 是否觸發 code-quality-specialist？
  - [ ] 嘗試說 "執行測試" - 是否觸發 test-automation-engineer？

## ⚙️ **可選設定 (依需求)**

### 📋 **Git 設定**
- [ ] **初始化 git 倉庫**:
  ```bash
  git init
  git add .
  git commit -m "feat: initialize project with Claude Code template"
  ```

- [ ] **設定 GitHub 遠端倉庫** (如需要):
  ```bash
  gh repo create your-project-name --private
  git remote add origin https://github.com/username/your-project-name.git
  git push -u origin main
  ```

### 📋 **專案客製化**
- [ ] **更新專案資訊**:
  - [ ] 編輯 README.md 內容
  - [ ] 更新專案描述和目標
  - [ ] 調整授權資訊

- [ ] **VibeCoding 範本客製化**:
  - [ ] 檢查 `VibeCoding_Workflow_Templates/` 是否符合團隊需求
  - [ ] 客製化範本內容 (如有需要)

## 🚨 **常見問題檢查**

### ❌ **如果 Claude Code 沒有偵測到模板**
檢查以下項目：
- [ ] `CLAUDE_TEMPLATE_zh-TW.md` 檔案是否在正確位置？
- [ ] 檔案是否包含 `<!-- CLAUDE_CODE_PROJECT_TEMPLATE_V2 -->` 標記？
- [ ] 重新啟動 Claude Code

### ❌ **如果 MCP 服務無法使用**
檢查以下項目：
- [ ] API keys 是否正確設定？
- [ ] 網路連接是否正常？
- [ ] Claude Code 版本是否支援 MCP？

### ❌ **如果 Subagent 沒有回應**
檢查以下項目：
- [ ] `.claude/agents/` 目錄下的配置檔案是否完整？
- [ ] 是否在心流模式 (會停用自動觸發)？
- [ ] 嘗試使用明確的觸發語言

## 📊 **設定完成確認**

完成所有必要設定後，您應該能夠：

✅ **基本功能**:
- [ ] Claude Code 自動偵測模板並提示初始化
- [ ] VibeCoding 7問澄清流程正常運作
- [ ] 三種開發模式 (心流/整理/品質) 正確切換

✅ **Subagent 協作**:
- [ ] 7個專業 Subagent 都能正確觸發
- [ ] Agent 之間的協調機制運作正常
- [ ] 上下文傳遞和報告生成功能正常

✅ **VibeCoding 整合**:
- [ ] 範本在適當階段自動載入
- [ ] 品質 Gate 機制運作正常
- [ ] 文檔標準化流程完整

## 🎆 **恭喜設定完成！**

如果所有檢查項目都已完成，您現在可以：

1. **開始您的第一個功能開發** - 享受心流友善的開發體驗
2. **探索 Subagent 協作** - 體驗專業化分工的效率
3. **應用 VibeCoding 範本** - 建立企業級品質的專案

🔗 **接下來閱讀**: [TEMPLATE_USAGE_GUIDE.md](TEMPLATE_USAGE_GUIDE.md) 了解詳細使用方法

---

**💡 提示**: 保留此檢查清單，以供設定其他專案時參考。