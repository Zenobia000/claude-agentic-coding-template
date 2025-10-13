# 🔧 TaskMaster 故障排除指南

## 🚨 常見問題與解決方案

### 1. 初始化問題

#### ❌ 問題：`/task-init` 命令無效或找不到
**症狀**：
```
Command not found: /task-init
```

**可能原因**：
- TaskMaster 檔案路徑不正確
- 權限不足
- 依賴模組遺失

**解決步驟**：
```bash
# 1. 檢查檔案存在
ls -la .claude/taskmaster.js

# 2. 檢查權限
chmod +x .claude/taskmaster.js

# 3. 檢查 Node.js 版本
node --version  # 需要 v14+

# 4. 測試直接執行
node .claude/taskmaster.js
```

#### ❌ 問題：專案初始化失敗
**症狀**：
```
❌ 初始化失敗: Cannot read property 'name' of undefined
```

**解決步驟**：
```bash
# 1. 確保 .claude 目錄存在
mkdir -p .claude/taskmaster-data

# 2. 檢查寫入權限
touch .claude/taskmaster-data/test.txt
rm .claude/taskmaster-data/test.txt

# 3. 重新初始化
/task-init project-name
```

### 2. WBS Todo List 問題

#### ❌ 問題：WBS 狀態不更新
**症狀**：
```
📊 WBS 狀態顯示錯誤或過期資訊
```

**診斷步驟**：
```bash
# 1. 檢查資料檔案
cat .claude/taskmaster-data/wbs-todos.json

# 2. 檢查時間戳
# lastUpdated 應該是最近時間

# 3. 手動重置（謹慎使用）
rm .claude/taskmaster-data/wbs-todos.json
/task-init project-name  # 重新初始化
```

**預防措施**：
- 定期備份 WBS 資料檔案
- 使用 `/task-status` 檢查資料一致性

### 3. Hub 協調問題

#### ❌ 問題：Hub 建議的 Subagent 不合適
**症狀**：
```
🤖 Hub 建議: test-automation-engineer
但任務明顯需要 code-quality-specialist
```

**解決方案**：
1. **即時覆蓋**：
   ```bash
   /hub-delegate code-quality-specialist --task=current
   ```

2. **調整 Hub 邏輯**：
   編輯 `taskmaster.js` 中的 `suggestAgent` 方法

3. **提供更詳細的任務描述**：
   任務描述中包含更多關鍵字

#### ❌ 問題：Hub 分析時間過長
**症狀**：
```
🎯 Hub 分析卡在分析階段超過 10 秒
```

**解決步驟**：
```bash
# 1. 檢查系統資源
top | head -20

# 2. 重啟 TaskMaster
# 按 Ctrl+C 停止，然後重新啟動

# 3. 簡化任務描述
# 避免過長或複雜的任務描述
```

### 4. Subagent 整合問題

#### ❌ 問題：Subagent 調用失敗
**症狀**：
```
❌ 委派失敗: Subagent connection timeout
```

**當前狀況**：
- Subagent 整合尚未完成
- 目前使用模擬執行

**臨時解決方案**：
```bash
# 1. 手動執行對應任務
# 2. 使用 /task-status 更新狀態
# 3. 等待 Subagent 整合完成
```

**待實現功能**：
- 查看 `SUBAGENT_INTEGRATION_GUIDE.md` 了解整合進度

### 5. 持久化資料問題

#### ❌ 問題：資料遺失或損壞
**症狀**：
```
Cannot parse JSON: Unexpected token in JSON
```

**搶救步驟**：
```bash
# 1. 檢查備份
ls -la .claude/taskmaster-data/*.bak

# 2. 手動修復 JSON
nano .claude/taskmaster-data/project.json
# 使用線上 JSON 驗證器檢查格式

# 3. 如果無法修復，重新初始化
mv .claude/taskmaster-data .claude/taskmaster-data.broken
/task-init project-name
```

**預防措施**：
```bash
# 定期備份
cp .claude/taskmaster-data/project.json .claude/taskmaster-data/project.json.bak
cp .claude/taskmaster-data/wbs-todos.json .claude/taskmaster-data/wbs-todos.json.bak
```

### 6. 效能問題

#### ❌ 問題：TaskMaster 回應緩慢
**症狀**：
```
每個命令需要超過 5 秒才有回應
```

**優化步驟**：
```bash
# 1. 清理過期資料
# 刪除超過 30 天的舊專案資料

# 2. 減少 WBS 歷史記錄
# 編輯 wbs-todos.json，移除過多歷史記錄

# 3. 檢查磁碟空間
df -h

# 4. 重啟系統（如必要）
```

## 🔍 除錯工具

### 1. 狀態檢查命令
```bash
# 完整系統狀態
/task-status --detailed

# WBS 詳細資訊
cat .claude/taskmaster-data/wbs-todos.json | jq '.'

# 專案配置檢查
cat .claude/taskmaster-data/project.json | jq '.'
```

### 2. 日誌檢查
```bash
# TaskMaster 執行日誌（如果有）
tail -f .claude/taskmaster-data/execution.log

# 系統日誌（Linux/Mac）
tail -f /var/log/system.log | grep -i taskmaster
```

### 3. 手動測試
```javascript
// 在 Node.js REPL 中測試
const TaskMaster = require('./.claude/taskmaster');
const tm = new TaskMaster();

// 測試基本功能
tm.getTaskStatus().then(console.log);
```

## 📞 獲得幫助

### 1. 診斷資訊收集
發生問題時，請收集以下資訊：

```bash
# 系統資訊
node --version
npm --version
cat /etc/os-release  # Linux
sw_vers              # macOS

# TaskMaster 狀態
ls -la .claude/
/task-status
cat .claude/taskmaster-data/wbs-todos.json
```

### 2. 報告問題格式
```markdown
## 問題描述
簡單描述遇到的問題

## 重現步驟
1. 執行 /task-init test-project
2. 執行 /task-next
3. 出現錯誤 XXX

## 預期行為
應該顯示下個建議任務

## 實際行為
顯示錯誤訊息 XXX

## 環境資訊
- OS: Ubuntu 20.04
- Node.js: v16.14.0
- TaskMaster version: latest

## 額外資訊
[貼上相關日誌或螢幕截圖]
```

### 3. 緊急恢復程序

如果 TaskMaster 完全無法使用：

```bash
# 1. 備份現有資料
cp -r .claude/taskmaster-data .claude/taskmaster-data.backup

# 2. 重置系統
rm -rf .claude/taskmaster-data

# 3. 重新下載核心檔案（如果有更新版本）
# 將新的 taskmaster.js 放到 .claude/

# 4. 重新初始化
/task-init recovery-project

# 5. 手動恢復重要任務（如需要）
```

## 💡 效能優化建議

### 1. 定期維護
```bash
# 每週執行
find .claude/taskmaster-data -name "*.log" -mtime +7 -delete
```

### 2. 資料大小控制
- WBS todos 歷史記錄保持在 100 項以內
- 專案資料檔案不超過 1MB
- 定期清理完成的專案資料

### 3. 系統資源
- 確保至少有 100MB 可用磁碟空間
- Node.js 記憶體限制設為至少 512MB

## 🚀 最佳實務

1. **定期備份重要資料**
2. **使用描述性的專案和任務名稱**
3. **保持 TaskMaster 版本更新**
4. **定期檢查系統狀態**
5. **遇到問題時先查看此指南**

**需要更多幫助？查看 `TASKMASTER_README.md` 了解完整功能說明。** 📖