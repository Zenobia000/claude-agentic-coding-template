---
description: Generate high-quality commit message following Conventional Commits (local only, NO push)
allowed-tools: Bash(git status), Bash(git diff*), Bash(git add*), Bash(git commit*), Bash(git log*)
---

# /commit - 本地提交檢查點

建立本地 Git 提交，遵循 Conventional Commits 規範。

**重要限制**：此命令僅執行本地提交，**絕不推送到遠端**。

## 執行流程

### 1. 檢查變更狀態
```bash
git status
git diff --staged
```

### 2. 分析變更內容
- 識別變更類型 (feat/fix/docs/style/refactor/perf/test/chore)
- 確定影響範圍 (scope)
- 生成簡潔的提交主旨

### 3. 生成提交訊息
遵循 Conventional Commits 格式：
```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

### 4. 執行提交
```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

## 提交類型參考

| Type | 用途 | 範例 |
|------|------|------|
| `feat` | 新功能 | `feat(auth): add OAuth2 login` |
| `fix` | 修復錯誤 | `fix(api): resolve null pointer` |
| `docs` | 文檔變更 | `docs(readme): update install guide` |
| `style` | 格式調整 | `style: format with prettier` |
| `refactor` | 重構 | `refactor(db): simplify query` |
| `perf` | 效能優化 | `perf(parser): optimize tokenizer` |
| `test` | 測試相關 | `test(auth): add login tests` |
| `chore` | 雜項 | `chore(deps): update packages` |

## 安全限制

- **禁止** `git push` - 使用 `/pr` 命令推送
- **禁止** 提交敏感文件 (.env, credentials, secrets)
- **禁止** 空提交訊息或無意義的訊息

## 使用範例

```
/commit
```

執行結果：
1. 檢查已暫存的變更
2. 分析變更內容並生成訊息
3. 執行 `git commit`
4. 停止（不推送）

## 與 TaskMaster 整合

提交後可使用：
- `/task-status` - 更新任務進度
- `/task-next` - 取得下一個建議任務
