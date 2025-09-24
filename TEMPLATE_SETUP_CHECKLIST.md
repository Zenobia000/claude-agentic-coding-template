# ✅ Claude Code 人機協作模板設定檢查清單

**v2.0 - Human-Driven Collaboration Edition**

使用此檢查清單確保人類主導的 Subagent 協作系統正確設定並可立即使用。

> **🤖⚔️ 核心理念**：人類是鋼彈駕駛員，Claude 是智能副駕駛系統

## 🚀 **必要設定 (必須完成)**

### 📋 **步驟 1: 基本設定**
- [ ] **複製模板目錄** 到新專案位置
- [ ] **重命名專案目錄** 為您的專案名稱
- [ ] **確認檔案完整性** - 檢查主要檔案是否存在：
  - [ ] `CLAUDE_TEMPLATE.md` (人類主導版主模板)
  - [ ] `.claude/commands/` 目錄及四個 slash commands
  - [ ] `.claude/coordination/human_ai_collaboration_config.md`
  - [ ] `VibeCoding_Workflow_Templates/` 目錄 (完整10個範本)
  - [ ] `.mcp.json`
  - [ ] `README.md` (更新版)

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

## 🎯 **人機協作系統驗證測試**

### 📋 **核心功能驗證**
- [ ] **模板偵測測試**:
  - [ ] Claude Code 是否自動偵測到 CLAUDE_TEMPLATE.md？
  - [ ] 是否提示 "偵測到專案初始化模板"？
  - [ ] 初始化流程是否包含人類主導的設計？

### 🎮 **Slash Commands 測試**
- [ ] **建議控制測試**:
  ```bash
  /suggest-mode medium    # 測試建議頻率控制
  /suggest-mode high      # 測試高頻建議模式
  /suggest-mode off       # 測試關閉建議功能
  ```

- [ ] **程式碼審視測試**:
  ```bash
  /review-code           # 測試當前目錄審視
  /review-code src/      # 測試指定路徑審視
  ```

- [ ] **品質評估測試**:
  ```bash
  /check-quality         # 測試 Linus 哲學品質評估
  ```

- [ ] **範本驗證測試**:
  ```bash
  /template-check api    # 測試 API 範本檢查
  /template-check security # 測試安全範本檢查
  ```

### 🗣️ **自然語言協作測試**
- [ ] **意圖識別測試**:
  - [ ] 說 "檢查程式碼品質" → 🟡 是否建議 code-quality-specialist？
  - [ ] 說 "做安全檢查" → 🔴 是否建議 security-infrastructure-auditor？
  - [ ] 說 "跑測試看覆蓋率" → 🟢 是否建議 test-automation-engineer？
  - [ ] 說 "準備部署" → ⚡ 是否建議 deployment-operations-engineer？

- [ ] **人類確認流程測試**:
  - [ ] 所有 Subagent 建議都需要人類確認？
  - [ ] 可以拒絕建議並繼續工作？
  - [ ] emoji 標註系統是否清楚易懂？

### 🔧 **MCP 服務測試**
- [ ] **基礎服務測試**:
  - [ ] Brave Search 服務是否正常運作？
  - [ ] Context7 服務是否正常運作？
  - [ ] GitHub 服務是否正常運作？
  - [ ] Playwright 服務是否正常運作？

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
- [ ] `CLAUDE_TEMPLATE.md` 檔案是否在根目錄？
- [ ] 檔案是否包含 `<!-- CLAUDE_CODE_PROJECT_TEMPLATE_V2 -->` 標記？
- [ ] 重新啟動 Claude Code

### ❌ **如果 Slash Commands 無法使用**
檢查以下項目：
- [ ] `.claude/commands/` 目錄是否存在？
- [ ] 四個命令檔案是否都存在？ (suggest-mode.md, review-code.md, check-quality.md, template-check.md)
- [ ] Claude Code 版本是否支援 Slash Commands？

### ❌ **如果人類確認流程沒有觸發**
檢查以下項目：
- [ ] 建議模式是否設為 OFF？嘗試 `/suggest-mode medium`
- [ ] 自然語言描述是否清楚？嘗試更直接的表達
- [ ] `.claude/coordination/human_ai_collaboration_config.md` 配置是否正確？

### ❌ **如果 VibeCoding 範本沒有載入**
檢查以下項目：
- [ ] `VibeCoding_Workflow_Templates/` 目錄是否包含完整10個範本？
- [ ] 範本檔案是否有正確的 `.md` 副檔名？
- [ ] 嘗試使用 `/template-check` 指令測試特定範本

### ❌ **如果 MCP 服務無法使用**
檢查以下項目：
- [ ] API keys 是否正確設定？
- [ ] 網路連接是否正常？
- [ ] Claude Code 版本是否支援 MCP？

## 📊 **人機協作系統完成確認**

完成所有必要設定後，您應該能夠：

✅ **人類主導協作**:
- [ ] Claude Code 自動偵測模板並提示初始化
- [ ] VibeCoding 7問澄清流程正常運作
- [ ] 所有 Subagent 建議都需要人類確認

✅ **Slash Commands 控制**:
- [ ] `/suggest-mode` 成功控制建議頻率
- [ ] `/review-code` 觸發 VibeCoding 範本程式碼審視
- [ ] `/check-quality` 執行 Linus 哲學品質評估
- [ ] `/template-check` 驗證特定範本合規性

✅ **自然語言協作**:
- [ ] 自然語言描述能正確識別 Subagent 意圖
- [ ] emoji 標註系統清楚顯示建議類型
- [ ] 人類確認機制運作順暢

✅ **VibeCoding 完整整合**:
- [ ] 完整10個範本都能正確載入和檢查
- [ ] Linus 開發哲學品質標準運作正常
- [ ] 技術債預防機制有效運行

## 🎆 **恭喜設定完成！**

如果所有檢查項目都已完成，您現在可以：

1. **🤖⚔️ 開始人機協作開發** - 您是鋼彈駕駛員，Claude 是智能副駕駛
2. **🎮 使用 Slash Commands** - 精準控制 Subagent 協作流程
3. **🗣️ 自然語言交互** - 直接描述需求，讓 AI 理解您的意圖
4. **📚 應用 VibeCoding 範本** - 建立企業級品質的專案

🔗 **接下來閱讀**: [TEMPLATE_USAGE_GUIDE.md](TEMPLATE_USAGE_GUIDE.md) 了解詳細使用方法

---

**🤖⚔️ 核心精神**: 人類主導決策，AI 提供最佳支援。所有 Subagent 建議都等待您的確認！

**💡 提示**: 保留此檢查清單，以供設定其他專案時參考。