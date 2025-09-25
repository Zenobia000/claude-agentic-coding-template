---
description: Validate project compliance against specific VibeCoding workflow templates
argument-hint: [template-name] - One of the 10 available VibeCoding templates
---

# 📋 VibeCoding Template Compliance Checker

## Template Selection: $1

Available VibeCoding Templates:
1. **project-brief** → `01_project_brief_and_prd.md`
2. **adr** → `01_adr_template.md`
3. **bdd** → `02_bdd_scenarios_guide.md`
4. **architecture** → `03_architecture_and_design_document.md`
5. **api** → `04_api_design_specification_template.md`
6. **tests** → `04_module_specification_and_tests.md`
7. **security** → `05_security_and_readiness_checklists.md`
8. **structure** → `06_project_structure_guide.md`
9. **dependencies** → `08_file_dependencies_template.md`
10. **classes** → `09_class_relationships_template.md`

## 🔍 Template Compliance Analysis

**Checking: $1 Template Compliance**

### Template-Specific Validation

#### **If Template: API (`api`)**
```
🔍 API Design Template Compliance:
├── RESTful endpoint design
├── Request/Response schemas
├── Error handling patterns
├── Authentication mechanisms
├── Rate limiting considerations
└── Documentation completeness

🎯 建議 Subagent: 📝 documentation-specialist
```

#### **If Template: Security (`security`)**
```
🛡️ Security & Readiness Template Compliance:
├── Input validation coverage
├── Authentication implementation
├── Authorization mechanisms
├── Data encryption standards
├── OWASP compliance
└── Security testing protocols

🎯 建議 Subagent: 🔴 security-infrastructure-auditor
```

#### **If Template: Architecture (`architecture`)**
```
🏗️ Architecture Template Compliance:
├── Component separation
├── Data flow patterns
├── Scalability considerations
├── Technology stack decisions
├── Integration patterns
└── Performance characteristics

🎯 建議 Subagent: 🟡 code-quality-specialist + 🎯 workflow-template-manager
```

#### **If Template: Tests (`tests`)**
```
🧪 Module Specification & Tests Template Compliance:
├── Unit test coverage
├── Integration test scenarios
├── Mock/stub strategies
├── Test data management
├── Continuous testing setup
└── Performance benchmarks

🎯 建議 Subagent: 🟢 test-automation-engineer
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