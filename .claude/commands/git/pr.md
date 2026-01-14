---
description: Create Pull Request and update WBS task status to Review
allowed-tools: Read(.claude/taskmaster-data/*), Edit(.claude/taskmaster-data/*), Bash(git fetch*), Bash(git rebase*), Bash(git push*), Bash(git log*), Bash(git diff*), Bash(gh pr*)
---

# /pr - 建立 Pull Request

同步分支、推送到遠端、生成 PR 描述，並更新 WBS 任務狀態。

## 與 TaskMaster 整合

```
分支: feat/task-01-user-login
              ↓
┌─────────────────────────────┐
│  1. 推送分支                │
│  2. 生成 PR 描述            │
│  3. 更新 WBS 狀態 → Review  │
└─────────────────────────────┘
```

## 執行流程

### 1. 預檢查
```bash
git status              # 確認工作目錄乾淨
git log origin/main..HEAD --oneline  # 確認有本地提交
```

### 2. 解析任務資訊
```
從分支名稱提取:
├── 任務 ID: Task-01
├── 任務類型: feat
└── 任務描述: user-login
```

### 3. 同步基底分支
```bash
git fetch origin
git rebase origin/main
```

### 4. 推送分支
```bash
git push origin <current-branch> --force-with-lease
```

### 5. 生成 PR 描述
```markdown
## Summary
<根據提交自動生成摘要>

## Task Reference
- **Task ID**: Task-01
- **Task Name**: User Login Feature

## Changes
- [變更 1]
- [變更 2]

## Type of Change
- [x] feat: 新功能

## Test Plan
- [ ] 單元測試通過
- [ ] 手動驗證

---
Generated with [Claude Code](https://claude.ai/code)
```

### 6. 更新 WBS 狀態
```
更新 wbs-todos.json:
├── 任務狀態: in_progress → review
├── PR 連結: <pr-url>
└── 更新時間: [timestamp]
```

## 安全限制

- **禁止** 直接推送到 `main` 或 `master`
- **禁止** 使用 `--force`（使用 `--force-with-lease`）
- 推送前必須確認分支名稱

## 使用範例

```
/pr
```

執行結果：
1. 同步並推送分支
2. 輸出：「分支 `feat/task-01-user-login` 已推送！」
3. 輸出 PR 描述 Markdown
4. 更新 WBS 任務狀態為 Review
5. 提示：「請將以上內容複製到 GitHub PR」

## 使用 GitHub CLI

如果 `gh` 可用：
```bash
gh pr create --title "feat: Task-01 User Login" --body "..."
```

## 工作流程位置

```
/start task=Task-01
   ↓
開發中... → /commit (多次)
   ↓
/pr  ← 你在這裡（團隊模式）
   ↓
等待 Review → Merge
```
