#!/bin/bash

# TaskMaster Pre Tool Use Hook
# 在工具使用前檢查 TaskMaster 狀態並提供上下文

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
CLAUDE_DIR="$PROJECT_ROOT/.claude"

# 日誌函數
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$CLAUDE_DIR/hooks.log"
}

# 獲取工具名稱和參數
TOOL_NAME="$1"
TOOL_ARGS="$2"

log "🪝 TaskMaster Pre Tool Use Hook 觸發: $TOOL_NAME"

# 如果 TaskMaster 已初始化，提供當前狀態上下文
if [ -f "$CLAUDE_DIR/taskmaster-data/project.json" ]; then
    log "📊 TaskMaster 已初始化，提供上下文資訊"

    # 讀取當前專案狀態
    if command -v jq >/dev/null 2>&1 && [ -f "$CLAUDE_DIR/taskmaster-data/project.json" ]; then
        PROJECT_NAME=$(jq -r '.name // "未知專案"' "$CLAUDE_DIR/taskmaster-data/project.json")

        echo "📋 TaskMaster 當前狀態:"
        echo "   專案名稱: $PROJECT_NAME"

        # 檢查是否有待審查的文檔
        if [ -d "$PROJECT_ROOT/docs" ]; then
            PENDING_DOCS=$(find "$PROJECT_ROOT/docs" -name "*.md" -newer "$CLAUDE_DIR/taskmaster-data/project.json" 2>/dev/null | wc -l)
            if [ "$PENDING_DOCS" -gt 0 ]; then
                echo "   🔍 待審查文檔: $PENDING_DOCS 個"
            fi
        fi
    fi
fi

# 特定工具的預處理
case "$TOOL_NAME" in
    "Write")
        log "📝 Write 工具即將使用"
        # 檢查是否為文檔目錄寫入
        if [[ "$TOOL_ARGS" == *"docs/"* ]]; then
            log "📄 即將寫入專案文檔"
            echo "💡 提示: 文檔寫入後將觸發 TaskMaster 審查流程"
        fi
        ;;

    "Edit")
        log "✏️ Edit 工具即將使用"
        # 檢查是否編輯關鍵檔案
        if [[ "$TOOL_ARGS" == *".claude/"* ]]; then
            log "⚙️ 即將編輯 TaskMaster 核心檔案"
        fi
        ;;

    "Read")
        log "📖 Read 工具即將使用"
        # 如果讀取 VibeCoding 範本，提供上下文
        if [[ "$TOOL_ARGS" == *"VibeCoding_Workflow_Templates"* ]]; then
            log "🎨 即將讀取 VibeCoding 範本"
        fi
        ;;

    "Task")
        log "🤖 Task 工具即將使用 (智能體委派)"
        # 提供智能體協調上下文
        if [ -f "$CLAUDE_DIR/taskmaster-data/project.json" ]; then
            echo "🤖 TaskMaster Hub 協調模式啟用"
            echo "   所有智能體委派將記錄在 WBS Todo List 中"
        fi
        ;;
esac

log "✅ Pre Tool Use Hook 處理完成"
exit 0
