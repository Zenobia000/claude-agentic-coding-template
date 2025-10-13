---
description: Validate project compliance against specific VibeCoding workflow templates
argument-hint: [template-name] - One of the 10 available VibeCoding templates
---

# 📋 VibeCoding Template Compliance Checker

## Template Selection: $1

Available VibeCoding Templates (v2.1):

### 階段 0：總覽與工作流 (00-01)
1. **workflow-manual** → `00_workflow_manual.md`
2. **dev-cookbook** → `01_development_workflow_cookbook.md`

### 階段 1：規劃階段 (02-03)
3. **project-brief** → `02_project_brief_and_prd.md`
4. **bdd** → `03_behavior_driven_development_guide.md`

### 階段 2：架構與設計 (04-06)
5. **adr** → `04_architecture_decision_record_template.md`
6. **architecture** → `05_architecture_and_design_document.md`
7. **api** → `06_api_design_specification.md`

### 階段 3：詳細設計 (07-10)
8. **tests** → `07_module_specification_and_tests.md`
9. **structure** → `08_project_structure_guide.md`
10. **dependencies** → `09_file_dependencies_template.md`
11. **classes** → `10_class_relationships_template.md`

### 階段 4：開發與品質 (11-12, 17)
12. **code-review** → `11_code_review_and_refactoring_guide.md`
13. **frontend-arch** → `12_frontend_architecture_specification.md`
14. **frontend-ia** → `17_frontend_information_architecture_template.md`

### 階段 5：安全與部署 (13-14)
15. **security** → `13_security_and_readiness_checklists.md`
16. **deployment** → `14_deployment_and_operations_guide.md`

### 階段 6：維護與管理 (15-16)
17. **documentation** → `15_documentation_and_maintenance_guide.md`
18. **wbs** → `16_wbs_development_plan_template.md`

## 🔍 Template Compliance Analysis

**Checking: $1 Template Compliance**

### Template-Specific Validation

#### **階段 0-1: 總覽與流程**
```
📖 Workflow Manual / Dev Cookbook Compliance:
├── 開發流程文檔完整性
├── 角色職責定義清晰度
├── 階段轉換檢查點
├── 品質門檻設定
└── 流程可執行性

🎯 建議 Subagent: 🎯 workflow-template-manager
```

#### **階段 1: 規劃階段 (`project-brief`, `bdd`)**
```
📋 Planning Template Compliance:
├── PRD 需求完整性
├── BDD 情境覆蓋率
├── 利害關係人對齊
├── 驗收標準明確性
└── 需求可測試性

🎯 建議 Subagent: 📝 documentation-specialist
```

#### **階段 2: 架構設計 (`adr`, `architecture`, `api`)**
```
🏗️ Architecture & Design Template Compliance:
├── ADR 決策記錄完整性
├── 系統架構設計 (C4 Model)
├── API 契約設計
├── 技術選型合理性
├── 架構可演進性
└── 非功能需求覆蓋

🎯 建議 Subagent: 🟡 code-quality-specialist + 🎯 workflow-template-manager
```

#### **階段 3: 詳細設計 (`tests`, `structure`, `dependencies`, `classes`)**
```
🔧 Detailed Design Template Compliance:
├── 模組規格與契約設計
├── 專案結構組織
├── 檔案依賴關係分析
├── 類別關係設計 (UML)
├── 測試案例定義
└── 介面設計完整性

🎯 建議 Subagent: 🟢 test-automation-engineer + 🟡 code-quality-specialist
```

#### **階段 4: 開發品質 (`code-review`, `frontend-arch`, `frontend-ia`)**
```
💻 Development Quality Template Compliance:
├── Code Review 檢查清單
├── 前端架構規範
├── 前端信息架構 (IA)
├── 組件設計模式
├── 用戶旅程定義
└── 重構機會識別

🎯 建議 Subagent: 🟡 code-quality-specialist + 🎨 e2e-validation-specialist
```

#### **階段 5: 安全部署 (`security`, `deployment`)**
```
🛡️ Security & Deployment Template Compliance:
├── 安全檢查清單完成度
├── OWASP 合規性
├── CI/CD 管線設定
├── 部署策略定義
├── 監控告警配置
└── 回滾機制驗證

🎯 建議 Subagent: 🔴 security-infrastructure-auditor + 🚀 deployment-operations-engineer
```

#### **階段 6: 維護管理 (`documentation`, `wbs`)**
```
📚 Maintenance & Management Template Compliance:
├── 技術文檔完整性
├── WBS 工作分解結構
├── 里程碑追蹤
├── 知識庫維護
├── 操作手冊 (Runbook)
└── 團隊協作流程

🎯 建議 Subagent: 📝 documentation-specialist + 🎯 workflow-template-manager
```

## 📊 Compliance Report

```
📋 Template: $1
🎯 合規性分析結果:

✅ 符合項目: [分析中...]
⚠️  改善機會: [分析中...]
❌ 缺失項目: [分析中...]

🏆 整體合規得分: [計算中...]

🤖 基於分析結果，建議啟動相關 Subagent:
```

## 🎛️ Template-Driven Subagent Suggestions

**Based on $1 template analysis:**

```
❓ 基於 $1 範本的改善建議:

🔧 專門化 Subagent 建議:
  [1] 針對此範本的專業分析
  [2] 合規性改善建議
  [3] 最佳實務實作指導
  [4] 相關範本交叉驗證

🎯 立即行動選項:
  [Y] 啟動建議的專業 Subagent
  [R] 產生詳細合規報告
  [C] 與其他範本進行交叉檢查
  [N] 稍後處理

請選擇 (Y, R, C, 或 N):
```

## 📚 Template Cross-Reference

**Related Templates for $1:**
- Shows interconnected templates that should be considered together
- Suggests holistic compliance approaches
- Identifies template dependencies and relationships

## 🚀 Continuous Compliance

**VibeCoding Template Philosophy:**
- Templates are living guidelines, not rigid constraints
- Compliance improves incrementally
- Human judgment trumps template rules when appropriate
- Focus on value delivery over checkbox completion

**Template compliance is about better outcomes, not perfect documentation!** 📈