---
description: Sync branch, push to remote, and generate PR description
allowed-tools: Bash(git fetch*), Bash(git rebase*), Bash(git push*), Bash(git log*), Bash(git diff*), Bash(gh pr*)
---

# /pr - 建立 Pull Request

同步分支、推送到遠端，並生成高品質的 PR 描述。

## 執行流程

### 1. 預檢查
```bash
# 確認工作目錄乾淨
git status

# 確認有本地提交
git log origin/main..HEAD --oneline
```

### 2. 同步基底分支
```bash
git fetch origin
git rebase origin/main
```

### 3. 推送分支
```bash
# 使用 --force-with-lease 確保安全
git push origin <current-branch> --force-with-lease
```

### 4. 生成 PR 描述

分析從基底分支到 HEAD 的所有提交，生成以下格式：

```markdown
## Summary
<1-3 個重點說明>

## Changes
- [變更 1]
- [變更 2]
- [變更 3]

## Type of Change
- [ ] feat: 新功能
- [ ] fix: 錯誤修復
- [ ] refactor: 重構
- [ ] docs: 文檔更新
- [ ] test: 測試相關

## Test Plan
- [ ] 單元測試通過
- [ ] 手動驗證步驟：...

## Checklist
- [ ] 程式碼符合專案風格
- [ ] 已自我審查程式碼
- [ ] 已為複雜邏輯添加註解

---
Generated with [Claude Code](https://claude.ai/code)
```

## 安全限制

- **禁止** 直接推送到 `main` 或 `master`
- **禁止** 使用 `--force`（使用 `--force-with-lease`）
- 推送前必須確認分支名稱

## 分支策略

| 分支類型 | 目標分支 | 說明 |
|----------|----------|------|
| `feat/*` | `main` 或 `develop` | 新功能 |
| `fix/*` | `main` | 錯誤修復 |
| `hotfix/*` | `main` | 緊急修復 |
| `docs/*` | `main` | 文檔更新 |

## 使用範例

```
/pr
```

執行結果：
1. 同步並推送分支
2. 輸出：「分支 `feat/login` 已推送！」
3. 輸出 PR 描述 Markdown
4. 提示：「請將以上內容複製到 GitHub PR」

## 使用 GitHub CLI

如果 `gh` 可用，可直接建立 PR：
```bash
gh pr create --title "..." --body "..."
```

## 與 TaskMaster 整合

PR 建立後：
- 使用 `/task-status` 更新任務狀態
- 記錄到 `.claude/context/` 目錄
