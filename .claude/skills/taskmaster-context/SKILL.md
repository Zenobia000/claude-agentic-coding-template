---
name: taskmaster-context
description: 🎯 TaskMaster Context Writer - 自動將 Agent 報告強制寫入 .claude/context/ 目錄
---

# 🎯 TaskMaster Context Writer Skill

此技能確保所有 TaskMaster Agent 的分析報告**強制寫入** `.claude/context/` 目錄，實現跨 Agent 上下文共享。

## 📋 觸發條件

當以下情況發生時，此技能**自動觸發**：

1. **Task Tool 完成執行後** - 任何 Subagent 任務結束
2. **Agent 產生分析報告後** - code-quality, security-audit, test-report 等
3. **Quality Commands 執行後** - `/review-code`, `/check-quality`, `/template-check`

## 🎯 Agent 輸出目錄映射

| Agent 類型 | 輸出目錄 | 顏色標識 |
|-----------|----------|----------|
| 🟡 code-quality-specialist | `.claude/context/quality/` | 程式碼品質 |
| 🟢 test-automation-engineer | `.claude/context/testing/` | 測試覆蓋 |
| 🔴 security-infrastructure-auditor | `.claude/context/security/` | 安全稽核 |
| 📝 documentation-specialist | `.claude/context/docs/` | 技術文檔 |
| 🚀 deployment-expert | `.claude/context/deployment/` | 部署運維 |
| 🎨 e2e-validation-specialist | `.claude/context/e2e/` | 端到端驗證 |
| 🎯 workflow-template-manager | `.claude/context/workflow/` | 工作流範本 |

## 📝 報告格式

每份報告必須包含以下結構：

```markdown
# [Agent Name] Report

**Generated**: YYYY-MM-DD HH:MM:SS
**Agent**: [agent-type]
**Target**: [分析目標路徑]

## Summary
[簡要摘要]

## Findings
[詳細發現]

## Recommendations
[改善建議]

## Next Steps
[後續步驟]
```

## 🔧 強制執行指令

**在完成任何 Agent 任務後，必須執行以下步驟**：

### Step 1: 確保目錄存在
```bash
.claude/skills/taskmaster-context/scripts/ensure-directories.sh
```

### Step 2: 寫入報告
使用 Write 工具將報告寫入對應目錄：
- 檔案命名格式: `{agent-type}-report-{YYYYMMDD-HHMMSS}.md`
- 路徑: `.claude/context/{category}/`

### Step 3: 更新索引
在 `.claude/context/README.md` 中記錄最新報告

## ⚠️ 強制規則

1. **禁止跳過** - 任何 Agent 任務完成後**必須**寫入 context
2. **格式統一** - 必須遵循報告格式範本
3. **時間戳記** - 每份報告必須包含生成時間
4. **可追溯** - 報告必須標明分析目標

## 🔗 與 TaskMaster 整合

此 Skill 與以下 TaskMaster 元件協同運作：

- `taskmaster.js` - ContextManager 類別
- `hooks-config.json` - Hook 觸發設定
- `.claude/agents/` - Agent 定義檔
- `.claude/commands/quality/` - 品質指令

## 📚 參考資源

- `references/agent-directory-map.md` - 完整目錄映射
- `references/report-template.md` - 報告範本
- `scripts/write-context.sh` - 寫入腳本
- `scripts/ensure-directories.sh` - 目錄初始化
