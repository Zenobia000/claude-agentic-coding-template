# /ship - 功能發布（Solo 模式）

**適用對象**：個人開發者或有權限繞過 PR 的情況。

將功能分支 squash 合併到 main，推送並清理。

## 執行流程

### 1. 自我審查
```bash
# 分析功能分支的所有提交
git log main..HEAD --oneline
```

**AI 必須**：
- 摘要所有變更
- 如變更重大，**詢問確認後才繼續**

### 2. 更新 main
```bash
git checkout main
git pull origin main
```

### 3. Squash 合併
```bash
git merge --squash <feature-branch>
```

### 4. 建立最終提交
```bash
git commit -m "$(cat <<'EOF'
feat: <功能名稱>

<AI 生成的變更摘要>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### 5. 推送並清理
```bash
git push origin main
git branch -D <feature-branch>
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
1. 「我看到您實作了登入頁面。提交：'add input', 'fix style', 'connect api'」
2. 「**確認要發布嗎？**(y/N)」
3. 切換到 main
4. Squash 成單一提交：`feat: user-login-page`
5. 推送到 main
6. 刪除 `feat/user-login`
7. 「功能已發布！」

## 與 TaskMaster 整合

發布後：
- 使用 `/task-status` 更新任務為完成
- 使用 `/task-next` 取得下一個任務建議
