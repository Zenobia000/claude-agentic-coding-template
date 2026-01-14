# TaskMaster 快速入門指南

**人類主導的智能開發協作系統**

## 適用對象

- 從未使用過 Claude Code 的新手
- 想要體驗智能開發協作的開發者
- 需要結構化任務管理的團隊

## 快速開始（3 分鐘）

### 1. 取得專案
```bash
git clone https://github.com/Zenobia000/claude-agentic-coding-template.git
cd claude-agentic-coding-template
```

### 2. 啟動 Claude Code
```bash
claude
```

### 3. 初始化專案
系統會自動偵測 `CLAUDE_TEMPLATE.md` 並提示初始化：
```bash
/task-init my-project
```

完成！您的 TaskMaster 專案已就緒。

---

## 核心概念

```
👨‍💻 您         = 鋼彈駕駛員（完全控制權）
🤖 TaskMaster = 智能副駕駛（建議和協調）
📋 WBS        = 工作分解結構（任務管理）
```

---

## 命令速查表

### TaskMaster 命令（.claude/commands/taskmaster/）

| 命令 | 說明 |
|------|------|
| `/task-init` | 初始化專案 |
| `/task-status` | 查看專案狀態 |
| `/task-next` | 取得下一任務建議 |
| `/hub-delegate` | 委派給專業智能體 |
| `/suggest-mode` | 調整建議頻率 |

### Git 工作流程（.claude/commands/git/）

| 命令 | 說明 |
|------|------|
| `/start` | 從 WBS 開始任務，建立分支 |
| `/commit` | 本地提交（不推送） |
| `/pr` | 建立 Pull Request |
| `/ship` | Solo 模式發布 |

### 品質命令（.claude/commands/quality/）

| 命令 | 說明 |
|------|------|
| `/debug` | 系統化除錯 |
| `/write-tests` | 撰寫測試 |
| `/review-code` | 程式碼審查 |
| `/check-quality` | 全面品質檢查 |

---

## 典型工作流程

```
┌─────────────────────────────────────────┐
│  /task-init my-project                  │  初始化
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  /task-next                             │  選擇任務
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  /start task=Task-01                    │  建立分支
└────────────────┬────────────────────────┘
                 ↓
           ┌───────────┐
           │  開發中   │
           └─────┬─────┘
                 ↓
┌─────────────────────────────────────────┐
│  /commit (多次)                         │  本地提交
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  /pr 或 /ship                           │  完成任務
└─────────────────────────────────────────┘
```

---

## 初始化流程詳解

### Phase 1: 基本資訊
```
1. 專案名稱？ → my-awesome-app
2. 專案描述？ → 一個任務管理應用
3. 主要語言？ → Python/JavaScript/TypeScript/其他
4. GitHub？   → 是-新增/是-現有/否
```

### Phase 2: VibeCoding 7問
```
🎯 問題 1: 核心問題 - 解決什麼問題？
🎯 問題 2: 核心功能 - 3-5個重要功能？
🎯 問題 3: 技術偏好 - 技術限制？
🎯 問題 4: 用戶體驗 - 期望體驗？
🎯 問題 5: 規模性能 - 預期規模？
🎯 問題 6: 時程資源 - 時間限制？
🎯 問題 7: 成功標準 - 如何衡量成功？
```

### Phase 2.5: 自動文檔生成
```
📄 /generate-docs 自動觸發：
├── docs/01_PRD.md          ← Q1, Q2, Q7
├── docs/02_Architecture.md ← Q3, Q5
├── docs/03_UX_Design.md    ← Q4
└── docs/04_WBS.md          ← Q6, Q7

🚪 人類審查閘道：
[1] ✅ 文檔通過
[2] 📝 需要修改
[3] 🔄 重新生成
```

### Phase 3: 確認計劃
```
📊 TaskMaster 專案計劃:
├── 專案: my-awesome-app
├── 文檔: 已生成 ✅
├── 任務: 12 個
└── 預估: 8 小時

❓ 確認初始化？
[1] ✅ 確認開始
[2] 🔧 調整計劃
[3] ❌ 取消
```

---

## 建議模式

```bash
/suggest-mode high    # 每個決策都詢問
/suggest-mode medium  # 重要決策詢問（預設）
/suggest-mode low     # 只在必要時詢問
/suggest-mode off     # 關閉自動建議
```

---

## 常見問題

### Q: 不知道下一步做什麼？
```bash
/task-status    # 查看狀態
/task-next      # 取得建議
```

### Q: 想要完全手動控制？
```bash
/suggest-mode off
```

### Q: 任務執行失敗？
1. 查看錯誤訊息
2. `/task-status` 檢查狀態
3. 手動執行或調整任務

---

## 相關文件

| 文件 | 說明 |
|------|------|
| `TASKMASTER_README.md` | TaskMaster 完整文檔 |
| `CUSTOMIZATION.md` | 客製化設定指南 |
| `PROJECT_STRUCTURE.md` | 專案結構說明 |
| `commands/README.md` | 命令總覽 |

---

## 核心原則

1. **您永遠是駕駛員** - 所有重要決策都是您做的
2. **系統只是副駕駛** - 提供建議，不會自作主張
3. **透明度至上** - 所有狀態完全可見

---

**Ready to start!** 🚀
