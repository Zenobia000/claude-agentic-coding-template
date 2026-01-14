# Git Workflow Commands

Git 版本控制工作流程命令。

## 命令列表

| 命令 | 說明 | 安全等級 |
|------|------|----------|
| `/commit` | 本地提交（Conventional Commits） | 低風險 |
| `/start` | 建立功能/修復分支 | 低風險 |
| `/pr` | 同步並建立 Pull Request | 中風險 |
| `/ship` | Solo 模式發布（需確認） | 高風險 |

## 工作流程

```
/start desc=feature-name
    ↓
  開發中...
    ↓
/commit (多次)
    ↓
/pr 或 /ship
```

## 安全注意事項

- `/commit` 僅本地操作，不會推送
- `/pr` 使用 `--force-with-lease` 保護
- `/ship` 會直接修改 main，需人類確認
