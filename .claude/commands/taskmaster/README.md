# TaskMaster System Commands

TaskMaster 智能協作系統命令。

## 命令列表

| 命令 | 說明 |
|------|------|
| `/task-init` | 專案初始化（自動觸發） |
| `/task-status` | 查看專案和任務狀態 |
| `/task-next` | 取得下一個任務建議 |
| `/hub-delegate` | Hub 協調智能體委派 |
| `/suggest-mode` | 調整建議頻率模式 |

## 工作流程

```
/task-init [project-name]
    ↓
/task-status (查看進度)
    ↓
/task-next (取得建議)
    ↓
/hub-delegate [agent] (委派專家)
```

## 建議模式

| 模式 | 說明 |
|------|------|
| HIGH | 每個任務都建議 |
| MEDIUM | 關鍵點建議（預設） |
| LOW | 僅必要時建議 |
| OFF | 關閉自動建議 |
