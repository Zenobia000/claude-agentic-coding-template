# Memory Bank

> **Persistent Context Storage** for the isolation_rules workflow system

---

## 📚 What is Memory Bank?

Memory Bank 是 isolation_rules 系統的核心組件，用於在不同開發階段間保持上下文連續性。

### 核心概念

- **持續性**: 所有決策、進度、設計都記錄在這裡
- **階段間傳遞**: 每個階段讀取並更新 Memory Bank
- **單一真相來源**: tasks.md 是所有任務的唯一參考
- **版本控制**: 所有檔案應納入 Git

---

## 📁 檔案結構

```
memory-bank/
├── tasks.md              # 任務清單 (Source of Truth)
├── activeContext.md      # 當前焦點
├── creative-*.md         # 設計決策 (/creative 階段建立)
├── progress.md           # 實作進度 (/implement 階段建立)
└── README.md             # 本說明檔案
```

---

## 🔄 各階段如何使用

### 1. VAN MODE (`/van`)
- **建立**: `tasks.md`, `activeContext.md`
- **驗證**: Memory Bank 結構完整性

### 2. PLAN MODE (`/plan`)
- **讀取**: `tasks.md`, `activeContext.md`
- **更新**: `tasks.md` (新增任務分解)

### 3. CREATIVE MODE (`/creative`)
- **讀取**: `tasks.md`
- **建立**: `creative-*.md` (設計決策文件)
- **更新**: `tasks.md` (標記設計完成)

### 4. IMPLEMENT MODE (`/implement`)
- **讀取**: `tasks.md`, `creative-*.md`
- **建立**: `progress.md` (如果不存在)
- **更新**: `tasks.md`, `progress.md`

### 5. REFLECT MODE (`/reflect`)
- **讀取**: `tasks.md`, `progress.md`
- **更新**: `tasks.md` (更新狀態、記錄經驗)

### 6. ARCHIVE MODE (`/archive`)
- **讀取**: `tasks.md`, `progress.md`, `creative-*.md`
- **歸檔**: 所有文件整理到 `docs/`

---

## 📝 檔案說明

### tasks.md
**用途**: 所有任務的單一真相來源

**包含**:
- 任務清單與狀態
- 優先級與分配
- 依賴關係
- 驗收條件

**更新時機**: 幾乎所有階段都會讀取/更新

---

### activeContext.md
**用途**: 記錄當前工作焦點

**包含**:
- 當前階段
- 正在進行的工作項目
- 最近的決策
- 待辦事項
- 阻礙因素

**更新時機**: 每次切換階段時

---

### creative-*.md
**用途**: 設計決策文件

**命名格式**: `creative-[feature-name]-[date].md`

**包含**:
- 架構決策
- 技術選擇
- 設計模式
- API 設計
- 資料結構

**建立時機**: CREATIVE 階段

---

### progress.md
**用途**: 實作進度追蹤

**包含**:
- 實作狀態
- 完成的功能
- 遇到的問題
- 技術債務
- 測試結果

**建立時機**: IMPLEMENT 階段開始時

---

## 🎯 最佳實踐

### ✅ 建議做法

1. **頻繁更新**: 每完成重要工作就更新
2. **清晰記錄**: 使用明確的語言和結構
3. **版本控制**: 將 Memory Bank 納入 Git
4. **保持同步**: 團隊成員定期同步
5. **定期回顧**: 使用 `/reflect` 檢討

### ❌ 避免做法

1. 不要跳過更新
2. 不要只記錄在腦中
3. 不要混淆檔案職責
4. 不要忽略驗證錯誤
5. 不要手動刪除檔案（除非確定）

---

## 🔍 驗證 Memory Bank

### 快速檢查

```bash
# 檢查必要檔案
ls -la memory-bank/

# 應該看到:
# tasks.md          ✅
# activeContext.md  ✅
```

### 完整驗證

```bash
# 執行系統驗證腳本
./.cursor/rules/isolation_rules/verify_setup.sh
```

---

## 🆘 常見問題

### Q: Memory Bank 檔案可以刪除嗎？

**A**: 不建議。這些檔案是專案的知識庫。如果需要重新開始，可以歸檔舊的 Memory Bank 而不是刪除。

### Q: 多人協作時如何處理衝突？

**A**: 
1. 將 Memory Bank 納入 Git
2. 使用分支進行開發
3. 合併時仔細檢查 tasks.md
4. 使用 `/reflect` 同步理解

### Q: Memory Bank 檔案可以自動生成嗎？

**A**: 部分可以。`/van` 會自動建立基本結構，但內容需要在各階段手動填寫以確保品質。

### Q: 什麼時候歸檔 Memory Bank？

**A**: 
- 專案里程碑完成時
- 大版本發布後
- 使用 `/archive` 指令

---

## 📚 更多資源

- **快速開始**: `.cursor/rules/isolation_rules/QUICK_START_2025.md`
- **系統說明**: `.cursor/rules/isolation_rules/README_2025.md`
- **指令參考**: `.cursor/commands/[command].md`

---

**建立時間**: 2025-12-17  
**系統版本**: isolation_rules v2.0  
**文件狀態**: ✅ Active

