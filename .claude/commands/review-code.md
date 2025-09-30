---
description: Trigger VibeCoding template-based code review with Subagent suggestions
argument-hint: [path] (optional, defaults to current directory)
allowed-tools: Read(/**), Grep(*), Glob(*)
---

# 🔍 TaskMaster Template-Based Code Review

## Analysis Target
Analyzing code at: **$1** (or current directory if not specified)

## 🎯 TaskMaster VibeCoding Integration

TaskMaster will perform intelligent code review based on VibeCoding templates with Hub coordination:

### 📋 Template Categories Being Checked:

#### **🏗️ Architecture & Design Templates**
- `03_architecture_and_design_document.md` → Code structure analysis
- `04_api_design_specification_template.md` → API design compliance
- `06_project_structure_guide.md` → Project organization

#### **🧪 Quality & Testing Templates**
- `04_module_specification_and_tests.md` → Test coverage analysis
- `05_security_and_readiness_checklists.md` → Security assessment

#### **🔍 Code Analysis Templates**
- `08_file_dependencies_template.md` → Dependency relationships
- `09_class_relationships_template.md` → Class structure design

#### **📝 Documentation Templates**
- `01_project_brief_and_prd.md` → Requirements alignment
- `01_adr_template.md` → Architecture decision tracking
- `02_bdd_scenarios_guide.md` → Behavior specification

## 🎯 TaskMaster Hub Coordination Results

**TaskMaster intelligent analysis with Hub-and-Spoke coordination:**

```
📊 TaskMaster Code Review Results:
🎯 分析路徑: $1
🔍 Hub 情境分析: [Analyzing with enhanced AI coordination...]

🤖 TaskMaster Hub 建議智能體協調:
  🟡 code-quality-specialist (95% 適合度) - 精深程式碼品質分析
  🔴 security-infrastructure-auditor (88% 適合度) - 安全基礎設施稽核
  🟢 test-automation-engineer (82% 適合度) - 測試自動化與覆蓋率
  📝 documentation-specialist (76% 適合度) - 技術文檔精進
  🎯 workflow-template-manager (85% 適合度) - 工作流範本管理

🎯 Hub 協調建議:
  🥇 最佳組合: code-quality + security + workflow-template
  ⏱️ 預估時間: 25-35 分鐘順序執行
  📊 信心指數: 92%

❓ TaskMaster 人類駕駛員決策:
  [1] 🟡 啟動程式碼品質專家
  [2] 🔴 啟動安全稽核專家
  [3] 🎯 啟動最佳組合 (Hub 建議)
  [4] 🔧 自定義協調策略
  [5] 👨‍💻 人類接管審查
  [P] 暫停 TaskMaster

請選擇 (1-5 或 P) - 您是鋼彈駕駛員：
```

## 🤖⚔️ TaskMaster 人類主導機制

**💪 You are the 鋼彈駕駛員 (Gundam Pilot) - TaskMaster is your intelligent co-pilot**
- TaskMaster Hub provides coordinated suggestions with confidence scores
- All agent delegations require your explicit confirmation
- You can override any Hub recommendation with custom strategies
- Emergency controls: pause, stop, or take manual control anytime
- Natural language works: "啟動 TaskMaster 程式碼審查"

## 🔄 TaskMaster Integration Status

This enhanced review leverages:
- **Hub-and-Spoke Intelligence**: Coordinated agent suggestions
- **VibeCoding Templates**: Smart template-driven analysis
- **Human Control Gates**: All critical decisions require your approval
- **Persistent Learning**: TaskMaster learns from your preferences

**TaskMaster ready for your command!** 🚀🤖⚔️