#!/bin/bash

# TaskMaster Post Write Hook
# 當 Claude Code 寫入檔案後觸發，特別關注文檔生成

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
CLAUDE_DIR="$PROJECT_ROOT/.claude"

# 日誌函數
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$CLAUDE_DIR/hooks.log"
}

# 獲取寫入的檔案路徑
FILE_PATH="$1"

log "🪝 TaskMaster Post Write Hook 觸發: $FILE_PATH"

# 檢查是否為文檔檔案
if [[ "$FILE_PATH" == *.md ]]; then
    log "📄 偵測到 Markdown 文檔寫入: $FILE_PATH"

    # 檢查是否為專案文檔目錄
    if [[ "$FILE_PATH" == *"docs/"* ]]; then
        log "📋 專案文檔更新: $FILE_PATH"

        # 如果 TaskMaster 已初始化，通知文檔生成完成
        if [ -f "$CLAUDE_DIR/taskmaster-data/project.json" ]; then
            log "🔔 通知 TaskMaster 文檔生成完成"

            # 觸發文檔生成完成處理
            if [ -f "$CLAUDE_DIR/taskmaster.js" ]; then
                cd "$PROJECT_ROOT"
                node "$CLAUDE_DIR/taskmaster.js" --hook-trigger=document-generated --file="$FILE_PATH"
            fi

            # 顯示駕駛員審查提示
            cat << EOF

┌──────────────────────────────────────────────────────────┐
│  📄 文檔生成完成通知                                      │
│                                                          │
│  檔案: $(basename "$FILE_PATH")                          │
│  路徑: $FILE_PATH                           │
│                                                          │
│  🔍 駕駛員審查檢查點                                      │
│  請檢查生成的文檔內容，確認品質後：                      │
│                                                          │
│  ✅ 批准: /task-review approve                           │
│  🔄 修改: /task-review revise                            │
│  ⏸️ 暫停: /task-review pause                             │
│                                                          │
└──────────────────────────────────────────────────────────┘

EOF
        fi
    fi

    # 檢查是否為 VibeCoding 範本更新
    if [[ "$FILE_PATH" == *"VibeCoding_Workflow_Templates"* ]]; then
        log "🎨 VibeCoding 範本更新: $FILE_PATH"

        # 如果 TaskMaster 已初始化，可能需要重新評估任務
        if [ -f "$CLAUDE_DIR/taskmaster-data/project.json" ]; then
            log "🔄 範本更新，可能需要重新評估任務"
        fi
    fi
fi

# 檢查是否為 TaskMaster 核心檔案更新
if [[ "$FILE_PATH" == *".claude/taskmaster"* ]]; then
    log "🔧 TaskMaster 核心檔案更新: $FILE_PATH"

    # 可以在這裡加入核心檔案更新後的處理邏輯
    # 例如：重新載入配置、驗證系統狀態等
fi

# 檢查是否為 hooks 配置更新
if [[ "$FILE_PATH" == *"hooks-config.json"* ]] || [[ "$FILE_PATH" == *"settings.local.json"* ]]; then
    log "⚙️ Hooks 配置檔案更新: $FILE_PATH"

    # 可以在這裡加入配置更新後的處理邏輯
fi

log "✅ Post Write Hook 處理完成"
exit 0
