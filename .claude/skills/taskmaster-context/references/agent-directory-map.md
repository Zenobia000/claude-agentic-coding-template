# 🗺️ Agent Directory Mapping

此文件定義所有 TaskMaster Agent 與其 context 輸出目錄的完整映射關係。

## 📊 映射表

| Agent ID | 顏色 | 輸出目錄 | 報告類型 |
|----------|------|----------|----------|
| `code-quality-specialist` | 🟡 | `quality/` | 程式碼審查、重構建議、技術債務 |
| `test-automation-engineer` | 🟢 | `testing/` | 測試覆蓋率、測試策略、自動化報告 |
| `security-infrastructure-auditor` | 🔴 | `security/` | 安全漏洞、依賴審計、合規檢查 |
| `documentation-specialist` | 📝 | `docs/` | API 文檔、系統文檔、知識庫 |
| `deployment-expert` | 🚀 | `deployment/` | 部署策略、CI/CD、監控配置 |
| `e2e-validation-specialist` | 🎨 | `e2e/` | UI 測試、用戶流程、跨瀏覽器 |
| `workflow-template-manager` | 🎯 | `workflow/` | 範本合規、WBS 追蹤、流程審計 |

## 🔗 Agent 定義檔位置

所有 Agent 定義檔位於 `.claude/agents/` 目錄：

```
.claude/agents/
├── code-quality-specialist.md      → quality/
├── test-automation-engineer.md     → testing/
├── security-infrastructure-auditor.md → security/
├── documentation-specialist.md     → docs/
├── deployment-expert.md            → deployment/
├── e2e-validation-specialist.md    → e2e/
└── (workflow-template-manager)     → workflow/
```

## 📁 Context 目錄結構

```
.claude/context/
├── README.md           # 主索引
├── quality/            # 🟡 程式碼品質
│   └── README.md
├── testing/            # 🟢 測試報告
│   └── README.md
├── security/           # 🔴 安全稽核
│   └── README.md
├── docs/               # 📝 技術文檔
│   └── README.md
├── deployment/         # 🚀 部署運維
│   └── README.md
├── e2e/                # 🎨 端到端測試
│   └── README.md
└── workflow/           # 🎯 工作流管理
    └── README.md
```

## 🎯 Traffic Light 系統

| 顏色 | 意義 | 適用情境 |
|------|------|----------|
| 🟢 | 低風險 / 通過 | 測試通過、品質良好 |
| 🟡 | 中等 / 需注意 | 有改善空間、需審查 |
| 🔴 | 高風險 / 問題 | 安全問題、必須處理 |

## 📝 命名規範

報告檔案命名格式：
```
{agent-type}-report-{YYYYMMDD-HHMMSS}.md
```

範例：
- `code-quality-specialist-report-20260114-183045.md`
- `security-infrastructure-auditor-report-20260114-184512.md`
- `test-automation-engineer-report-20260114-185023.md`

## 🔄 跨 Agent 參考

Agent 可以讀取其他 Agent 的報告以獲取上下文：

```markdown
# 在 code-quality-specialist 報告中
參考安全報告: [security-report](../security/security-infrastructure-auditor-report-20260114-184512.md)
```

## ⚠️ 注意事項

1. **報告不可刪除** - 保留完整歷史記錄
2. **格式必須統一** - 遵循 report-template.md
3. **時間戳必須精確** - 使用 UTC+8 時區
4. **索引必須更新** - 每次寫入後更新 README.md
