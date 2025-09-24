# 📋 Claude Code 人機協作模板摘要

**版本**: v2.0 - Human-Driven Collaboration
**更新日期**: 2024-09-24
**模板類型**: 人類主導的 Subagent 協作專案模板
**分支**: `human-driven-collaboration`

> **🤖⚔️ 核心理念**：人類是鋼彈駕駛員，Claude 是智能副駕駛系統

## 🎯 **模板概要**

這是一個完整的 Claude Code 專案模板，實現人類主導的 Subagent 協作系統。整合了 VibeCoding 工作流程範本、Linus 開發哲學，以及四個核心 Slash Commands，確保所有 AI 建議都需要人類確認。適用於任何類型的軟體開發專案。

## 📦 **包含組件**

### 核心系統
- **CLAUDE_TEMPLATE.md** - 人類主導版主初始化模板
- **Slash Commands 系統** - 四個核心指令控制 Subagent 協作
- **.claude/ 協作系統** - 完整的 7個專業 Subagent + 人機協作配置
- **VibeCoding 範本庫** - 完整 10個企業級開發範本
- **MCP 服務配置** - 整合外部工具和服務

### 文檔與指南
- **TEMPLATE_USAGE_GUIDE.md** - 詳細使用指南
- **TEMPLATE_SETUP_CHECKLIST.md** - 設定檢查清單
- **README.md** - 模板介紹和快速開始
- **AI_Driven_CLI_Workflow_Setup_Guide.md** - AI 驅動工作流程設定

## 🚀 **核心特色**

### 1. 人類主導的協作系統 🤖⚔️
- **完全控制權** - 所有 Subagent 建議都需人類確認
- **智能建議** - 基於 VibeCoding 範本和 Linus 哲學分析
- **自然語言交互** - 直接描述需求，AI 自動理解意圖

### 2. 四個核心 Slash Commands 🎮
- **`/suggest-mode [level]`** - 控制建議頻率 (high/medium/low/off)
- **`/review-code [path]`** - VibeCoding 範本程式碼審視
- **`/check-quality`** - Linus 哲學品質評估
- **`/template-check [name]`** - 特定範本合規驗證

### 3. 7個專業 Subagent 分工 (人類控制)
- 🟡 code-quality-specialist (程式碼品質、重構建議)
- 🔴 security-infrastructure-auditor (安全稽核、漏洞分析)
- 🟢 test-automation-engineer (測試自動化、覆蓋率分析)
- ⚡ deployment-operations-engineer (部署維運、CI/CD)
- 📝 documentation-specialist (技術文檔、API文檔)
- 🧪 e2e-validation-specialist (端到端驗證、UI測試)
- 🎯 workflow-template-manager (專案規劃、架構決策)

### 4. 完整 VibeCoding 範本整合 (10個)
**專案規劃**：project-brief, adr, bdd
**架構設計**：architecture, api, structure
**品質保證**：tests, security
**程式碼分析**：dependencies, classes

## 🎨 **支援的專案類型**

- **🔹 簡易型** - 原型專案、學習專案、小工具
- **🔹 標準型** - 正式專案、團隊協作、中等複雜度
- **🔹 AI-ML型** - 機器學習、資料科學、AI 應用
- **🔹 客製化** - 基於需求分析的專屬結構

## ⚙️ **技術需求**

### 必要軟體
- Claude Code v1.0+
- Git (版本控制)
- Node.js (MCP 服務)

### API 服務 (可選)
- Brave Search API (網路搜尋功能)
- Context7 API (上下文管理)
- GitHub API (代碼托管整合)

## 📁 **目錄結構**

```
📦 Claude Code Human-Driven Template
├── 📄 CLAUDE_TEMPLATE.md               # 主初始化模板 (人類主導版)
├── 📄 README.md                        # 模板介紹
├── 📄 TEMPLATE_USAGE_GUIDE.md          # 詳細使用指南
├── 📄 TEMPLATE_SETUP_CHECKLIST.md     # 設定檢查清單
├── 📄 TEMPLATE_SUMMARY.md              # 本檔案
├── 📄 LICENSE                          # MIT 授權
├── 📄 .gitignore                       # Git 忽略規則
├── 📄 .mcp.json                        # MCP 服務配置
├── 📁 .claude/                         # 人機協作系統
│   ├── 📁 commands/                    # Slash Commands
│   │   ├── suggest-mode.md             # 建議頻率控制
│   │   ├── review-code.md              # 程式碼審視
│   │   ├── check-quality.md            # 品質評估
│   │   └── template-check.md           # 範本驗證
│   ├── 📁 coordination/                # 人機協作配置
│   │   └── human_ai_collaboration_config.md
│   ├── 📁 agents/                      # 7個專業 Subagent
│   ├── 📁 context/                     # 上下文管理
│   └── 📄 settings.local.json          # Claude Code 設定
├── 📁 VibeCoding_Workflow_Templates/   # 完整10個範本庫
└── 📄 AI_Driven_CLI_Workflow_Setup_Guide.md # AI 工作流程指南
```

## 🔧 **人機協作使用流程**

1. **模板設定** → 複製模板 → 設定 API Keys → 啟動 Claude Code
2. **專案初始化** → 模板偵測 → VibeCoding 7問澄清 → 人類確認架構
3. **協作開發** → 使用 Slash Commands → 自然語言交互 → Subagent 建議
4. **品質把關** → `/check-quality` → 人類決策 → 持續改善

## 🎯 **適用場景**

### 個人開發者 👨‍💻
- 保持完全控制權的 AI 協作開發
- 標準化但靈活的開發流程
- Linus 哲學指導的程式碼品質

### 團隊協作 👥
- 統一的人機協作標準
- 明確分工的 Subagent 系統
- 企業級 VibeCoding 開發範本

### 學習與教育 📚
- 人類主導 AI 協作的最佳實踐
- Linux 內核級的開發哲學學習
- 完整軟體工程生命週期範本

## 📊 **品質特色**

- **🤖⚔️ 人類主導** - 所有 AI 建議都需人類確認，保持完全控制權
- **🎮 直觀控制** - 四個 Slash Commands 精準控制協作流程
- **🗣️ 自然交互** - 自然語言描述需求，AI 智能理解意圖
- **📚 企業標準** - 完整 VibeCoding 10個範本 + Linus 開發哲學
- **🔧 即插即用** - 所有 API keys 和路徑已泛化，無需額外配置
- **📖 完整文檔** - 詳細的使用指南和檢查清單

## 🔄 **版本歷史**

- **v2.0 - Human-Driven** (2024-09-24) - 人類主導協作系統、Slash Commands、完整 VibeCoding 整合
- **v2.0** (2024-09-23) - 心流友善協作系統、VibeCoding 整合
- **v1.x** - 基礎 Subagent 系統和模板結構

## 📞 **支援資源**

- **🚀 快速開始**: README.md
- **📖 詳細指南**: TEMPLATE_USAGE_GUIDE.md
- **✅ 設定檢查**: TEMPLATE_SETUP_CHECKLIST.md
- **🏗️ 系統架構**: .claude/ARCHITECTURE.md

---

**🤖⚔️ 此模板實現了人類主導的 AI 協作新典範：您是鋼彈駕駛員，Claude 是智能副駕駛系統，所有決策由您掌控，AI 提供最佳支援！**