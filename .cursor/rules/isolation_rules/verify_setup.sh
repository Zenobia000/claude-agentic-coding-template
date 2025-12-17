#!/bin/bash
# Isolation Rules System Verification Script (2025)
# 用於檢查 Cursor Custom Slash Commands 是否正確設置

echo "🔍 Isolation Rules System Verification"
echo "======================================"
echo ""

# 檢查計數器
PASS=0
FAIL=0

# 顏色定義
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 檢查函數
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        ((PASS++))
        return 0
    else
        echo -e "${RED}❌${NC} $2 - 檔案不存在: $1"
        ((FAIL++))
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        ((PASS++))
        return 0
    else
        echo -e "${RED}❌${NC} $2 - 目錄不存在: $1"
        ((FAIL++))
        return 1
    fi
}

echo "1️⃣ 檢查 Commands 目錄結構"
echo "------------------------"
check_dir ".cursor/commands" "Commands 目錄"
check_file ".cursor/commands/van.md" "/van 指令"
check_file ".cursor/commands/plan.md" "/plan 指令"
check_file ".cursor/commands/creative.md" "/creative 指令"
check_file ".cursor/commands/implement.md" "/implement 指令"
check_file ".cursor/commands/reflect.md" "/reflect 指令"
check_file ".cursor/commands/archive.md" "/archive 指令"
echo ""

echo "2️⃣ 檢查根級規則檔案"
echo "--------------------"
check_file ".cursorrules" "專案根級規則檔案"
echo ""

echo "3️⃣ 檢查 Rules 目錄結構"
echo "----------------------"
check_dir ".cursor/rules/isolation_rules" "Rules 目錄"
check_file ".cursor/rules/isolation_rules/main.mdc" "主規則檔案"
check_file ".cursor/rules/isolation_rules/QUICK_START_2025.md" "快速開始指南"
check_dir ".cursor/rules/isolation_rules/Core" "Core 目錄"
check_file ".cursor/rules/isolation_rules/Core/command-execution.mdc" "指令執行規範"
echo ""

echo "4️⃣ 檢查指令檔案格式"
echo "-------------------"

# 檢查所有指令檔案是否包含 YAML frontmatter
for cmd_file in .cursor/commands/*.md; do
    if [ -f "$cmd_file" ]; then
        cmd_name=$(basename "$cmd_file" .md)
        
        # 檢查是否有 YAML frontmatter (以 --- 開頭)
        if head -n 1 "$cmd_file" | grep -q "^---$"; then
            # 檢查是否有 description 欄位
            if head -n 10 "$cmd_file" | grep -q "^description:"; then
                echo -e "${GREEN}✅${NC} /$cmd_name - 格式正確"
                ((PASS++))
            else
                echo -e "${RED}❌${NC} /$cmd_name - 缺少 description 欄位"
                ((FAIL++))
            fi
        else
            echo -e "${RED}❌${NC} /$cmd_name - 缺少 YAML frontmatter"
            ((FAIL++))
        fi
    fi
done
echo ""

echo "5️⃣ 檢查系統版本資訊"
echo "-------------------"

# 檢查 main.mdc 是否包含 2025 更新資訊
if grep -q "Updated 2025" .cursor/rules/isolation_rules/main.mdc 2>/dev/null; then
    echo -e "${GREEN}✅${NC} main.mdc 已更新到 2025 版本"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️${NC}  main.mdc 可能需要更新"
    ((FAIL++))
fi

# 檢查是否包含 Custom Slash Commands 說明
if grep -q "Custom Slash Commands" .cursor/rules/isolation_rules/main.mdc 2>/dev/null; then
    echo -e "${GREEN}✅${NC} 包含 Custom Slash Commands 說明"
    ((PASS++))
else
    echo -e "${RED}❌${NC} 缺少 Custom Slash Commands 說明"
    ((FAIL++))
fi
echo ""

echo "6️⃣ 系統相容性檢查"
echo "-------------------"

# 檢查作業系統
OS_TYPE=$(uname -s)
case "$OS_TYPE" in
    Linux*)
        echo -e "${GREEN}✅${NC} 作業系統: Linux (完全支援)"
        ((PASS++))
        ;;
    Darwin*)
        echo -e "${GREEN}✅${NC} 作業系統: macOS (完全支援)"
        ((PASS++))
        ;;
    MINGW*|MSYS*|CYGWIN*)
        echo -e "${YELLOW}⚠️${NC}  作業系統: Windows (請注意指令語法差異)"
        ((PASS++))
        ;;
    *)
        echo -e "${YELLOW}⚠️${NC}  作業系統: $OS_TYPE (未測試)"
        ;;
esac

# 檢查是否在專案根目錄
if [ -f "package.json" ] || [ -f "pyproject.toml" ] || [ -f "Cargo.toml" ]; then
    echo -e "${GREEN}✅${NC} 位於專案根目錄"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️${NC}  可能不在專案根目錄"
fi
echo ""

echo "======================================"
echo "📊 檢查結果總結"
echo "======================================"
echo -e "通過: ${GREEN}$PASS${NC}"
echo -e "失敗: ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 所有檢查通過！系統已正確設置。${NC}"
    echo ""
    echo "開始使用："
    echo "  1. 開啟 Cursor AI 聊天"
    echo "  2. 輸入 /van 開始初始化"
    echo ""
    echo "詳細文件："
    echo "  - Quick Start: .cursor/rules/isolation_rules/QUICK_START_2025.md"
    echo "  - README: .cursor/rules/isolation_rules/README_2025.md"
    echo "  - Memory Bank: memory-bank/README.md"
    exit 0
else
    echo -e "${RED}⚠️  發現 $FAIL 個問題，請檢查上述錯誤訊息。${NC}"
    echo ""
    echo "常見解決方案："
    echo "  1. 確認您在專案根目錄執行此腳本"
    echo "  2. 檢查檔案權限"
    echo "  3. 參考 MIGRATION_GUIDE_2025.md 進行故障排除"
    exit 1
fi

