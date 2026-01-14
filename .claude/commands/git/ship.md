---
description: Solo mode - Squash merge to main and update WBS task to Done (requires confirmation)
allowed-tools: Read(.claude/taskmaster-data/*), Edit(.claude/taskmaster-data/*), Bash(git checkout*), Bash(git pull*), Bash(git merge*), Bash(git push*), Bash(git branch*), Bash(git log*)
---

# /ship - 功能發布（Solo 模式）

**適用對象**：個人開發者或有權限繞過 PR 的情況。

將功能分支 squash 合併到 main，推送並清理，同時更新 WBS 任務狀態為完成。

## 與 TaskMaster 整合

```
分支: feat/task-01-user-login
              ↓
┌─────────────────────────────┐
│  1. Squash merge to main    │
│  2. Push to remote          │
│  3. 刪除功能分支            │
│  4. 更新 WBS 狀態 → Done    │
└─────────────────────────────┘
```

## 執行流程

### 1. 自我審查
```bash
git log main..HEAD --oneline
```

**AI 必須**：
- 摘要所有變更
- 顯示關聯的任務資訊
- 如變更重大，**詢問確認後才繼續**

### 2. 解析任務資訊
```
從分支名稱提取:
├── 任務 ID: Task-01
├── 任務類型: feat
└── 任務描述: user-login
```

### 3. 更新 main
```bash
git checkout main
git pull origin main
```

### 4. Squash 合併
```bash
git merge --squash <feature-branch>
```

### 5. 建立最終提交
```bash
git commit -m "$(cat <<'EOF'
feat: Task-01 User Login Feature

<AI 生成的變更摘要>

Task: Task-01
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### 6. 推送並清理
```bash
git push origin main
git branch -D <feature-branch>
```

### 7. 更新 WBS 狀態
```
更新 wbs-todos.json:
├── 任務狀態: in_progress → done
├── 完成時間: [timestamp]
├── 合併提交: <commit-hash>
└── 分支已刪除: true
```

## 安全限制

- **需要確認**：重大變更必須詢問人類確認
- **禁止**：在團隊協作專案中使用（請用 `/pr`）
- **警告**：這會直接修改 main 分支

## 適用情境

| 情境 | 適合使用 /ship |
|------|----------------|
| 個人專案 | ✅ |
| 小型修復 | ✅ |
| 實驗性專案 | ✅ |
| 團隊協作 | ❌ 使用 /pr |
| 生產環境 | ❌ 使用 /pr |

## 使用範例

```
/ship
```

執行結果：
1. 「Task-01: 用戶登入功能」
2. 「提交：'add input', 'fix style', 'connect api'」
3. 「**確認要發布嗎？**(y/N)」
4. 切換到 main，Squash 合併
5. 推送到 main
6. 刪除 `feat/task-01-user-login`
7. 更新 WBS 任務狀態為 Done
8. 「Task-01 已完成並發布！」

## 工作流程位置

```
/start task=Task-01
   ↓
開發中... → /commit (多次)
   ↓
/ship  ← 你在這裡（Solo 模式）
   ↓
任務完成 ✅
```
