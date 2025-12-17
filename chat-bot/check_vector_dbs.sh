#!/bin/bash

# 向量庫狀態監控腳本
# 用於評估是否需要整合兩個向量庫

echo "=========================================="
echo "  向量庫使用情況分析"
echo "=========================================="

# 檢查 Qdrant
echo ""
echo "【1】Qdrant 狀態"
echo "------------------------------------------"
if curl -s http://localhost:6333/collections > /dev/null 2>&1; then
    echo "✅ Qdrant 運行中"
    
    # 獲取 collections 信息
    collections=$(curl -s http://localhost:6333/collections | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    for col in data.get('result', {}).get('collections', []):
        print(f\"  • {col['name']}\")
except:
    print('  無法解析')
" 2>/dev/null || echo "  無法獲取")
    
    echo "Collections:"
    echo "$collections"
    
    # 存儲大小
    qdrant_size=$(du -sh ./qdrant_storage 2>/dev/null | cut -f1 || echo "0B")
    echo "存儲使用: $qdrant_size"
else
    echo "❌ Qdrant 未運行"
fi

# 檢查 Open WebUI ChromaDB
echo ""
echo "【2】Open WebUI ChromaDB 狀態"
echo "------------------------------------------"
if [ -d "./open-webui/vector_db" ]; then
    echo "✅ ChromaDB 目錄存在"
    
    # 存儲大小
    chroma_size=$(du -sh ./open-webui/vector_db 2>/dev/null | cut -f1 || echo "0B")
    echo "存儲使用: $chroma_size"
    
    # 文件數量
    file_count=$(find ./open-webui/vector_db -type f 2>/dev/null | wc -l || echo "0")
    echo "文件數量: $file_count"
else
    echo "❌ ChromaDB 目錄不存在"
fi

# 總存儲對比
echo ""
echo "【3】存儲對比"
echo "------------------------------------------"
total_size=$(du -sh ./qdrant_storage ./open-webui/vector_db 2>/dev/null | awk '{sum+=$1} END {print sum}' || echo "0")
echo "Qdrant:   $qdrant_size"
echo "ChromaDB: $chroma_size"
echo ""

# 資源使用建議
echo "【4】整合建議"
echo "------------------------------------------"

# 解析大小（簡單比較）
qdrant_mb=$(du -sm ./qdrant_storage 2>/dev/null | cut -f1 || echo "0")
chroma_mb=$(du -sm ./open-webui/vector_db 2>/dev/null | cut -f1 || echo "0")
total_mb=$((qdrant_mb + chroma_mb))

if [ $total_mb -gt 1000 ]; then
    echo "⚠️  總存儲 >1GB，建議考慮整合"
    echo ""
    echo "建議行動："
    echo "  1. 評估哪個向量庫使用更頻繁"
    echo "  2. 考慮遷移到單一向量庫"
    echo "  3. 查看 ARCHITECTURE_ANALYSIS.md"
elif [ $chroma_mb -lt 10 ] && [ $qdrant_mb -gt 100 ]; then
    echo "✅ ChromaDB 使用少，Qdrant 為主"
    echo ""
    echo "建議：保持當前架構或考慮移除 ChromaDB"
elif [ $qdrant_mb -lt 10 ] && [ $chroma_mb -gt 100 ]; then
    echo "✅ Qdrant 使用少，ChromaDB 為主"
    echo ""
    echo "建議：考慮移除獨立 Qdrant，使用 Open WebUI 內建"
else
    echo "✅ 當前存儲使用合理"
    echo ""
    echo "建議：繼續監控，3-6 個月後重新評估"
fi

# 使用場景分析
echo ""
echo "【5】使用場景分析"
echo "------------------------------------------"
echo ""
echo "當前架構：職責分離"
echo ""
echo "Qdrant (專業知識庫):"
echo "  • 用於: 預先索引的專業文檔"
echo "  • 訪問: 使用 -rag 後綴的模型"
echo "  • 管理: Backend API"
echo ""
echo "ChromaDB (用戶文檔):"
echo "  • 用於: 用戶上傳的臨時文檔"
echo "  • 訪問: Open WebUI Documents 功能"
echo "  • 管理: Open WebUI 自動"
echo ""

# 遷移選項
echo "【6】遷移選項"
echo "------------------------------------------"
echo ""
echo "如需整合，參考以下文件："
echo "  • ARCHITECTURE_ANALYSIS.md - 完整分析"
echo "  • docker-compose.unified-qdrant.yml.example - 統一使用 Qdrant"
echo ""
echo "執行遷移前請備份數據："
echo "  tar -czf backup-\$(date +%Y%m%d).tar.gz qdrant_storage open-webui"
echo ""

echo "=========================================="
echo "  檢查完成"
echo "=========================================="

