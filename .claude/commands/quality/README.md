# Quality & Development Commands

品質保證與開發輔助命令。

## 命令列表

| 命令 | 說明 | 相關 Agent | 影響 |
|------|------|------------|------|
| `/debug` | 系統化除錯 | - | 🟢 讀取 |
| `/write-tests` | 測試策略與實作 | 🟢 test-automation-engineer | 🟡 寫入 |
| `/review-code` | 程式碼審查 | 🟡 code-quality-specialist | 🟢 讀取 |
| `/check-quality` | 全面品質評估 | 🟡 code-quality-specialist | 🟢 讀取 |
| `/template-check` | VibeCoding 範本合規 | 🎯 workflow-template-manager | 🟢 讀取 |

**影響等級說明**:
- 🟢 讀取：僅分析，不修改檔案
- 🟡 寫入：會建立或修改檔案
- 🔴 系統：影響 Git 或系統狀態

## Linus 式品質標準

> "如果你需要超過 3 層縮排，你就已經完蛋了"

- **Good Taste**: 消除特殊情況
- **簡潔**: 函數只做一件事
- **實用主義**: 解決真問題，不是假想問題

## 工作流程

```
開發完成
    ↓
🟢 /write-tests (寫測試)
    ↓
🟡 /review-code (自我審查)
    ↓
🟡 /check-quality (全面檢查)
    ↓
🎯 /template-check (範本合規)
    ↓
準備提交
```

## Context 整合

所有 Agent 報告輸出至 `.claude/context/`:

| Agent | 輸出目錄 |
|-------|----------|
| 🟡 code-quality-specialist | `context/quality/` |
| 🟢 test-automation-engineer | `context/testing/` |
| 🔴 security-infrastructure-auditor | `context/security/` |
| 🎯 workflow-template-manager | `context/workflow/` |
