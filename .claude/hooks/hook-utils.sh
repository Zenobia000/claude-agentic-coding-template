#!/bin/bash

# TaskMaster Hook 工具函數庫
# 提供 hooks 共用的工具函數

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# 日誌函數
log_info() {
    echo -e "${CYAN}[INFO]${NC} [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_debug() {
    if [ "$TASKMASTER_DEBUG" = "true" ]; then
        echo -e "${PURPLE}[DEBUG]${NC} [$(date '+%Y-%m-%d %H:%M:%S')] $1"
    fi
}

# 檢查必要檔案是否存在
check_required_files() {
    local project_root="$1"
    local claude_dir="$project_root/.claude"

    log_debug "檢查必要檔案: $claude_dir"

    # 檢查 TaskMaster 核心檔案
    if [ ! -f "$claude_dir/taskmaster.js" ]; then
        log_error "TaskMaster 核心檔案不存在: $claude_dir/taskmaster.js"
        return 1
    fi

    # 檢查 hooks 配置
    if [ ! -f "$claude_dir/hooks-config.json" ]; then
        log_warning "Hooks 配置檔案不存在: $claude_dir/hooks-config.json"
    fi

    # 檢查 VibeCoding 範本目錄
    if [ ! -d "$project_root/VibeCoding_Workflow_Templates" ]; then
        log_warning "VibeCoding 範本目錄不存在: $project_root/VibeCoding_Workflow_Templates"
    fi

    return 0
}

# 檢查 TaskMaster 初始化狀態
check_taskmaster_status() {
    local project_root="$1"
    local claude_dir="$project_root/.claude"
    local data_dir="$claude_dir/taskmaster-data"

    if [ -f "$data_dir/project.json" ]; then
        log_debug "TaskMaster 已初始化"
        return 0
    else
        log_debug "TaskMaster 尚未初始化"
        return 1
    fi
}

# 獲取專案資訊
get_project_info() {
    local project_root="$1"
    local claude_dir="$project_root/.claude"
    local project_file="$claude_dir/taskmaster-data/project.json"

    if [ -f "$project_file" ] && command -v jq >/dev/null 2>&1; then
        local project_name=$(jq -r '.name // "未知專案"' "$project_file")
        local project_phase=$(jq -r '.currentPhase // "未知階段"' "$project_file")

        echo "專案名稱: $project_name"
        echo "當前階段: $project_phase"
    else
        echo "專案資訊: 無法讀取"
    fi
}

# 顯示 TaskMaster 狀態摘要（彩色版本）
show_taskmaster_summary() {
    local project_root="$1"
    local claude_dir="$project_root/.claude"

    if check_taskmaster_status "$project_root"; then
        echo ""
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${BLUE}  📊 TaskMaster 狀態摘要${NC}"
        echo ""
        get_project_info "$project_root" | while IFS= read -r line; do
            echo -e "  ${WHITE}$line${NC}"
        done
        echo ""
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
    fi
}

# 檢查是否為文檔檔案
is_document_file() {
    local file_path="$1"

    case "$file_path" in
        *.md|*.markdown|*.rst|*.txt|*.doc|*.docx)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# 檢查是否為專案文檔
is_project_document() {
    local file_path="$1"

    if is_document_file "$file_path" && [[ "$file_path" == *"docs/"* ]]; then
        return 0
    else
        return 1
    fi
}

# 檢查是否為 VibeCoding 範本
is_vibecoding_template() {
    local file_path="$1"

    if [[ "$file_path" == *"VibeCoding_Workflow_Templates"* ]] && [[ "$file_path" == *.md ]]; then
        return 0
    else
        return 1
    fi
}

# 檢查是否為 TaskMaster 核心檔案
is_taskmaster_core() {
    local file_path="$1"

    if [[ "$file_path" == *".claude/taskmaster"* ]] || [[ "$file_path" == *".claude/hooks"* ]]; then
        return 0
    else
        return 1
    fi
}

# 觸發 TaskMaster Node.js 處理器
trigger_taskmaster() {
    local project_root="$1"
    local hook_type="$2"
    shift 2
    local additional_args="$@"

    local claude_dir="$project_root/.claude"
    local taskmaster_js="$claude_dir/taskmaster.js"

    if [ -f "$taskmaster_js" ]; then
        log_debug "觸發 TaskMaster 處理器: $hook_type"
        cd "$project_root"
        node "$taskmaster_js" --hook-trigger="$hook_type" $additional_args
        return $?
    else
        log_error "TaskMaster 核心檔案不存在: $taskmaster_js"
        return 1
    fi
}

# 顯示駕駛員通知（彩色版本）
show_driver_notification() {
    local title="$1"
    local message="$2"
    local actions="$3"

    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}  $title${NC}"
    echo ""

    # 分行顯示訊息
    echo "$message" | fold -s -w 56 | while IFS= read -r line; do
        echo -e "  ${WHITE}$line${NC}"
    done

    if [ -n "$actions" ]; then
        echo ""
        echo "$actions" | while IFS= read -r line; do
            echo -e "  ${YELLOW}$line${NC}"
        done
    fi

    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# 驗證環境
validate_environment() {
    local project_root="$1"

    log_debug "驗證 TaskMaster 環境"

    # 檢查 Node.js
    if ! command -v node >/dev/null 2>&1; then
        log_error "Node.js 未安裝，TaskMaster 需要 Node.js 環境"
        return 1
    fi

    # 檢查基本目錄結構
    if [ ! -d "$project_root/.claude" ]; then
        log_error "Claude 目錄不存在: $project_root/.claude"
        return 1
    fi

    # 檢查必要檔案
    if ! check_required_files "$project_root"; then
        return 1
    fi

    log_success "TaskMaster 環境驗證通過"
    return 0
}
