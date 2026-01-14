#!/bin/bash
# =============================================================================
# TaskMaster Context Writer
# 將 Agent 報告寫入 .claude/context/ 目錄
# =============================================================================
set -euo pipefail

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 基礎路徑
CONTEXT_DIR=".claude/context"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Agent 到目錄的映射
declare -A AGENT_DIRS=(
    ["code-quality-specialist"]="quality"
    ["test-automation-engineer"]="testing"
    ["security-infrastructure-auditor"]="security"
    ["documentation-specialist"]="docs"
    ["deployment-expert"]="deployment"
    ["e2e-validation-specialist"]="e2e"
    ["workflow-template-manager"]="workflow"
)

# 使用方式說明
usage() {
    echo -e "${BLUE}🎯 TaskMaster Context Writer${NC}"
    echo ""
    echo "Usage: $0 <agent-type> <report-content-file>"
    echo ""
    echo "Arguments:"
    echo "  agent-type          Agent 類型 (code-quality-specialist, test-automation-engineer, etc.)"
    echo "  report-content-file 報告內容檔案路徑"
    echo ""
    echo "Available agent types:"
    for agent in "${!AGENT_DIRS[@]}"; do
        echo "  - $agent → ${CONTEXT_DIR}/${AGENT_DIRS[$agent]}/"
    done
    echo ""
    echo "Example:"
    echo "  $0 code-quality-specialist /tmp/report.md"
    exit 1
}

# 取得目錄名稱
get_context_dir() {
    local agent_type="$1"
    echo "${AGENT_DIRS[$agent_type]:-unknown}"
}

# 生成時間戳記
get_timestamp() {
    date "+%Y%m%d-%H%M%S"
}

# 主要寫入函數
write_report() {
    local agent_type="$1"
    local content_file="$2"

    # 驗證 agent 類型
    local context_subdir
    context_subdir=$(get_context_dir "$agent_type")

    if [[ "$context_subdir" == "unknown" ]]; then
        echo -e "${RED}❌ 未知的 Agent 類型: $agent_type${NC}"
        echo "請使用以下類型之一:"
        for agent in "${!AGENT_DIRS[@]}"; do
            echo "  - $agent"
        done
        exit 1
    fi

    # 確保目錄存在
    local target_dir="${CONTEXT_DIR}/${context_subdir}"
    mkdir -p "$target_dir"

    # 生成檔案名稱
    local timestamp
    timestamp=$(get_timestamp)
    local filename="${agent_type}-report-${timestamp}.md"
    local target_path="${target_dir}/${filename}"

    # 檢查內容檔案
    if [[ ! -f "$content_file" ]]; then
        echo -e "${RED}❌ 找不到報告內容檔案: $content_file${NC}"
        exit 1
    fi

    # 寫入報告
    cp "$content_file" "$target_path"

    echo -e "${GREEN}✅ 報告已寫入: ${target_path}${NC}"
    echo -e "${BLUE}📁 目錄: ${target_dir}${NC}"
    echo -e "${YELLOW}📄 檔案: ${filename}${NC}"

    # 更新索引
    update_index "$agent_type" "$filename" "$target_dir"
}

# 更新 context 索引
update_index() {
    local agent_type="$1"
    local filename="$2"
    local target_dir="$3"

    local index_file="${CONTEXT_DIR}/README.md"
    local timestamp
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")

    # 如果索引不存在，創建基礎結構
    if [[ ! -f "$index_file" ]]; then
        cat > "$index_file" << 'EOF'
# 📁 TaskMaster Context Directory

此目錄存放所有 Agent 生成的報告和上下文資訊。

## 📊 最近報告

| 時間 | Agent | 報告 |
|------|-------|------|
EOF
    fi

    # 追加最新報告記錄
    local relative_path="${target_dir#${CONTEXT_DIR}/}/${filename}"
    echo "| ${timestamp} | ${agent_type} | [${filename}](${relative_path}) |" >> "$index_file"

    echo -e "${GREEN}📋 索引已更新: ${index_file}${NC}"
}

# 主程式
main() {
    if [[ $# -lt 2 ]]; then
        usage
    fi

    local agent_type="$1"
    local content_file="$2"

    echo -e "${BLUE}🎯 TaskMaster Context Writer${NC}"
    echo -e "${YELLOW}📝 寫入 ${agent_type} 報告...${NC}"
    echo ""

    write_report "$agent_type" "$content_file"

    echo ""
    echo -e "${GREEN}✅ 完成！${NC}"
}

# 執行
main "$@"
