# Claude Code Commands

Claude Code 專用命令集，分為三大類別。

## 目錄結構

```
commands/
├── git/              # Git 工作流程
│   ├── commit.md     # 本地提交
│   ├── pr.md         # Pull Request
│   ├── ship.md       # Solo 發布
│   └── start.md      # 開始任務
│
├── taskmaster/       # TaskMaster 系統
│   ├── task-init.md  # 專案初始化
│   ├── task-next.md  # 下一任務
│   ├── task-status.md # 任務狀態
│   ├── hub-delegate.md # Hub 委派
│   └── suggest-mode.md # 建議模式
│
└── quality/          # 品質與開發
    ├── check-quality.md  # 品質檢查
    ├── review-code.md    # 程式碼審查
    ├── write-tests.md    # 測試撰寫
    ├── debug.md          # 除錯
    └── template-check.md # 範本檢查
```

## 快速參考

### Git 工作流程
```
/start desc=feature    # 開始新任務
/commit                # 本地提交
/pr                    # 建立 PR
/ship                  # Solo 發布
```

### TaskMaster 系統
```
/task-init             # 初始化專案
/task-status           # 查看狀態
/task-next             # 下一任務建議
/hub-delegate [agent]  # 委派專家
/suggest-mode [level]  # 調整建議模式
```

### 品質與開發
```
/write-tests [path]    # 寫測試
/debug [issue]         # 除錯
/review-code [path]    # 程式碼審查
/check-quality         # 全面品質檢查
/template-check        # 範本合規檢查
```

## 命令格式

所有命令使用 YAML front matter：

```yaml
---
description: 命令說明
argument-hint: [參數提示]
allowed-tools: Tool1(*), Tool2(/**), Bash(git *)
---
```
