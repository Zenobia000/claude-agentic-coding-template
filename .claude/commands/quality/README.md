# Quality & Development Commands

品質保證與開發輔助命令。

## 命令列表

| 命令 | 說明 | 相關 Agent |
|------|------|------------|
| `/check-quality` | 全面品質評估 | code-quality-specialist |
| `/review-code` | 程式碼審查 | code-quality-specialist |
| `/write-tests` | 測試策略與實作 | test-automation-engineer |
| `/debug` | 系統化除錯 | - |
| `/template-check` | VibeCoding 範本合規檢查 | workflow-template-manager |

## Linus 式品質標準

> "如果你需要超過 3 層縮排，你就已經完蛋了"

- **Good Taste**: 消除特殊情況
- **簡潔**: 函數只做一件事
- **實用主義**: 解決真問題，不是假想問題

## 工作流程

```
開發完成
    ↓
/write-tests (寫測試)
    ↓
/review-code (自我審查)
    ↓
/check-quality (全面檢查)
    ↓
/template-check (範本合規)
```
