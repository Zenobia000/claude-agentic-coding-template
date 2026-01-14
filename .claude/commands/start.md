---
description: Start new task by creating feature/hotfix branch with smart mode detection
argument-hint: type=[feat|fix|hotfix|docs] desc=<short-description> [id=<task-id>]
allowed-tools: Bash(git checkout*), Bash(git pull*), Bash(git branch*), Bash(git fetch*)
---

# /start - 開始新任務

建立新的功能或修復分支，初始化工作環境。

## 執行流程

### 1. 偵測模式與基底分支

**Hotfix**：永遠基於 `main`

**Feature**：
- 檢查 `develop` 分支是否存在
- 有 `develop` → **團隊模式**（基於 `develop`）
- 無 `develop` → **Solo 模式**（基於 `main`）

### 2. 更新基底分支
```bash
git checkout <base_branch>
git pull origin <base_branch>
```

### 3. 建立任務分支
```bash
# 格式: <type>/<task_id>-<short-description>
git checkout -b <branch_name>
```

### 4. 更新 TaskMaster 上下文
- 更新 `.claude/context/` 反映新任務焦點
- 如有 TaskMaster 資料，更新當前任務狀態

## 參數

| 參數 | 說明 | 預設值 |
|------|------|--------|
| `type` | 分支類型 | `feat` |
| `id` | 任務 ID（可選） | - |
| `desc` | 簡短描述（slug 格式） | 必填 |

## 分支命名規範

| 類型 | 格式 | 範例 |
|------|------|------|
| feat | `feat/<desc>` | `feat/user-login` |
| fix | `fix/<desc>` | `fix/auth-bug` |
| hotfix | `hotfix/<desc>` | `hotfix/security-patch` |
| docs | `docs/<desc>` | `docs/api-guide` |
| refactor | `refactor/<desc>` | `refactor/database` |

## 使用範例

### 新功能
```
/start desc=login-page
```
結果：`feat/login-page`（基於 `main` 或 `develop`）

### 緊急修復
```
/start type=hotfix desc=fix-auth
```
結果：`hotfix/fix-auth`（基於 `main`）

### 帶任務 ID
```
/start id=123 desc=user-profile
```
結果：`feat/123-user-profile`

## 與 TaskMaster 整合

開始任務時：
- 自動載入相關 VibeCoding 範本
- 更新 TaskMaster 任務狀態為「進行中」
- 設定上下文到 `.claude/context/`

## 後續建議

任務開始後可使用：
- `/task-status` - 查看當前任務詳情
- `/commit` - 建立本地檢查點
- `/debug` - 遇到問題時除錯
