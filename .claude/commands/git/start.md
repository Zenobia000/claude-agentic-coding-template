---
description: Start task from WBS - create branch based on TaskMaster task
argument-hint: [task=<Task-ID>] [type=feat|fix|hotfix]
allowed-tools: Read(.claude/taskmaster-data/*), Bash(git checkout*), Bash(git pull*), Bash(git branch*), Bash(git fetch*)
---

# /start - 從 WBS 開始任務

根據 TaskMaster WBS 任務建立對應的 Git 分支。

## 與 TaskMaster 整合

```
TaskMaster WBS
    │
    ├── Task-01: 用戶登入功能      ← /start task=Task-01
    │       ↓
    │   feat/task-01-user-login
    │
    ├── Task-02: API 設計
    ├── Task-03: 資料庫設計
    └── ...
```

## 執行流程

### 1. 讀取 WBS 任務資訊
```
檢查 .claude/taskmaster-data/wbs-todos.json
├── 如有指定 task=Task-XX → 使用該任務
├── 如無指定 → 使用最近的 /task-next 推薦
└── 如都沒有 → 詢問用戶
```

### 2. 解析任務資訊
從 WBS 取得：
- **Task ID**: Task-01, Task-02, ...
- **任務名稱**: user-login, api-design, ...
- **任務類型**: feat, fix, hotfix, docs

### 3. 偵測基底分支
- **hotfix** → 基於 `main`
- **其他** → 檢查 `develop` 是否存在
  - 有 `develop` → 基於 `develop`（團隊模式）
  - 無 `develop` → 基於 `main`（Solo 模式）

### 4. 建立分支
```bash
git checkout <base_branch>
git pull origin <base_branch>
git checkout -b <type>/<task-id>-<description>
```

### 5. 更新 TaskMaster 狀態
```
更新 wbs-todos.json:
├── 任務狀態: pending → in_progress
├── 開始時間: [timestamp]
└── 關聯分支: <branch-name>
```

## 參數

| 參數 | 說明 | 範例 |
|------|------|------|
| `task` | WBS 任務 ID | `task=Task-01` |
| `type` | 覆蓋分支類型 | `type=hotfix` |

## 使用範例

### 自動模式（推薦）
```bash
/task-next              # 先查看推薦任務
/start                  # 自動使用推薦的任務
```

### 指定任務
```bash
/start task=Task-05     # 開始特定任務
```

### 覆蓋類型
```bash
/start task=Task-10 type=hotfix   # 將任務作為 hotfix 處理
```

## 分支命名格式

```
<type>/<task-id>-<slug-description>

範例輸出：
feat/task-01-user-login
feat/task-02-api-design
fix/task-15-auth-validation
hotfix/task-20-security-patch
docs/task-25-api-documentation
```

## 後續命令

任務開始後的工作流程：
```
/start
   ↓
開發中... → /commit (多次)
   ↓
/pr 或 /ship
```

## 錯誤處理

| 情況 | 處理方式 |
|------|----------|
| WBS 資料不存在 | 提示先執行 `/task-init` |
| 任務 ID 不存在 | 顯示可用任務列表 |
| 任務已完成 | 警告並詢問是否繼續 |
| 分支已存在 | 詢問是否切換到現有分支 |
