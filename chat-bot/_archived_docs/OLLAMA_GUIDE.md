# Ollama 本地模型使用指南

## 概述

Ollama 服務已啟用！你可以在 Open WebUI 中直接下載和使用本地開源模型。

**優勢：**
- ✅ **完全免費** - 無需 API Key
- ✅ **隱私保護** - 數據不離開本地
- ✅ **GPU 加速** - 使用 NVIDIA GPU 加速推理
- ✅ **豐富選擇** - 支持數百個開源模型
- ✅ **持久化存儲** - 模型下載後永久保存

## 服務狀態

```bash
# 檢查 Ollama 服務
curl http://localhost:11434/api/tags

# 查看已下載的模型
docker exec 05-project-development-ollama-1 ollama list
```

## 在 Open WebUI 中下載模型

### 方法 1：通過界面下載（推薦）

1. **訪問 Open WebUI**
   ```
   http://localhost:8081
   ```

2. **進入設置**
   - 點擊右上角頭像
   - 選擇 "Settings"
   - 進入 "Models"

3. **下載模型**
   - 找到 "Pull a model from Ollama.com"
   - 輸入模型名稱，例如：
     - `llama3.2:3b` - Meta Llama 3.2 (3B 參數，快速)
     - `llama3.1:8b` - Meta Llama 3.1 (8B 參數)
     - `qwen2.5:7b` - 阿里通義千問 2.5 (7B)
     - `mistral:7b` - Mistral 7B
     - `gemma2:9b` - Google Gemma 2 (9B)
   - 點擊下載按鈕
   - 等待下載完成（會顯示進度）

4. **使用模型**
   - 回到主頁面
   - 在模型選擇下拉選單中會看到新下載的模型
   - 選擇後即可開始對話

### 方法 2：通過命令行下載

```bash
# 下載 Llama 3.2 (3B)
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b

# 下載通義千問 2.5 (7B)
docker exec 05-project-development-ollama-1 ollama pull qwen2.5:7b

# 下載 Mistral 7B
docker exec 05-project-development-ollama-1 ollama pull mistral:7b
```

## 推薦模型

### 小型模型（3-7B，適合快速對話）

| 模型 | 大小 | 特點 | 下載命令 |
|------|------|------|---------|
| `llama3.2:3b` | ~2GB | Meta 最新，快速 | `ollama pull llama3.2:3b` |
| `phi3:mini` | ~2.3GB | Microsoft，高效 | `ollama pull phi3:mini` |
| `gemma2:2b` | ~1.6GB | Google，輕量 | `ollama pull gemma2:2b` |

### 中型模型（7-9B，平衡性能）

| 模型 | 大小 | 特點 | 下載命令 |
|------|------|------|---------|
| `qwen2.5:7b` | ~4.7GB | 阿里，中文強 | `ollama pull qwen2.5:7b` |
| `llama3.1:8b` | ~4.7GB | Meta，全能 | `ollama pull llama3.1:8b` |
| `mistral:7b` | ~4.1GB | Mistral AI，推理強 | `ollama pull mistral:7b` |
| `gemma2:9b` | ~5.5GB | Google，多語言 | `ollama pull gemma2:9b` |

### 大型模型（13B+，高質量輸出）

| 模型 | 大小 | 特點 | 下載命令 |
|------|------|------|---------|
| `llama3.1:70b` | ~40GB | Meta 旗艦 | `ollama pull llama3.1:70b` |
| `qwen2.5:14b` | ~9GB | 阿里中型 | `ollama pull qwen2.5:14b` |
| `mixtral:8x7b` | ~26GB | Mistral MoE | `ollama pull mixtral:8x7b` |

### 代碼專用模型

| 模型 | 大小 | 特點 | 下載命令 |
|------|------|------|---------|
| `codellama:7b` | ~3.8GB | Meta 代碼模型 | `ollama pull codellama:7b` |
| `deepseek-coder:6.7b` | ~3.8GB | DeepSeek 編程 | `ollama pull deepseek-coder:6.7b` |

## 為 Ollama 模型添加 RAG 功能

目前 Ollama 模型**不會自動生成 RAG 版本**。如果需要讓 Ollama 模型也支持 RAG，需要修改後端代碼。

### 臨時方案：手動創建 Ollama RAG 端點

可以在 Open WebUI 中：
1. 使用 Ollama 模型進行對話
2. 切換到帶 `-rag` 後綴的 OpenAI/Anthropic/Google 模型進行文檔問答

## 管理模型

### 查看已下載的模型

```bash
# 方法 1：通過 API
curl http://localhost:11434/api/tags

# 方法 2：通過 Ollama CLI
docker exec 05-project-development-ollama-1 ollama list
```

### 刪除不需要的模型

```bash
# 刪除特定模型
docker exec 05-project-development-ollama-1 ollama rm llama3.2:3b

# 查看磁碟使用
du -sh ./ollama_data
```

### 更新模型

```bash
# 重新下載即可更新
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b
```

## 存儲位置

模型存儲在：
```
05-project-development/ollama_data/
```

**注意：**
- 模型文件較大（2GB - 40GB）
- 確保有足夠的磁碟空間
- 模型下載後會持久保存，容器重啟後仍然可用

## 性能優化

### GPU 加速

Ollama 已配置使用 NVIDIA GPU：

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

**驗證 GPU 使用：**
```bash
# 運行模型時，在另一個終端查看 GPU 使用
nvidia-smi

# 應該看到 ollama 進程在使用 GPU
```

### 如果沒有 GPU（使用 CPU）

如果系統沒有 NVIDIA GPU，需要修改 `docker-compose.yml`：

```yaml
ollama:
  image: ollama/ollama:latest
  ports:
    - "11434:11434"
  volumes:
    - ./ollama_data:/root/.ollama
  # 註釋掉或刪除 deploy 部分
```

## 常見問題

### Q: 為什麼模型下載很慢？

**A:** 
- Ollama 從官方服務器下載，速度取決於網絡
- 可以考慮使用國內鏡像或 VPN

### Q: 如何選擇模型大小？

**A:** 根據你的硬體配置：
- **8GB VRAM**: 3B-7B 模型
- **16GB VRAM**: 7B-13B 模型
- **24GB VRAM**: 13B-33B 模型
- **40GB+ VRAM**: 70B 模型

### Q: Ollama 模型和 API 模型有什麼區別？

**A:**

| 特性 | Ollama (本地) | OpenAI/Anthropic/Google (API) |
|------|--------------|------------------------------|
| 成本 | 免費 | 按使用付費 |
| 速度 | 取決於硬體 | 通常較快 |
| 隱私 | 完全本地 | 數據發送到雲端 |
| 模型質量 | 開源模型 | 頂級商業模型 |
| 離線使用 | ✅ | ❌ |

### Q: 能同時使用 Ollama 和 API 模型嗎？

**A:** 可以！在 Open WebUI 中可以自由切換：
- Ollama 模型：如 `llama3.2:3b`, `qwen2.5:7b`
- API 模型：如 `gpt-4o-mini`, `claude-haiku-4-5`
- API RAG 模型：如 `gpt-4o-mini-rag`, `claude-sonnet-4-5-rag`

## 使用示例

### 1. 快速開始（推薦初學者）

```bash
# 下載一個小模型（約 2GB）
docker exec 05-project-development-ollama-1 ollama pull llama3.2:3b

# 在 Open WebUI 中選擇 llama3.2:3b 開始對話
```

### 2. 中文優化配置

```bash
# 下載中文友好的模型
docker exec 05-project-development-ollama-1 ollama pull qwen2.5:7b

# 在 Open WebUI 中使用
```

### 3. 代碼助手配置

```bash
# 下載代碼專用模型
docker exec 05-project-development-ollama-1 ollama pull codellama:7b

# 用於編程相關問題
```

## 完整工作流示例

**場景：使用本地模型進行日常對話，使用 RAG 進行專業文檔問答**

1. **下載本地模型**（一次性）
   ```bash
   docker exec 05-project-development-ollama-1 ollama pull qwen2.5:7b
   ```

2. **在 Open WebUI 中**：
   - 日常對話 → 選擇 `qwen2.5:7b` (免費，本地)
   - 文檔問答 → 選擇 `gpt-4o-mini-rag` (API，準確)
   - 代碼幫助 → 選擇 `claude-sonnet-4-5` (API，專業)

3. **成本優化**：
   - 80% 使用 Ollama 模型（免費）
   - 20% 使用 API 模型（付費但高質量）

## 監控與調試

### 查看 Ollama 日誌

```bash
docker compose logs ollama -f
```

### 測試 Ollama API

```bash
# 列出模型
curl http://localhost:11434/api/tags

# 生成對話（需要先下載模型）
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:3b",
  "prompt": "Why is the sky blue?"
}'
```

## 總結

- ✅ Ollama 服務已啟用
- ✅ 支持 GPU 加速
- ✅ 模型持久化存儲
- ✅ 可在 Open WebUI 中直接下載模型
- ✅ 無需預先下載，按需下載即可

**推薦配置：**
1. 下載一個小模型測試：`llama3.2:3b`
2. 如果滿意，再下載更大的模型：`qwen2.5:7b`
3. 根據需求選擇 Ollama（免費）或 API（高質量）模型

祝使用愉快！🚀

