# 🏗️ Claude Code Subagent 協作架構

## 核心設計理念

採用「主 Claude Code Agent（PM + 架構師）+ 專業化 IC Subagents」模式，模仿大廠軟體開發組織。

## 主 Claude Code Agent

### 核心職責
- **專案管理 (PM)**: 任務分派、進度協調、資源管理
- **技術架構 (Tech Lead)**: 架構設計、技術選型、技術決策
- **工作流程編排**: VibeCoding 範本管理、開發生命週期協調
- **整合協調**: 跨 agent 溝通、衝突解決、品質把關

### 決策權限
- 🔴 **HIGH**: 系統架構設計、技術選型、跨 agent 衝突解決
- 🟡 **MEDIUM**: 專案優先級、資源分配、品質標準
- 🟢 **LOW**: 任務分派、進度監控、報告整合

## 專業化 IC Subagents (7個)

### 1. **workflow-template-manager** ⭐ 核心
- **領域**: VibeCoding 工作流程範本管理、開發生命週期協調
- **職責**: 評估專案特性、選擇適合模式、協調各階段 Agent 協作
- **輸出**: `.claude/context/workflow/`

### 2. **code-quality-specialist**
- **領域**: 程式碼品質、重構、技術債務、基礎安全
- **職責**: 程式碼審查、重構建議、OWASP 基礎檢查
- **工具**: read, grep, browse_public_web
- **輸出**: `.claude/context/quality/`

### 3. **test-automation-engineer**
- **領域**: 單元測試、整合測試、測試基礎設施
- **職責**: 測試執行、失敗分析、覆蓋率監控
- **工具**: execute_python, read, write, grep
- **輸出**: `.claude/context/testing/`

### 4. **e2e-validation-specialist**
- **領域**: 端到端驗證、UI 測試、跨瀏覽器相容性
- **職責**: 使用者流程測試、UI/UX 互動驗證、煙霧測試
- **工具**: mcp__playwright__*, read
- **輸出**: `.claude/context/e2e/`

### 5. **security-infrastructure-auditor**
- **領域**: 基礎設施安全、依賴安全、合規檢查
- **職責**: 容器安全掃描、依賴漏洞分析、合規檢查
- **工具**: search_web, execute_python, read
- **輸出**: `.claude/context/security/`

### 6. **deployment-operations-engineer**
- **領域**: 零停機部署、基礎設施管理、系統監控
- **職責**: CI/CD 實施、容器編排、監控告警、事故回應
- **工具**: browse_public_web, search_web, execute_python, read
- **輸出**: `.claude/context/deployment/`

### 7. **documentation-specialist**
- **領域**: API 文檔、系統文檔、知識庫維護
- **職責**: API 規格書、架構文檔、開發指南、知識庫整理
- **工具**: read, write, search_web, grep
- **輸出**: `.claude/context/docs/`

## VibeCoding 工作流程整合

### 兩種開發模式
- **Full Process**: 企業級、高風險專案（金流、隱私、合規）
- **MVP Lean**: 快速原型、低風險迭代專案

### 範本驅動協作流程
```
專案啟動 → workflow-template-manager 評估選擇模式
     ↓
範本配置 → 客製化 VibeCoding 範本適配專案
     ↓
階段執行 → 各階段 Agent 依範本協作 + 品質 Gate 檢查
     ↓
持續優化 → 基於執行結果優化範本和流程
```

### 品質 Gate 機制
- **Gate 1**: 規劃完成 - PRD、BDD 場景、風險評估
- **Gate 2**: 設計完成 - 架構設計、API 設計、安全審查
- **Gate 3**: 開發完成 - 模組開發、品質審查、測試覆蓋
- **Gate 4**: 部署就緒 - 安全檢查、E2E 驗證、部署準備

## 目錄結構

```
.claude/
├── README.md                    # 系統總覽
├── QUICK_START.md              # 快速開始指南
├── ARCHITECTURE.md             # 本檔案：架構設計
├── agents/                     # Subagent 配置檔案
│   ├── workflow-template-manager.md
│   ├── code-quality-specialist.md
│   ├── test-automation-engineer.md
│   ├── e2e-validation-specialist.md
│   ├── security-infrastructure-auditor.md
│   ├── deployment-operations-engineer.md
│   └── documentation-specialist.md
├── context/                    # 跨 Agent 上下文共享
│   ├── workflow/               # 工作流程管理報告
│   ├── decisions/              # 主 Agent 技術決策記錄
│   ├── quality/                # 程式碼品質報告
│   ├── testing/                # 測試執行報告
│   ├── e2e/                   # E2E 驗證報告
│   ├── security/              # 安全稽核報告
│   ├── deployment/            # 部署維運報告
│   └── docs/                  # 文檔管理報告
├── coordination/              # Agent 協調機制
│   ├── handoffs/              # Agent 間任務交接
│   └── conflicts/             # 衝突解決記錄
└── templates/                 # 標準化範本
    ├── decision-record-template.md
    ├── agent-report-template.md
    ├── handoff-template.md
    └── workflow-integration-template.md
```

## 協作機制

### 決策權分層
- **主 Agent**: 架構設計、技術選型、衝突解決 (HIGH)
- **workflow-template-manager**: 流程編排、模式選擇 (HIGH)
- **專業 Subagents**: 專業領域最佳實踐、具體實作建議 (MEDIUM)

### 標準化介面
- **輸入**: 明確任務描述與期望輸出
- **輸出**: 結構化報告與建議清單
- **交接**: 透過 coordination/handoffs/ 記錄
- **衝突**: 透過 coordination/conflicts/ 解決

### 上下文共享
- **決策記錄**: 重要技術決策記錄在案
- **可追溯性**: 所有工作都有明確記錄和版本
- **一致性檢查**: 主 Agent 確保各 Agent 輸出一致性

## 核心優勢

✅ **消除角色重疊** - 明確專業分工，避免功能衝突
✅ **強化全局決策** - 架構師整合到主 Agent，獲得完整上下文
✅ **專業化深度** - 每個 Subagent 專注單一領域
✅ **VibeCoding 整合** - 範本驅動的標準化開發流程
✅ **品質內建** - 從規劃到部署的完整品質 Gate

---

充分發揮 Claude Code 原生能力，確保專業深度與協作效率的最佳平衡。