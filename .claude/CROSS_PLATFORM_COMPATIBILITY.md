# TaskMaster 跨平台兼容性指南

## ✅ 支援平台

TaskMaster 完全支援以下平台：

- ✅ **Windows (Git Bash)** - Windows 原生環境使用 Git Bash
- ✅ **Windows WSL** - Windows Subsystem for Linux
- ✅ **macOS** - Apple macOS 系統
- ✅ **Linux** - 所有主流 Linux 發行版

## 🔧 跨平台設計原則

### 1. 平台檢測機制

所有 hooks 腳本都包含自動平台檢測：

```bash
detect_platform() {
    case "$(uname -s)" in
        MINGW*|MSYS*|CYGWIN*)
            echo "windows"      # Git Bash on Windows
            ;;
        Linux)
            if grep -qi microsoft /proc/version 2>/dev/null; then
                echo "wsl"      # Windows WSL
            else
                echo "linux"    # Native Linux
            fi
            ;;
        Darwin)
            echo "macos"        # macOS
            ;;
        *)
            echo "unknown"
            ;;
    esac
}
```

### 2. 相對路徑使用

所有路徑均使用相對路徑，確保在不同電腦和環境下都能正常運行：

```bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." 2>/dev/null && pwd)"
CLAUDE_DIR="$PROJECT_ROOT/.claude"
```

### 3. 錯誤容錯處理

- **不使用 `set -e`** - 避免 Windows 環境下非零退出碼中斷執行
- **使用 `2>/dev/null`** - 靜默錯誤輸出，優雅降級
- **總是返回 `exit 0`** - 避免中斷 Claude Code 啟動流程

### 4. 命令前綴

在 Windows 原生環境下，hooks 命令需要 `bash` 前綴：

**settings.local.json 配置：**
```json
{
  "hooks": {
    "SessionStart": [{
      "command": "bash .claude/hooks/session-start.sh"
    }]
  }
}
```

**為什麼需要 `bash` 前綴？**
- Windows 會將 `.claude` 誤認為命令
- 明確使用 `bash` 解釋器避免路徑解析問題

## 📋 平台特定注意事項

### Windows (Git Bash)

**環境要求：**
- ✅ Git for Windows (包含 Git Bash)
- ✅ Node.js (用於 taskmaster.js)

**重要說明：Bash 環境選擇**
當您從 Windows PowerShell 或 CMD 啟動 Claude Code 時：
- Claude Code 會自動尋找系統中的 bash
- 如果同時安裝了 WSL 和 Git Bash，可能會優先使用 WSL
- **平台檢測顯示 "wsl" 是正常的**，表示 Claude Code 使用了 WSL 的 bash
- **這不影響功能**，因為相對路徑在兩種環境下都能正常工作

**檢查實際使用的 Bash：**
```bash
# 從 Claude Code 內部運行
which bash
# 如果輸出: /usr/bin/bash 或 /bin/bash -> 使用 WSL
# 如果輸出: /mingw64/bin/bash -> 使用 Git Bash

# 查看詳細的平台檢測信息
# 重啟 Claude Code 後查看日誌：
cat .claude/hooks.log | tail -1
```

**如果要強制使用 Git Bash：**
1. 確保 Git Bash 路徑在 PATH 環境變量中優先
2. 或在 settings.local.json 中使用絕對路徑：
```json
{
  "hooks": {
    "SessionStart": [{
      "command": "C:/Program Files/Git/bin/bash.exe .claude/hooks/session-start.sh"
    }]
  }
}
```

**常見問題：**
1. **路徑錯誤** - 確保使用 `bash` 前綴
2. **行尾符號** - 確保 `.sh` 文件使用 LF 而非 CRLF
3. **權限問題** - Git Bash 不需要 chmod，自動可執行
4. **平台顯示 wsl** - 正常，Claude Code 可能使用 WSL bash

**解決方案：**
```bash
# 檢查 Git Bash 版本
bash --version

# 檢查 Node.js
node --version

# 如果出現路徑錯誤，檢查 settings.local.json
cat .claude/settings.local.json | grep "command"

# 查看完整的平台檢測信息
tail -1 .claude/hooks.log
```

### Windows WSL

**環境要求：**
- ✅ WSL 1 或 WSL 2
- ✅ Ubuntu/Debian 或其他 Linux 發行版
- ✅ Node.js

**優勢：**
- 完整的 Linux 環境
- 無需特殊路徑處理
- 與 Linux 行為完全一致

**常見問題：**
1. **跨文件系統性能** - 建議專案放在 WSL 文件系統內 (`~/`)
2. **權限問題** - 可能需要 `chmod +x .claude/hooks/*.sh`

**解決方案：**
```bash
# 確保腳本可執行
chmod +x .claude/hooks/*.sh

# 檢查平台檢測
bash .claude/hooks/session-start.sh | head -1
# 應該顯示: Platform: wsl
```

### macOS

**環境要求：**
- ✅ macOS 10.14 或更高
- ✅ Bash 或 Zsh
- ✅ Node.js

**優勢：**
- 原生 Unix 環境
- 完美的 Bash 支援

**常見問題：**
1. **權限問題** - 首次執行需要授予權限
2. **Homebrew 路徑** - 確保 Node.js 在 PATH 中

**解決方案：**
```bash
# 檢查 Bash 版本
bash --version

# 授予執行權限
chmod +x .claude/hooks/*.sh

# 檢查 Node.js
which node
node --version
```

### Linux

**環境要求：**
- ✅ 任何主流 Linux 發行版
- ✅ Bash 4.0 或更高
- ✅ Node.js

**優勢：**
- 最佳性能
- 完整的 Unix 工具鏈

**常見問題：**
1. **權限問題** - 需要 `chmod +x`
2. **缺少依賴** - 需要安裝 Node.js

**解決方案：**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora/RHEL
sudo dnf install nodejs npm

# Arch Linux
sudo pacman -S nodejs npm

# 授予權限
chmod +x .claude/hooks/*.sh
```

## 🧪 測試跨平台兼容性

### 測試腳本

```bash
# 1. 測試平台檢測
bash .claude/hooks/session-start.sh | head -1

# 預期輸出（根據您的平台）：
# [時間戳] 🪝 TaskMaster Session Start Hook 觸發 (Platform: windows)
# [時間戳] 🪝 TaskMaster Session Start Hook 觸發 (Platform: wsl)
# [時間戳] 🪝 TaskMaster Session Start Hook 觸發 (Platform: macos)
# [時間戳] 🪝 TaskMaster Session Start Hook 觸發 (Platform: linux)

# 2. 測試路徑解析
cd /tmp
git clone <your-repo>
cd <your-repo>
bash .claude/hooks/session-start.sh

# 3. 測試 Claude Code 整合
# 重啟 Claude Code，檢查是否有錯誤訊息
```

### 驗證清單

- [ ] ✅ 平台正確檢測（查看日誌）
- [ ] ✅ 無錯誤訊息
- [ ] ✅ UI 正常顯示
- [ ] ✅ taskmaster.js 正常執行
- [ ] ✅ 日誌文件正常寫入

## 🔍 常見錯誤排查

### 錯誤 1：`.claude` 不是命令

**症狀：**
```
'.claude' 不是內部或外部命令、可執行的程式或批次檔
```

**平台：** Windows (Git Bash)

**解決方案：**
修改 `.claude/settings.local.json`，在所有 hook 命令前加 `bash`：
```json
"command": "bash .claude/hooks/session-start.sh"
```

### 錯誤 2：權限被拒絕

**症狀：**
```
Permission denied: .claude/hooks/session-start.sh
```

**平台：** WSL, macOS, Linux

**解決方案：**
```bash
chmod +x .claude/hooks/*.sh
```

### 錯誤 3：Node.js 找不到

**症狀：**
```
node: command not found
```

**平台：** 所有平台

**解決方案：**
```bash
# 檢查 Node.js 安裝
which node

# 如果未安裝，根據平台安裝：
# Windows: https://nodejs.org/
# WSL/Linux: sudo apt install nodejs npm
# macOS: brew install node
```

### 錯誤 4：行尾符號錯誤

**症狀：**
```
: command not found
```

**平台：** Windows (Git Bash) 使用 CRLF 行尾

**解決方案：**
```bash
# 轉換為 LF
dos2unix .claude/hooks/*.sh

# 或使用 Git 設定
git config core.autocrlf input
git rm --cached -r .
git reset --hard
```

## 📦 分發和部署

### Git 配置

在 `.gitattributes` 中確保正確的行尾處理：

```gitattributes
*.sh text eol=lf
*.js text eol=lf
*.json text eol=lf
*.md text eol=lf
```

### 部署清單

1. ✅ 確保所有 `.sh` 文件使用 LF 行尾
2. ✅ 在 Windows 環境測試 Git Bash 兼容性
3. ✅ 在 WSL 環境測試權限問題
4. ✅ 在 macOS 環境測試執行
5. ✅ 在 Linux 環境測試完整功能

## 🎯 最佳實踐

1. **始終使用相對路徑** - 確保跨機器兼容性
2. **平台檢測優先** - 根據平台調整行為
3. **錯誤優雅處理** - 使用 `|| { }` 捕獲錯誤
4. **日誌平台信息** - 便於問題排查
5. **測試所有平台** - 在發布前驗證

## 📚 參考資源

- [Bash 跨平台腳本最佳實踐](https://www.gnu.org/software/bash/manual/)
- [Windows WSL 文檔](https://docs.microsoft.com/en-us/windows/wsl/)
- [Git Bash 使用指南](https://git-scm.com/docs/git-bash)
- [Node.js 跨平台開發](https://nodejs.org/en/docs/)

---

**維護者：** TaskMaster 開發團隊
**最後更新：** 2025-10-13
**版本：** 1.0.0
