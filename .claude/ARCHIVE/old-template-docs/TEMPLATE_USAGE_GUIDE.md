# 🚀 Claude Code 通用專案模板使用指南

<!-- TEMPLATE_VERSION: v2.0 -->

## 🎯 **模板概述**

這是一個完整的 Claude Code 專案模板，整合了：
- **心流友善的 Subagent 協作系統** - 保護開發創造力的智能觸發機制
- **VibeCoding 工作流程範本** - 企業級開發生命週期管理
- **Linus 開發心法** - 技術債預防和程式碼品味導向
- **7個專業 Subagent** - 全方位軟體開發支援

## 🚀 **快速開始 (3分鐘設定)**

### 步驟 1：複製模板到新專案
```bash
# 方法 A：直接複製整個目錄
cp -r claude-service/ your-new-project-name/
cd your-new-project-name/

# 方法 B：git clone 後重新初始化
git clone [template-repo] your-new-project-name
cd your-new-project-name/
rm -rf .git  # 移除模板的 git 歷史
```

### 步驟 2：設定 API Keys (必要)
```bash
# 編輯 .mcp.json
# 替換 YOUR_BRAVE_API_KEY 和 YOUR_CONTEXT7_API_KEY 為實際的 API keys

# 編輯 .claude/settings.local.json
# 替換相關的 API key placeholders
```

### 步驟 3：觸發 Claude Code 初始化
```bash
# 確保 CLAUDE_TEMPLATE_zh-TW.md 存在於根目錄
ls "Claude Code Starter Template/CLAUDE_TEMPLATE_zh-TW.md"

# 啟動 Claude Code，它會自動偵測模板並提示初始化
claude code
```

### 步驟 4：VibeCoding 7問澄清
當 Claude Code 偵測到模板後，它會：
1. 詢問是否要設定新專案
2. 收集基礎專案資訊 (名稱、描述、語言等)
3. 執行 VibeCoding 7問深度澄清
4. 提供 AI 建議，等待您的最終決策
5. 基於您的選擇自動建置專案結構

## 🎨 **開發模式指南**

### 🎯 **心流模式 (預設) - 創造期**
**觸發方式**：自然開發狀態，或明確說 "快速原型"、"實驗"、"心流"
```
✅ 特色：
- 完全不打斷開發節奏
- 允許任意檔案結構和快速實驗
- 忽略所有程式碼品質規範
- 專注於創造力和原型開發

🚫 不觸發：
- 任何 Subagent 自動檢查
- VibeCoding 範本載入
- 程式碼品質要求
```

### 🔄 **整理模式 - 重構期**
**觸發方式**：說 "重構"、"整理"、"優化"、"現在可以整理代碼了"
```
✅ 觸發的 Subagents：
- code-quality-specialist (程式碼品質檢查)
- workflow-template-manager (專案結構優化)

📚 載入的 VibeCoding 範本：
- 03_architecture_and_design_document.md
- 06_project_structure_guide.md
- 提供建議但不強制執行
```

### 🛡️ **品質模式 - 交付期**
**觸發方式**：說 "提交"、"部署"、"發布"、"準備上線"、"品質檢查"
```
✅ 觸發的完整 Subagent 鏈：
- test-automation-engineer (測試覆蓋)
- security-infrastructure-auditor (安全檢查)
- e2e-validation-specialist (端到端驗證)
- deployment-operations-engineer (部署準備)
- documentation-specialist (文檔完善)

📚 嚴格依據的 VibeCoding 範本：
- 01_project_brief_and_prd.md
- 02_bdd_scenarios_guide.md
- 04_module_specification_and_tests.md
- 05_security_and_readiness_checklists.md
```

## 🤖 **Subagent 協作系統**

### 核心 7個專業 Subagent
```
1. workflow-template-manager ⭐
   - 專案初始化和工作流程管理
   - VibeCoding 範本管理

2. code-quality-specialist 🔍
   - 程式碼品質審查和重構建議
   - 技術債務分析

3. test-automation-engineer 🧪
   - 單元測試和整合測試
   - BDD 場景測試實作

4. e2e-validation-specialist 🌐
   - 端到端使用者流程測試
   - UI/UX 互動驗證

5. security-infrastructure-auditor 🔒
   - 基礎設施安全掃描
   - 依賴套件漏洞分析

6. deployment-operations-engineer 🚀
   - CI/CD 管線設定
   - 零停機部署策略

7. documentation-specialist 📚
   - API 規格書和系統文檔
   - 技術寫作和維護
```

### 手動觸發 Subagent
```bash
# 明確指定特定 agent
"檢查程式碼品質"           → code-quality-specialist
"執行測試"                → test-automation-engineer
"安全檢查"                → security-infrastructure-auditor
"端到端測試"              → e2e-validation-specialist
"準備部署"                → deployment-operations-engineer
"更新文檔"                → documentation-specialist
```

## 📁 **專案結構模式**

### 🔹 **簡易型** (適用於：原型、學習專案、小工具)
```
project-root/
├── src/           # 原始碼
├── tests/         # 測試檔案
├── docs/          # 文件
└── output/        # 產生的輸出檔案
```

### 🔹 **標準型** (適用於：正式專案、團隊協作、中等複雜度)
```
project-root/
├── src/
│   ├── main/      # 主要應用程式碼
│   │   ├── [language]/ # 特定語言程式碼
│   │   └── resources/  # 非程式碼資源
│   └── test/      # 測試碼
├── docs/          # 文件
├── tools/         # 開發工具
├── examples/      # 使用範例
└── output/        # 產生的輸出檔案
```

### 🔹 **AI-ML型** (適用於：機器學習、資料科學、AI 應用)
```
project-root/
├── src/           # 原始碼
├── data/          # 資料集管理
├── notebooks/     # Jupyter notebooks
├── models/        # ML 模型
├── experiments/   # ML 實驗追蹤
├── docs/          # 文件
└── output/        # 產生的輸出檔案
```

## 🎨 **VibeCoding 範本庫**

### 📋 **可用範本**
```
01_project_brief_and_prd.md         # 專案簡報與產品需求文件
02_bdd_scenarios_guide.md           # 行為驅動開發情境指南
03_architecture_and_design_document.md # 架構與設計文件
04_api_design_specification_template.md # API 設計規格範本
04_module_specification_and_tests.md   # 模組規格與測試案例
05_security_and_readiness_checklists.md # 安全與就緒檢查清單
06_project_structure_guide.md          # 專案結構指南
08_file_dependencies_template.md       # 檔案依賴範本
09_class_relationships_template.md     # 類別關係範本
workflow_manual.md                     # 工作流程手冊
```

### 🎯 **範本使用時機**
- **心流模式**：完全不載入範本
- **整理模式**：載入架構和結構範本作為參考
- **品質模式**：嚴格依據測試、安全、文檔範本執行

## ⚙️ **配置檔案說明**

### 📄 **.mcp.json** - MCP 服務配置
```json
{
  "mcpServers": {
    "brave-search": {
      "env": { "BRAVE_API_KEY": "YOUR_BRAVE_API_KEY" }
    },
    "context7": {
      "env": { "CONTEXT7_API_KEY": "YOUR_CONTEXT7_API_KEY" }
    },
    "github": {
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token" }
    },
    "playwright": {}
  }
}
```

### 📄 **.claude/settings.local.json** - Claude Code 本地設定
包含權限配置和 MCP 服務設定，確保替換其中的 API key placeholders。

## 🚨 **常見問題排除**

### Q: Claude Code 沒有偵測到模板？
**A**: 確認以下檢查點
- [ ] `Claude Code Starter Template/CLAUDE_TEMPLATE_zh-TW.md` 檔案存在
- [ ] 檔案包含 `<!-- CLAUDE_CODE_PROJECT_TEMPLATE_V2 -->` 標記
- [ ] 重新啟動 Claude Code

### Q: VibeCoding 7問流程被跳過？
**A**: 檢查 workflow-template-manager 配置
- [ ] `.claude/agents/workflow-template-manager.md` 檔案存在
- [ ] 確認 `.claude/context/workflow/` 目錄已建立

### Q: Subagent 沒有自動觸發？
**A**: 檢查觸發條件
- [ ] 確認是否在心流模式 (會停用自動觸發)
- [ ] 使用明確的觸發語言 ("重構"、"提交"、"檢查品質")
- [ ] 檢查 `.claude/agents/` 目錄下的 agent 配置檔案

### Q: API 服務無法使用？
**A**: 檢查 API 配置
- [ ] 替換 `.mcp.json` 中的 API key placeholders
- [ ] 替換 `.claude/settings.local.json` 中的 API key placeholders
- [ ] 確認 API keys 有效且有足夠權限

## 🎯 **最佳實踐建議**

### 💡 **開發節奏**
1. **創造期** → 使用心流模式，專注實驗和原型
2. **整理期** → 功能基本完成後，進入重構模式
3. **交付期** → 準備發布時，進入品質模式

### 💡 **Subagent 協作**
1. **讓專業的做專業的事** - 充分利用各 agent 的專業能力
2. **尊重心流** - 不在創造期強制品質檢查
3. **階段性品質** - 在自然檢查點進行品質把關

### 💡 **VibeCoding 範本**
1. **參考不強制** - 範本作為指導，保持創作彈性
2. **階段性載入** - 在適當的開發階段載入對應範本
3. **上下文一致** - 確保各階段產出互相呼應

## 🔗 **進階資源**

- [🚀 快速開始指南](.claude/QUICK_START.md)
- [🏗️ 架構設計文檔](.claude/ARCHITECTURE.md)
- [📚 專案初始化指南](.claude/PROJECT_INITIALIZATION_GUIDE.md)
- [🔄 整合流程說明](.claude/INTEGRATION_WORKFLOW.md)
- [✅ 整合檢查清單](.claude/INTEGRATION_CHECKLIST.md)

## 📞 **技術支援**

如果遇到問題：
1. 查閱 [常見問題排除](#-常見問題排除)
2. 檢查 [進階資源](#-進階資源) 中的詳細文檔
3. 確認所有配置檔案中的 placeholders 都已替換

---

**🎆 享受高效率、高品質的 Claude Code 開發體驗！**