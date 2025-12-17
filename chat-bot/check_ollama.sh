#!/bin/bash

# Ollama 狀態檢查腳本

echo "=========================================="
echo "  Ollama 模型檢查"
echo "=========================================="

# 檢查 Ollama 服務
if curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "✅ Ollama 服務運行中"
else
    echo "❌ Ollama 服務未運行"
    exit 1
fi

# 列出已下載的模型
echo ""
echo "已下載的模型："
echo "------------------------------------------"
docker exec 05-project-development-ollama-1 ollama list

# 統計
echo ""
MODEL_COUNT=$(docker exec 05-project-development-ollama-1 ollama list 2>/dev/null | tail -n +2 | wc -l)
echo "總計: $MODEL_COUNT 個模型"

# 存儲使用
echo ""
echo "存儲使用："
echo "------------------------------------------"
OLLAMA_SIZE=$(du -sh ./ollama_data 2>/dev/null | cut -f1 || echo "0B")
echo "Ollama 數據: $OLLAMA_SIZE"

echo ""
echo "=========================================="
echo "  使用說明"
echo "=========================================="
echo ""
echo "在 Open WebUI 中下載模型："
echo "1. 訪問 http://localhost:8081"
echo "2. Settings → Models → Pull a model"
echo "3. 輸入模型名稱，例如："
echo "   • llama3.2:3b"
echo "   • qwen2.5:7b"
echo "   • phi3:mini"
echo ""
echo "命令行下載模型："
echo "  docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b"
echo ""

