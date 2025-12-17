# 🎯 Isolation Rules System - 2025 版本說明

> **版本**: 2.0 (2025 年 12 月更新)  
> **適用**: Cursor 2.x with Custom Slash Commands  
> **狀態**: ✅ 完全適用，可直接使用

## 📢 重要公告

**Cursor 在 2025 年 10 月已將「自訂模式 (Custom Modes)」替換為「自定義斜線指令 (Custom Slash Commands)」。**

✅ 本專案已完成遷移，可直接使用新架構！

## 🚀 立即開始

### 方式 1：在 Cursor AI 聊天中直接使用

```
/van          # 初始化專案與 Memory Bank
/plan         # 任務規劃與分解
/creative     # 設計架構與決策
/implement    # 程式碼實作
/reflect      # 回顧與檢討
/archive      # 文件歸檔
```

### 方式 2：驗證系統設置

```bash
# 執行驗證腳本
./.cursor/rules/isolation_rules/verify_setup.sh

# 應該顯示：🎉 所有檢查通過！
```

## 📁 檔案結構

```
.cursor/
├── commands/                    # ✅ Custom Slash Commands (2025 新架構)
│   ├── van.md                   # /van 指令定義
│   ├── plan.md                  # /plan 指令定義
│   ├── creative.md              # /creative 指令定義
│   ├── implement.md             # /implement 指令定義
│   ├── reflect.md               # /reflect 指令定義
│   └── archive.md               # /archive 指令定義
│
└── rules/
    └── isolation_rules/         # ✅ 專案規則 (繼續有效)
        ├── main.mdc             # 系統總覽與說明
        ├── MIGRATION_GUIDE_2025.md      # 遷移指南
        ├── QUICK_START_2025.md          # 快速開始
        ├── README_2025.md               # 本文件
        ├── verify_setup.sh              # 驗證腳本
        └── Core/
            └── command-execution.mdc    # 指令執行規範
```

## 🔄 系統架構 (2025)

本系統使用 Cursor 2025 年的 **Custom Slash Commands** 架構：

**核心特點**:
- ✅ 斜線指令 (`/van`, `/plan` 等) - 直接在 AI 聊天中使用
- ✅ 檔案化配置 - 指令定義作為專案檔案，可版本控制
- ✅ Memory Bank - 跨階段保持上下文連續性
- ✅ 自動規則載入 - `.cursorrules` 自動應用到所有對話

## 📊 可用指令

| 斜線指令 | 功能 | 狀態 |
|----------|------|-----|
| `/van` | 初始化專案與 Memory Bank | ✅ 就緒 |
| `/plan` | 任務規劃與分解 | ✅ 就緒 |
| `/creative` | 設計架構與決策 | ✅ 就緒 |
| `/implement` | 程式碼實作 | ✅ 就緒 |
| `/reflect` | 回顧與檢討 | ✅ 就緒 |
| `/archive` | 文件歸檔 | ✅ 就緒 |

## 🎓 學習資源

### 新手入門

1. **快速開始指南** (5 分鐘)
   ```
   .cursor/rules/isolation_rules/QUICK_START_2025.md
   ```

2. **實際演練**
   ```bash
   # 在 Cursor AI 聊天中
   /van          # 跟著提示建立 Memory Bank
   /plan         # 練習任務規劃
   ```

### 進階文件

1. **系統架構**
   ```
   .cursor/rules/isolation_rules/main.mdc
   ```

2. **指令執行規範**
   ```
   .cursor/rules/isolation_rules/Core/command-execution.mdc
   ```


## 🔧 故障排除

### 問題 1: 輸入 `/van` 沒有反應

**可能原因**:
- Cursor 版本過舊 (需要 2.0+)
- 指令檔案損壞或遺失

**解決方案**:
```bash
# 1. 檢查檔案
ls -la .cursor/commands/van.md

# 2. 驗證格式
head -n 5 .cursor/commands/van.md

# 3. 重新啟動 Cursor
```

### 問題 2: 指令執行但不符合預期

**可能原因**:
- Memory Bank 未建立
- 前置階段未完成

**解決方案**:
```bash
# 1. 執行驗證腳本
./.cursor/rules/isolation_rules/verify_setup.sh

# 2. 檢查 Memory Bank
ls -la memory-bank/

# 3. 重新從 /van 開始
```

### 問題 3: 規則沒有被應用

**可能原因**:
- 規則檔案路徑錯誤
- frontmatter 格式問題

**解決方案**:
```bash
# 檢查規則檔案
cat .cursor/rules/isolation_rules/main.mdc | head -n 20
```

## 💡 最佳實踐

### ✅ 建議做法

1. **版本控制**
   ```bash
   git add .cursor/commands/
   git add .cursor/rules/
   git commit -m "Add Cursor custom commands and rules"
   ```

2. **團隊協作**
   - 將 `.cursor/` 目錄加入版本控制
   - 團隊成員拉取後即可使用相同指令
   - 統一開發流程

3. **定期回顧**
   - 完成階段後執行 `/reflect`
   - 專案結束後執行 `/archive`
   - 將 Memory Bank 納入專案文件

### ❌ 避免做法

1. 不要跳過 `/van` 初始化階段
2. 不要忽略 Memory Bank 驗證
3. 不要混用新舊架構（Custom Modes + Slash Commands）

## 🌟 核心優勢

### 系統特色

1. **檔案化配置** - 所有指令和規則作為專案檔案，可版本控制
2. **團隊協作** - 團隊成員自動獲得相同的工作流程配置
3. **直覺使用** - 直接在 AI 聊天中輸入 `/command`，無需切換介面
4. **靈活擴展** - 可隨時新增/修改指令，變更立即生效
5. **跨專案復用** - 可將整個 `.cursor/` 目錄複製到其他專案

### Memory Bank 系統

1. **持續性** - 在不同階段間保持上下文
2. **可追溯** - 所有決策和進度都有記錄
3. **團隊協作** - 成員可查看專案狀態
4. **知識管理** - 自動保存設計決策和經驗

## 📞 支援與回饋

### 官方文件

- [Cursor Custom Commands](https://docs.cursor.com/commands)
- [Cursor Rules System](https://docs.cursor.com/rules)

### 專案資源

- **主文件**: `main.mdc` - 系統核心架構
- **快速開始**: `QUICK_START_2025.md` - 5 分鐘快速入門
- **驗證腳本**: `verify_setup.sh` - 系統健康檢查

## ✅ 系統檢查清單

使用前確認：

- [ ] Cursor 版本 ≥ 2.0
- [ ] `.cursor/commands/` 目錄存在
- [ ] 所有 6 個指令檔案存在
- [ ] 指令檔案包含正確的 YAML frontmatter
- [ ] `.cursor/rules/isolation_rules/` 目錄存在
- [ ] `main.mdc` 包含 2025 更新說明
- [ ] 執行 `verify_setup.sh` 通過所有檢查

## 🎉 開始使用

一切準備就緒！在 Cursor AI 聊天中輸入：

```
/van
```

開始您的智能開發之旅！

---

**文件版本**: 2.0  
**最後更新**: 2025 年 12 月 17 日  
**維護者**: isolation_rules 系統  
**授權**: 遵循專案授權條款  

**Linux 環境**: ✅ 完全支援  
**macOS 環境**: ✅ 完全支援  
**Windows 環境**: ✅ 支援（注意指令語法差異）

