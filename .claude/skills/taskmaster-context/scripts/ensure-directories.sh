#!/bin/bash
# =============================================================================
# TaskMaster Context Directory Initializer
# 確保所有 context 子目錄存在
# =============================================================================
set -euo pipefail

# 顏色定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 基礎路徑
CONTEXT_DIR=".claude/context"

# 所有必要的子目錄
SUBDIRS=(
    "quality"      # code-quality-specialist
    "testing"      # test-automation-engineer
    "security"     # security-infrastructure-auditor
    "docs"         # documentation-specialist
    "deployment"   # deployment-expert
    "e2e"          # e2e-validation-specialist
    "workflow"     # workflow-template-manager
)

echo -e "${BLUE}🎯 TaskMaster Context Directory Initializer${NC}"
echo ""

# 確保基礎目錄存在
mkdir -p "$CONTEXT_DIR"
echo -e "${GREEN}✅ 基礎目錄: ${CONTEXT_DIR}${NC}"

# 建立所有子目錄
for subdir in "${SUBDIRS[@]}"; do
    target="${CONTEXT_DIR}/${subdir}"
    mkdir -p "$target"

    # 如果目錄內沒有 README，建立一個
    readme="${target}/README.md"
    if [[ ! -f "$readme" ]]; then
        case "$subdir" in
            "quality")
                agent="🟡 code-quality-specialist"
                desc="程式碼品質分析報告"
                ;;
            "testing")
                agent="🟢 test-automation-engineer"
                desc="測試覆蓋率和自動化報告"
                ;;
            "security")
                agent="🔴 security-infrastructure-auditor"
                desc="安全稽核和漏洞報告"
                ;;
            "docs")
                agent="📝 documentation-specialist"
                desc="技術文檔和 API 文件"
                ;;
            "deployment")
                agent="🚀 deployment-expert"
                desc="部署策略和運維報告"
                ;;
            "e2e")
                agent="🎨 e2e-validation-specialist"
                desc="端到端驗證和 UI 測試報告"
                ;;
            "workflow")
                agent="🎯 workflow-template-manager"
                desc="工作流範本合規報告"
                ;;
            *)
                agent="Unknown"
                desc="其他報告"
                ;;
        esac

        cat > "$readme" << EOF
# ${agent} Reports

此目錄存放 ${desc}。

## 報告格式

每份報告包含：
- **Generated**: 生成時間
- **Agent**: Agent 類型
- **Target**: 分析目標
- **Summary**: 摘要
- **Findings**: 發現
- **Recommendations**: 建議

## 報告列表

（報告將自動列出於此）
EOF
        echo -e "${YELLOW}📄 已建立: ${readme}${NC}"
    fi

    echo -e "${GREEN}✅ 子目錄: ${target}${NC}"
done

# 建立主索引（如果不存在）
INDEX_FILE="${CONTEXT_DIR}/README.md"
if [[ ! -f "$INDEX_FILE" ]]; then
    cat > "$INDEX_FILE" << 'EOF'
# 📁 TaskMaster Context Directory

此目錄存放所有 Agent 生成的報告和上下文資訊，支援跨 Agent 資訊共享。

## 📂 目錄結構

| 目錄 | Agent | 說明 |
|------|-------|------|
| `quality/` | 🟡 code-quality-specialist | 程式碼品質分析 |
| `testing/` | 🟢 test-automation-engineer | 測試覆蓋率報告 |
| `security/` | 🔴 security-infrastructure-auditor | 安全稽核報告 |
| `docs/` | 📝 documentation-specialist | 技術文檔 |
| `deployment/` | 🚀 deployment-expert | 部署運維報告 |
| `e2e/` | 🎨 e2e-validation-specialist | 端到端測試報告 |
| `workflow/` | 🎯 workflow-template-manager | 工作流合規報告 |

## 📊 最近報告

| 時間 | Agent | 報告 |
|------|-------|------|
EOF
    echo -e "${YELLOW}📄 已建立索引: ${INDEX_FILE}${NC}"
fi

echo ""
echo -e "${GREEN}✅ 所有目錄已初始化完成！${NC}"
echo -e "${BLUE}📁 Context 目錄: ${CONTEXT_DIR}${NC}"
