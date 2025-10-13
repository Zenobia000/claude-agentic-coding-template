# Context 目錄說明

此目錄用於儲存各個 Subagent 的工作成果和主 Claude Code Agent 的決策記錄，實現跨 agent 的上下文共享。

## 目錄結構

```
context/
├── decisions/     # 主 Agent 技術決策記錄
├── quality/       # code-quality-specialist 報告
├── testing/       # test-automation-engineer 報告
├── e2e/          # e2e-validation-specialist 報告
├── security/      # security-infrastructure-auditor 報告
├── deployment/    # deployment-operations-engineer 報告
└── docs/         # documentation-specialist 報告
```

## 檔案命名規範

### 決策記錄 (decisions/)
格式: `ADR-{YYYY-MM-DD}-{序號}-{簡要標題}.md`
範例: `ADR-2025-09-23-001-database-selection.md`

### Agent 報告
格式: `{agent-name}-report-{YYYY-MM-DD-HHMM}.md`
範例: `code-quality-specialist-report-2025-09-23-1530.md`

## 各目錄職責

### decisions/
- **負責 Agent**: 主 Claude Code Agent
- **內容**: 系統架構決策、技術選型、跨領域決策
- **格式**: ADR (Architecture Decision Record)
- **更新頻率**: 按需要，重大決策時

### quality/
- **負責 Agent**: code-quality-specialist
- **內容**: 程式碼品質檢查、重構建議、技術債務評估
- **格式**: 標準化品質報告
- **更新頻率**: 程式碼變更後、定期檢查

### testing/
- **負責 Agent**: test-automation-engineer
- **內容**: 測試執行結果、覆蓋率報告、測試基礎設施狀態
- **格式**: 標準化測試報告
- **更新頻率**: 測試執行後、CI/CD 流程中

### e2e/
- **負責 Agent**: e2e-validation-specialist
- **內容**: 端到端測試結果、使用者流程驗證、UI 測試
- **格式**: 標準化 E2E 報告
- **更新頻率**: 部署前、功能發布前

### security/
- **負責 Agent**: security-infrastructure-auditor
- **內容**: 安全稽核報告、漏洞掃描、合規檢查
- **格式**: 標準化安全報告
- **更新頻率**: 定期安全檢查、部署前

### deployment/
- **負責 Agent**: deployment-operations-engineer
- **內容**: 部署執行記錄、系統監控報告、效能分析
- **格式**: 標準化部署報告
- **更新頻率**: 部署執行後、系統監控警告時

### docs/
- **負責 Agent**: documentation-specialist
- **內容**: 文檔更新記錄、知識庫維護報告、API 文檔狀態
- **格式**: 標準化文檔報告
- **更新頻率**: 文檔變更後、定期維護

## 使用原則

### 寫入原則
1. **所有權**: 每個目錄只由對應的 Agent 寫入
2. **標準格式**: 必須使用標準化的報告範本
3. **及時更新**: 完成工作後立即產出報告
4. **版本控制**: 保留歷史版本，便於追溯

### 讀取原則
1. **開放讀取**: 所有 Agent 都可以讀取所有目錄
2. **上下文注入**: 主 Agent 負責整合相關上下文
3. **依賴關係**: Agent 間可以引用其他 Agent 的報告
4. **決策依據**: 使用共享上下文做出更好的決策

### 維護原則
1. **定期清理**: 清理過期的臨時報告
2. **重要保留**: 保留重要的決策記錄和里程碑報告
3. **索引管理**: 維護報告索引，便於查找
4. **備份機制**: 重要決策記錄需要備份

## 協作流程

### 新任務啟動
1. 主 Agent 檢查相關的歷史決策和報告
2. 根據上下文制定任務策略
3. 分派任務給對應的專業 Agent

### 任務執行中
1. Agent 讀取相關的上下文資訊
2. 執行專業工作並產出中間報告
3. 必要時與其他 Agent 協作

### 任務完成後
1. 產出標準化的最終報告
2. 更新相關的決策記錄
3. 為後續任務提供上下文

## 品質保證

### 報告品質
- 使用標準範本確保格式一致
- 包含必要的技術細節和建議
- 提供可操作的行動項目

### 一致性檢查
- 主 Agent 負責檢查報告間的一致性
- 識別並解決潛在的衝突
- 確保技術決策的連貫性

### 追溯性
- 所有重要決策都有明確的記錄
- 可以追溯決策的背景和理由
- 支援決策的檢討和修正

---

此上下文管理機制確保所有 Agent 都能在充分的資訊基礎上做出專業決策，同時保持整體系統的一致性和品質。