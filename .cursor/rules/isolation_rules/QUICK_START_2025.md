# 🚀 Quick Start Guide - Isolation Rules (2025)

> **適用版本**: Cursor 2.x with Custom Slash Commands (2025年10月後)

## ⚡ 快速開始

### 在 Cursor AI 聊天中直接輸入：

```
/van          # 🚀 初始化專案
/plan         # 📋 規劃任務
/creative     # 🎨 設計架構
/implement    # 💻 實作程式
/reflect      # 🔍 回顧檢討
/archive      # 📚 歸檔文件
```

## 📊 工作流程

```
開始新專案 → /van → /plan → /creative → /implement → /reflect → /archive
```

## 🎯 各階段重點

| 指令 | 核心任務 | Memory Bank 檔案 |
|------|---------|-----------------|
| `/van` | 建立 Memory Bank 結構 | 建立 `tasks.md`, `activeContext.md` |
| `/plan` | 任務分解與規劃 | 更新 `tasks.md` |
| `/creative` | 架構設計與決策 | 建立 `creative-*.md` |
| `/implement` | 程式碼實作 | 更新 `progress.md` |
| `/reflect` | 回顧與改進 | 更新 `tasks.md` |
| `/archive` | 文件整理與歸檔 | 歸檔所有文件 |

## 🔍 驗證 Memory Bank

所有指令執行前都會檢查：

```bash
# Memory Bank 必須包含
memory-bank/
├── tasks.md           # 任務清單（必須）
├── activeContext.md   # 當前焦點（必須）
├── creative-*.md      # 設計決策（/creative 後）
└── progress.md        # 進度追蹤（/implement 後）
```

## 💻 平台指令快速參考

| 操作 | Linux/Mac | Windows |
|-----|-----------|---------|
| 建立檔案 | `touch file.txt` | `echo. > file.txt` |
| 建立目錄 | `mkdir -p dir` | `mkdir dir` |
| 查看內容 | `cat file.txt` | `type file.txt` |
| 列出檔案 | `ls -la` | `dir` |

## 🚨 重要規則

1. **強制 Memory Bank**：任何操作前都必須驗證 Memory Bank 存在
2. **階段順序**：建議按順序執行，但可依需求調整
3. **檔案狀態**：每個階段完成後檢查必要檔案
4. **平台適配**：系統會自動偵測作業系統並使用正確指令

## 🛠️ 故障排除

### 問題：輸入 `/van` 沒有反應

**解決方案**：
1. 確認 Cursor 版本 ≥ 2.0
2. 檢查 `.cursor/commands/van.md` 是否存在
3. 重新啟動 Cursor

### 問題：Memory Bank 建立失敗

**解決方案**：
1. 檢查專案根目錄權限
2. 手動建立 `memory-bank/` 目錄
3. 再次執行 `/van`

### 問題：指令無法載入規則

**解決方案**：
1. 確認 `.cursor/rules/isolation_rules/` 存在
2. 檢查 `main.mdc` 檔案格式
3. 查看 Cursor AI 錯誤訊息

## 📚 詳細文件

- **完整系統說明**: `.cursor/rules/isolation_rules/main.mdc`
- **遷移指南**: `.cursor/rules/isolation_rules/MIGRATION_GUIDE_2025.md`
- **指令執行規範**: `.cursor/rules/isolation_rules/Core/command-execution.mdc`

## 🎓 最佳實踐

1. ✅ 每次啟動新專案都從 `/van` 開始
2. ✅ 定期執行 `/reflect` 檢討進度
3. ✅ 完成階段後執行 `/archive` 保存知識
4. ✅ 將 Memory Bank 加入版本控制
5. ✅ 團隊協作時分享指令檔案

## 🔗 相關連結

- Cursor 官方文件：https://docs.cursor.com/
- Custom Slash Commands：https://docs.cursor.com/commands
- Rules System：https://docs.cursor.com/rules

---

**最後更新**: 2025年12月17日  
**系統版本**: Cursor 2.x with Custom Slash Commands  
**Linux 環境**: ✅ 完全支援

