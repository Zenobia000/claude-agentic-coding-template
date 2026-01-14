---
description: Local commit checkpoint with Conventional Commits format (NO push)
allowed-tools: Read(.claude/taskmaster-data/*), Bash(git status), Bash(git diff*), Bash(git add*), Bash(git commit*), Bash(git log*)
---

# /commit - 本地提交檢查點

建立本地 Git 提交，遵循 Conventional Commits 規範。

**重要限制**：此命令僅執行本地提交，**絕不推送到遠端**。

## 與 TaskMaster 整合

從當前分支名稱解析任務資訊：
```
分支: feat/task-01-user-login
        ↓
提交訊息自動關聯: Task-01
```

## 執行流程

### 1. 檢查變更狀態
```bash
git status
git diff --staged
```

### 2. 解析當前任務
```
從分支名稱提取:
├── 任務 ID: Task-01
├── 任務類型: feat
└── 任務描述: user-login
```

### 3. 生成提交訊息
```
<type>(<scope>): <subject>

<body>

Task: Task-01
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

### 4. 執行提交
```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Task: Task-01
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

- **禁止** `git push` - 使用 `/pr` 或 `/ship` 命令
- **禁止** 提交敏感文件 (.env, credentials, secrets)
- **禁止** 空提交訊息或無意義的訊息

## 使用範例

```
/commit
```

執行結果：
1. 檢查已暫存的變更
2. 從分支名稱解析任務 ID
3. 生成帶任務關聯的提交訊息
4. 執行 `git commit`
5. 停止（不推送）

## 工作流程位置

```
/start task=Task-01
   ↓
開發中...
   ↓
/commit  ← 你在這裡（可多次）
   ↓
/pr 或 /ship
```
