---
description: Generate project documents from VibeCoding templates based on 7-question answers
argument-hint: [output-dir] (optional, defaults to docs/)
allowed-tools: Read(/**), Write(/**), Edit(/**), Glob(*), Grep(*)
---

# 📄 VibeCoding 文檔生成器

根據七問答案自動填充 VibeCoding 範本，產出專案文檔。

## 🎯 觸發時機

1. **自動觸發** - `/task-init` 七問完成後自動執行
2. **手動執行** - 隨時可用 `/generate-docs` 更新文檔

## 📋 七問→範本映射

| 七問 | 填充範本 | 產出文檔 |
|------|----------|----------|
| 🎯 問題 1: 核心問題 | `02_project_brief_and_prd.md` | `docs/01_PRD.md` |
| 🎯 問題 2: 核心功能 | `02_project_brief_and_prd.md` | `docs/01_PRD.md` |
| 🎯 問題 3: 技術偏好 | `05_architecture_and_design.md` | `docs/02_Architecture.md` |
| 🎯 問題 4: 用戶體驗 | `17_frontend_information_architecture.md` | `docs/03_UX_Design.md` |
| 🎯 問題 5: 規模性能 | `05_architecture_and_design.md` | `docs/02_Architecture.md` |
| 🎯 問題 6: 時程資源 | `16_wbs_development_plan.md` | `docs/04_WBS.md` |
| 🎯 問題 7: 成功標準 | `02_project_brief_and_prd.md` | `docs/01_PRD.md` |

## 🔄 執行流程

### Step 1: 讀取七問答案

```
📥 從以下來源讀取七問答案：
├── .claude/taskmaster-data/project.json (如存在)
├── 當前對話上下文 (如剛完成七問)
└── 或請求用戶提供
```

### Step 2: 載入 VibeCoding 範本

```
📂 VibeCoding_Workflow_Templates/
├── 02_project_brief_and_prd.md        → PRD 範本
├── 05_architecture_and_design.md      → 架構範本
├── 06_api_design_specification.md     → API 範本
├── 07_module_specification_and_tests.md → 模組範本
├── 16_wbs_development_plan.md         → WBS 範本
└── 17_frontend_information_architecture.md → UX 範本
```

### Step 3: 智能填充

```
🤖 文檔生成策略：

1. PRD 文檔 (docs/01_PRD.md)
   ├── Problem Statement ← 問題 1
   ├── Core Features ← 問題 2
   ├── Success Metrics ← 問題 7
   └── Constraints ← 問題 3 (部分)

2. 架構文檔 (docs/02_Architecture.md)
   ├── Tech Stack ← 問題 3
   ├── System Design ← 問題 2 + 3
   ├── NFR Requirements ← 問題 5
   └── Deployment ← 問題 3 (部署環境)

3. UX 設計文檔 (docs/03_UX_Design.md)
   ├── User Personas ← 問題 4
   ├── User Flows ← 問題 4
   └── Interface Type ← 問題 4

4. WBS 計劃 (docs/04_WBS.md)
   ├── Timeline ← 問題 6
   ├── Resources ← 問題 6
   ├── Milestones ← 問題 6 + 7
   └── Task Breakdown ← 問題 2
```

### Step 4: 人類審查閘道

```
🚪 審查檢查點：

📄 已生成以下文檔：
├── docs/01_PRD.md              [待審查]
├── docs/02_Architecture.md     [待審查]
├── docs/03_UX_Design.md        [待審查]
└── docs/04_WBS.md              [待審查]

❓ 請審查文檔內容：
[1] ✅ 全部通過 - 進入開發階段
[2] 📝 需要修改 - 指出需調整的文檔
[3] 🔄 重新生成 - 補充七問答案後重新生成
[4] ⏸️ 稍後審查 - 保留文檔，暫不進入開發
```

## 📁 輸出結構

```
docs/
├── 01_PRD.md                    # 產品需求文檔
│   ├── Executive Summary
│   ├── Problem Statement
│   ├── Target Users
│   ├── Core Features
│   ├── User Stories
│   ├── Success Metrics
│   └── Out of Scope
│
├── 02_Architecture.md           # 系統架構文檔
│   ├── Overview
│   ├── Tech Stack Decision
│   ├── System Components
│   ├── Data Flow
│   ├── NFR Requirements
│   ├── Deployment Strategy
│   └── ADR References
│
├── 03_UX_Design.md              # 用戶體驗設計
│   ├── User Personas
│   ├── User Journey Map
│   ├── Information Architecture
│   ├── Key User Flows
│   └── Interface Guidelines
│
├── 04_WBS.md                    # 工作分解結構
│   ├── Project Timeline
│   ├── Resource Allocation
│   ├── Phase Breakdown
│   ├── Task List
│   ├── Milestones
│   └── Risk Assessment
│
└── README.md                    # 文檔索引
```

## 🎨 文檔品質標準

### Traffic Light 狀態

| 狀態 | 意義 | 行動 |
|------|------|------|
| 🟢 完整 | 所有必要欄位已填充 | 可進入開發 |
| 🟡 部分 | 有缺失但可接受 | 建議補充 |
| 🔴 不足 | 關鍵資訊缺失 | 必須補充 |

### 完整性檢查

```
📊 文檔完整性報告：

01_PRD.md
├── Problem Statement: 🟢 完整
├── Core Features: 🟢 完整 (5/5)
├── User Stories: 🟡 部分 (3/5)
└── Success Metrics: 🟢 完整

02_Architecture.md
├── Tech Stack: 🟢 完整
├── System Design: 🟡 部分
├── NFR: 🟢 完整
└── Deployment: 🟢 完整

整體狀態: 🟡 85% 完整 - 建議補充 User Stories
```

## 🔗 與 TaskMaster 整合

### 自動同步

文檔生成後自動執行：
1. 更新 `.claude/taskmaster-data/project.json`
2. 生成初始 WBS 任務到 `wbs-todos.json`
3. 通知 TaskMaster Hub 文檔已就緒

### Context 輸出

```
📁 報告輸出位置: .claude/context/docs/
├── generate-docs-report-{timestamp}.md
└── completeness-check-{timestamp}.md
```

## 💡 使用範例

### 自動觸發（七問後）

```
🎯 七問已完成！

正在生成專案文檔...
├── 📄 01_PRD.md ✅
├── 📄 02_Architecture.md ✅
├── 📄 03_UX_Design.md ✅
└── 📄 04_WBS.md ✅

📊 完整性: 92%
🚪 等待駕駛員審查...
```

### 手動執行

```bash
# 生成到預設 docs/ 目錄
/generate-docs

# 指定輸出目錄
/generate-docs documentation/

# 更新特定文檔
/generate-docs --update PRD
```

## ⚠️ 注意事項

1. **七問必須完成** - 沒有七問答案無法生成有意義的文檔
2. **人類審查必要** - 生成的文檔需要駕駛員確認
3. **可迭代更新** - 隨時可重新執行更新文檔
4. **保留原始範本** - VibeCoding 範本不會被修改

---

**讓 VibeCoding 範本活起來！** 📄✨
