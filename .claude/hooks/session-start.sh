#!/bin/bash

# TaskMaster Session Start Hook
# 當 Claude Code 會話開始時自動執行

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
CLAUDE_DIR="$PROJECT_ROOT/.claude"

# 日誌函數
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$CLAUDE_DIR/hooks.log"
}

log "🪝 TaskMaster Session Start Hook 觸發"

# 檢查是否存在 CLAUDE_TEMPLATE.md
if [ -f "$PROJECT_ROOT/CLAUDE_TEMPLATE.md" ]; then
    log "📄 偵測到 CLAUDE_TEMPLATE.md"

    # 檢查是否已經初始化過
    if [ ! -f "$CLAUDE_DIR/taskmaster-data/project.json" ]; then
        log "🚀 準備自動觸發 TaskMaster 初始化"

        # 顯示提示訊息
        cat << 'EOF'

┌──────────────────────────────────────────────────────────┐
│  🤖 TaskMaster 自動初始化觸發                            │
│                                                          │
│  📄 偵測到 CLAUDE_TEMPLATE.md                           │
│  🎯 準備啟動文檔導向任務流程                            │
│                                                          │
│  💡 請使用 /task-init [專案名稱] 開始初始化              │
│                                                          │
│  📋 特色：                                              │
│  • Phase 1-2: 生成專案文檔供駕駛員審查                  │
│  • Phase 2.5: 審查閘道確保品質                          │
│  • Phase 3+: 通過審查後開始開發                         │
│                                                          │
└──────────────────────────────────────────────────────────┘

EOF

        # 觸發 TaskMaster Node.js 處理器
        if [ -f "$CLAUDE_DIR/taskmaster.js" ]; then
            log "🔗 調用 TaskMaster Node.js 處理器"
            cd "$PROJECT_ROOT"
            node "$CLAUDE_DIR/taskmaster.js" --hook-trigger=session-start
        else
            log "⚠️ TaskMaster 核心文件不存在: $CLAUDE_DIR/taskmaster.js"
        fi

        exit 0
    else
        log "ℹ️ TaskMaster 已初始化，跳過自動觸發"
        exit 0
    fi
else
    log "ℹ️ 未偵測到 CLAUDE_TEMPLATE.md，TaskMaster 待命中"
    exit 0
fi