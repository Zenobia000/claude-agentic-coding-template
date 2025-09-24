# 🤖 Claude Code 人機協作專案模板

<!-- TEMPLATE_VERSION: v2.0 - Human-Driven -->
<!-- CLAUDE_CODE_PROJECT_TEMPLATE_V2 -->

**一個完整的 Claude Code 專案模板，實現人類主導的 Subagent 協作系統與 VibeCoding 工作流程範本**

> **🤖⚔️ 核心理念：人類是鋼彈駕駛員，Claude 是智能副駕駛系統**

## 🎯 **模板特色**

- **👨‍💻 人類主導協作** - 所有 Subagent 建議都需人類確認，保持完全控制權
- **🎛️ 智能建議系統** - 基於 VibeCoding 範本自動分析並提供 emoji 標註建議
- **🗣️ 自然語言啟動** - 直接用自然語言描述需求，自動識別並啟動相應 Subagent
- **⚔️ Linus 開發哲學** - 內建 Linux 之父的"好品味"開發準則和品質標準
- **📚 完整範本整合** - 10個 VibeCoding 工作流程範本完整整合
- **🎮 Slash Commands** - 四個核心指令實現完整人機協作控制

## 🚀 **快速開始**

### 1️⃣ 複製模板
```bash
cp -r claude-service/ your-new-project/
cd your-new-project/
```

### 2️⃣ 設定 API Keys
```bash
# 編輯 .mcp.json 和 .claude/settings.local.json
# 替換 YOUR_BRAVE_API_KEY, YOUR_CONTEXT7_API_KEY 等 placeholders
```

### 3️⃣ 啟動 Claude Code
```bash
claude code
# Claude Code 會自動偵測模板並開始初始化流程
```

### 4️⃣ VibeCoding 7問澄清
回答專案需求問題，獲得 AI 建議，選擇專案結構，自動建置完成！

## 🎮 **人機協作 Slash Commands**

### 🎛️ **核心控制指令**
- **`/suggest-mode [level]`** - 設定 Subagent 建議頻率 (high|medium|low|off)
- **`/review-code [path]`** - 基於 VibeCoding 範本觸發程式碼審視
- **`/check-quality`** - Linus 哲學品質評估與 Subagent 建議
- **`/template-check [name]`** - 特定範本合規性驗證

### 🗣️ **自然語言啟動**
直接說出需求，Claude 自動識別並建議相應 Subagent：
- **"檢查程式碼品質"** → 🟡 code-quality-specialist
- **"做安全檢查"** → 🔴 security-infrastructure-auditor
- **"跑測試看覆蓋率"** → 🟢 test-automation-engineer
- **"準備部署"** → ⚡ deployment-operations-engineer

## 🤖 **7個專業 Subagent**

| Agent | 專業領域 | 人類控制方式 | Emoji |
|-------|---------|-------------|-------|
| **code-quality-specialist** | 程式碼品質、重構建議、技術債管理 | 自然語言/slash命令觸發 | 🟡 |
| **security-infrastructure-auditor** | 安全掃描、漏洞分析、合規檢查 | 需人類確認後執行 | 🔴 |
| **test-automation-engineer** | 測試自動化、覆蓋率分析、品質保證 | 基於範本智能建議 | 🟢 |
| **deployment-operations-engineer** | CI/CD、部署策略、營運準備 | 部署前必須確認 | ⚡ |
| **documentation-specialist** | API 文檔、系統文檔、知識庫維護 | API變更時自動建議 | 📝 |
| **e2e-validation-specialist** | 端到端測試、UI驗證、使用者流程 | 功能完成時建議 | 🧪 |
| **workflow-template-manager** | 專案規劃、架構決策、流程管理 | 專案初始化觸發 | 🎯 |

## 📁 **專案結構選項**

- **🔹 簡易型** - 原型專案、學習專案、小工具
- **🔹 標準型** - 正式專案、團隊協作、中等複雜度
- **🔹 AI-ML型** - 機器學習、資料科學、AI 應用
- **🔹 客製化** - Claude 基於需求分析建議的專屬結構

## 📚 **文檔資源**

- **📖 [詳細使用指南](TEMPLATE_USAGE_GUIDE.md)** - 完整的模板使用說明
- **🚀 [快速開始](.claude/QUICK_START.md)** - 5分鐘上手指南
- **🏗️ [系統架構](.claude/ARCHITECTURE.md)** - 深入了解設計原理
- **📋 [初始化指南](.claude/PROJECT_INITIALIZATION_GUIDE.md)** - 專案設定詳解

## 🎨 **VibeCoding 範本庫** (完整10個)

**專案規劃範本：**
- `01_project_brief_and_prd.md` - 專案簡報與需求文件
- `01_adr_template.md` - 架構決策記錄
- `02_bdd_scenarios_guide.md` - BDD 場景測試指南

**架構設計範本：**
- `03_architecture_and_design_document.md` - 系統架構設計
- `04_api_design_specification_template.md` - API 設計規範
- `06_project_structure_guide.md` - 專案結構指南

**品質保證範本：**
- `04_module_specification_and_tests.md` - 模組規格與測試
- `05_security_and_readiness_checklists.md` - 安全就緒檢查

**程式碼分析範本：**
- `08_file_dependencies_template.md` - 檔案依賴關係
- `09_class_relationships_template.md` - 類別關係設計

## ⚙️ **模板內容結構**

```
📦 Claude Code Human-Driven Template
├── 📄 CLAUDE_TEMPLATE.md               # ⭐ 主初始化模板 (人類主導版)
├── 📄 README.md                        # 🏠 本檔案
├── 📁 .claude/                         # 🤖 人機協作系統
│   ├── 📁 commands/                    # 🎮 Slash Commands
│   │   ├── suggest-mode.md             # 🎛️ 建議頻率控制
│   │   ├── review-code.md              # 🔍 程式碼審視
│   │   ├── check-quality.md            # 🏆 品質評估
│   │   └── template-check.md           # 📋 範本驗證
│   ├── 📁 coordination/                # 🤝 協作配置
│   │   └── human_ai_collaboration_config.md # 人機協作設定
│   ├── 📁 agents/                      # 7個專業 Subagent 配置
│   ├── 📁 context/                     # 上下文管理
│   └── 📄 settings.local.json          # Claude Code 設定
├── 📁 VibeCoding_Workflow_Templates/   # 🎨 完整10個範本庫
└── 📄 .mcp.json                        # 🔧 MCP 服務配置
```

## 🌟 **核心優勢**

### ✅ **人類主導的協作體驗**
- **完全控制權** - 所有 Subagent 行動都需人類明確確認
- **智能但不干擾** - 基於範本分析提供建議，但不強制執行
- **自然語言交互** - 用平常話語描述需求，Claude 自動理解意圖

### ✅ **企業級品質標準**
- **Linus 開發哲學** - "好品味"、"Never break userspace" 等原則內建
- **VibeCoding 範本驅動** - 10個完整工作流程範本確保開發品質
- **技術債預防** - 系統化方法防止程式碼惡化

### ✅ **靈活且可控的系統**
- **四層建議控制** - HIGH/MEDIUM/LOW/OFF 靈活調整建議頻率
- **Slash Commands** - 四個核心指令實現精準控制
- **模組化架構** - 每個組件都可獨立配置和使用

## 🚨 **注意事項**

### ⚠️ **使用前必做**
- [ ] 替換 `.mcp.json` 中的 API key placeholders
- [ ] 替換 `.claude/settings.local.json` 中的 API key placeholders
- [ ] 確認 Claude Code 版本支援 MCP 和 Subagent 功能

### ⚠️ **人機協作最佳實務**
- [ ] 善用 `/suggest-mode` 調整建議頻率，保持舒適的協作節奏
- [ ] 相信自己的判斷，Claude 的建議僅供參考
- [ ] 利用自然語言描述需求，讓 AI 理解你的真實意圖
- [ ] 定期使用 `/check-quality` 維護程式碼健康度

## 📞 **支援與回饋**

- **📋 問題排除**: 查看 [TEMPLATE_USAGE_GUIDE.md](TEMPLATE_USAGE_GUIDE.md#-常見問題排除)
- **📚 進階文檔**: 參考 `.claude/` 目錄下的詳細文檔
- **🔧 客製化**: 根據團隊需求調整 VibeCoding 範本

## 📜 **版本資訊**

- **模板版本**: v2.0 - Human-Driven Collaboration
- **分支**: `human-driven-collaboration`
- **更新日期**: 2024-09-24
- **核心理念**: 人類是鋼彈駕駛員，Claude 是智能副駕駛系統
- **相容性**: Claude Code v1.0+ with MCP & Subagent Support

## 🎮 **立即開始**

```bash
# 測試 Slash Commands
/suggest-mode medium
/check-quality
/review-code src/

# 或使用自然語言
"幫我檢查程式碼品質"
"做安全檢查"
"準備部署"
```

---

**🤖⚔️ 開始您的人機協作開發之旅！**

> **核心精神**: 你是駕駛員，我是副駕駛。所有決策由你主導，我提供最佳的技術支援和建議。