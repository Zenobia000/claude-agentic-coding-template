---
description: Systematic debugging with Linus Torvalds philosophy and hypothesis testing
argument-hint: [issue-description]
allowed-tools: Read(/**), Grep(*), Glob(*), Bash(git diff*), Bash(git log*)
---

# /debug - 系統化除錯

運用 Linus Torvalds 的實用主義方法進行系統化除錯。

## 核心原則

> "Bad programmers worry about the code. Good programmers worry about data structures."
> — Linus Torvalds

## 執行流程

### 1. 問題定義
```markdown
## Debug Session: [問題標題]
**開始時間**: [timestamp]
**狀態**: 進行中

### 問題描述
- **預期行為**: [應該發生什麼]
- **實際行為**: [實際發生什麼]
- **錯誤訊息**: [如有]

### 重現步驟
1. [步驟 1]
2. [步驟 2]
```

### 2. Linus 式三問
在分析前先問：
1. **這是個真問題還是臆想出來的？** - 拒絕過度設計
2. **有更簡單的方法嗎？** - 永遠尋找最簡方案
3. **會破壞什麼嗎？** - 向後相容是鐵律

### 3. 假設生成
| # | 假設 | 可能性 | 測試方法 |
|---|------|--------|----------|
| 1 | [理論 1] | 🔴 高 | [如何測試] |
| 2 | [理論 2] | 🟡 中 | [如何測試] |
| 3 | [理論 3] | 🟢 低 | [如何測試] |

### 4. 系統化測試
對每個假設：
- 設計最小測試
- 執行測試
- 記錄結果
- 更新可能性評估

### 5. 根因分析
- 確定根本原因
- 記錄發現
- 識別相關問題

### 6. 解決方案
- 用最笨但最清晰的方式修復
- 確保零破壞性
- 驗證修復有效
- 檢查是否引入回歸

## 常見除錯模式

### 程式碼問題
```bash
# 檢查最近變更
git diff HEAD~5

# 搜尋錯誤相關程式碼
# 使用 Grep 工具而非 bash grep
```

### 環境問題
- 檢查環境變數
- 驗證依賴版本
- 檢查檔案權限
- 審查配置

### 資料問題
- 驗證輸入資料
- 檢查資料流
- 驗證 API 回應
- 審查資料庫狀態

## 除錯檢查清單

- [ ] 問題已清楚定義
- [ ] 至少生成 3 個假設
- [ ] 假設已系統化測試
- [ ] 根因已識別
- [ ] 修復已驗證
- [ ] 未引入回歸
- [ ] 已記錄在 `.claude/context/`

## 與 TaskMaster 整合

除錯完成後：
- 更新相關任務狀態
- 記錄到 `.claude/context/quality/` 目錄
- 考慮是否需要 `/commit` 提交修復

## 使用範例

```
/debug 登入功能在特定情況下失敗
```

執行結果：
1. 收集錯誤訊息和日誌
2. 生成假設列表
3. 系統化測試每個假設
4. 識別根因並提出修復
