# AI-Driven CLI 工作流程設定指南：從零到一建立頂尖開發環境

## 前言：從「人機協作」到「人機共生」

本文件旨在為專案經理 (PM)、系統分析師 (SA) 及開發團隊，提供一份從零開始建立頂尖 AI 驅動開發工作流程的完整設定指南。傳統的開發模式，即使有 AI 輔助，仍存在許多痛點，例如：IDE 過度依賴、AI 思維跳躍導致的上下文斷裂、以及重複性手動操作。

本指南提出的 AI-Driven CLI 生態系統，旨在解決這些核心痛點，將開發範式從「人使用工具」提升為「人與 AI 共同創造」。透過以終端機為核心，結合專業化的 AI 子代理 (Subagents) 與智能化的上下文協議 (MCP)，我們將建立一個高度自動化、高效率且品質卓越的開發流程。

**預期效益：**
- **減少 60-80%** 的重複性手動操作。
- **提升 35-50%** 的程式碼品質與穩定性。
- **降低 70%** 的大型語言模型 Token 使用成本。
- **保持 90%** 的人類關鍵決策控制權。

---

## 第一部分：基礎環境建設 (Foundational Setup)

在部署 AI 大腦之前，我們需要先建立一個強大、高效的基礎開發環境。

### 1.1 工作流程核心哲學

我們的 AI 工作流基於一個三層架構模型，確保從高階策略到實際操作的無縫對接：

- **🎯 戰略層 (Strategic)**: 定義業務需求、技術架構與風險評估。此層級由 PM、SA 與資深工程師主導。
- **🤖 戰術層 (Tactical)**: AI 代理與子代理協同工作，進行架構設計、需求分析、程式碼生成與審查。這是 AI 發揮創造力的核心。
- **⚙️ 操作層 (Operational)**: 由一系列高效的 CLI 工具執行具體任務，如版本控制、容器化、測試與部署，並由 AI 代理調度。

### 1.2 終端環境優化 (Terminal Enhancement)

終端機是此工作流的核心互動介面。以下工具能大幅提升操作效率：

| 工具名稱 | 主要功能 | 痛點解決 | macOS (Brew) | Linux (apt) |
| :--- | :--- | :--- | :--- | :--- |
| **zoxide** | 智能目錄導航 | 解決 `cd` 指令繁瑣的路徑輸入 | `brew install zoxide` | `sudo apt install zoxide` |
| **thefuck** | 命令錯誤自動修正 | 修正指令拼寫錯誤，無需重打 | `brew install thefuck` | `sudo apt install thefuck` |
| **eza** | 增強版檔案列表 | 提供比 `ls` 更豐富、易讀的資訊 | `brew install eza` | `sudo apt install eza` |
| **tldr** | 簡化命令說明 | 提供比 `man` 更簡潔的指令範例 | `brew install tldr` | `sudo apt install tldr` |

### 1.3 核心 AI 引擎：Claude Code

Claude Code 是我們選擇的終端機原生 AI 開發夥伴。它深度整合了 Subagents 與 MCP 協議，並透過專案根目錄下的 `.claude/` 資料夾來持久化專案記憶體，確保 AI 對專案上下文有深入且持續的理解。

*(註：此處假設 `claude` CLI 工具已安裝並完成認證。)*

### 1.4 基礎開發工具集 (Core Dev Tools)

以下是現代化開發不可或缺的基礎工具：

| 工具名稱 | 用途 | macOS (Brew) | Linux (apt) |
| :--- | :--- | :--- | :--- |
| **Git & GitHub CLI** | 版本控制與協作 | `brew install git gh` | `sudo apt install git gh` |
| **Docker** | 容器化技術 | `brew install --cask docker` | *(參閱官方文件)* |
| **Kubernetes CLI** | K8s 集群管理 | `brew install kubectl` | `sudo apt install kubectl` |
| **Node.js & npm** | 執行 MCP 伺服器 | `brew install node` | `sudo apt install nodejs npm` |
| **Python** | 應用程式開發與腳本 | `brew install python` | `sudo apt install python3` |

---

## 第二部分：AI 生態系統配置 (The Brains)

配置好基礎環境後，現在我們來打造這個工作流的大腦。這個大腦由兩部分協同運作：

- **專業子代理 (Subagents)**: 扮演著不同領域的專家角色，是決策和執行的「代理人」。
- **模型上下文協議 (MCP) 伺服器**: 作為提供即時、動態資訊的「工具」，為代理人提供決策所需的關鍵上下文。

這種「代理人 + 工具」的協作模式，讓 AI 不再是閉門造車，而是能夠感知外部世界、利用外部工具的智能夥伴。

請在您的專案根目錄下建立 `.claude` 資料夾以開始配置。

### 2.1 配置 AI 的工具箱：模型上下文協議 (MCP) 伺服器

MCP 伺服器為您的 Subagents 提供了訪問外部世界資訊與服務的能力，是他們賴以工作的強大工具集。它為 AI 提供了動態、即時的外部上下文，讓 AI 不再僅僅依賴其訓練資料。

**操作步驟**：在 `.claude/` 目錄下建立 `mcp.json` 檔案，並貼上以下內容：

```json:/.claude/mcp.json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_BRAVE_API_KEY"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "YOUR_CONTEXT7_API_KEY"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```
- **brave-search**: 提供即時網路搜尋能力，用於技術調研。
- **context7**: 提供程式庫文件檢索能力，讓 AI 能查詢特定框架或函式庫的用法。
- **github**: 整合 GitHub API，用於自動化 PR 管理與程式碼分析。
- **playwright**: 提供完整的瀏覽器自動化能力，用於端到端測試、UI 驗證與網頁互動。

### 2.2 組建專家團隊：專業子代理 (Subagents) 配置

現在，我們來定義將要使用上述工具的專家代理團隊。Subagents 是實現任務分工、提升 AI 專業度的關鍵，每個 Subagent 都是一個針對特定領域的專家。

**操作步驟**：在 `.claude/` 目錄下建立 `agents` 資料夾。然後在 `agents/` 內分別建立以下 Markdown 檔案：

#### 1. `test-runner.md` - 測試自動化專家
```markdown:/.claude/agents/test-runner.md
---
name: test-runner
description: 主動執行測試並修復失敗，適用於程式碼變更後的自動化測試
tools: execute_python, search_web, browse_public_web
model: sonnet
---

你是測試自動化專家。當發現程式碼變更時，主動執行相應的測試。
如果測試失敗，分析失敗原因並修復，同時保持原始測試意圖。

職責:
- 檢測程式碼變更並觸發相關測試
- 並行執行多個測試套件
- 分析測試失敗模式
- 自動生成缺失的測試案例
- 維護測試資料一致性
```

#### 2. `code-reviewer.md` - 程式碼審查專家
```markdown:/.claude/agents/code-reviewer.md
---
name: code-reviewer
description: 深度分析程式碼品質、安全性和最佳實務
tools: browse_public_web, search_web
model: sonnet
---

你是資深程式碼審查專家。專注於：

**程式碼品質檢查:**
- 架構設計合理性
- 程式碼可讀性和維護性
- 效能優化建議
- 技術債務識別

**安全性審查:**
- 常見安全漏洞檢測
- 依賴套件安全性
- 資料處理安全性
- 權限控制檢查
```

#### 3. `security-auditor.md` - 網路安全專家
```markdown:/.claude/agents/security-auditor.md
---
name: security-auditor  
description: 多層次安全掃描和威脅分析
tools: search_web, execute_python
model: sonnet
---

你是網路安全專家，專門進行：

**程式碼層安全:**
- OWASP Top 10 檢查
- SQL 注入預防
- XSS 防護驗證

**基礎設施安全:**
- 容器安全掃描
- 依賴漏洞分析  
- 設定檔安全檢查
```

#### 4. `deployment-expert.md` - 部署與 DevOps 專家
```markdown:/.claude/agents/deployment-expert.md
---
name: deployment-expert
description: 零停機部署和基礎設施管理
tools: browse_public_web, search_web, execute_python  
model: sonnet
---

你是 DevOps 和部署專家，專精於：

**部署策略:**
- 藍綠部署與金絲雀發佈
- 回滾機制設計
- 健康檢查配置

**基礎設施管理:**
- Container orchestration (Docker, Kubernetes)
- 負載平衡優化
- 監控告警設定
```

#### 5. `browser-automation-expert.md` - 瀏覽器自動化專家
```markdown:/.claude/agents/browser-automation-expert.md
---
name: browser-automation-expert
description: 瀏覽器自動化專家，專門處理端到端 (E2E) 測試、UI 驗證與網頁任務自動化。
tools: browser_navigate, browser_click, browser_type, browser_snapshot, browser_wait_for
model: sonnet
---

你是瀏覽器自動化專家，使用 Playwright 工具集來與網頁互動。你的核心職責包括：

**核心能力:**
- **端到端測試**: 根據使用者故事，設計並執行完整的用戶流程測試案例。
- **UI 驗證**: 導航至指定頁面，擷取畫面快照 (`browser_snapshot`)，並驗證特定 UI 元素是否存在或內容是否正確。
- **任務自動化**: 執行如登入、表單提交、資料抓取等自動化腳本。
- **部署後煙霧測試**: 在應用程式部署後，快速驗證核心功能是否正常運作。
```

---

## 第三部分：AI 驅動開發實戰演練 (Workflow in Practice)

現在，我們將以一個「開發待辦事項 (Todo) API」的典型場景，來演練這套工作流程。

### 3.1 階段一：問題分析 (Problem Analysis)

- **PM/SA (戰略層)**: 定義使用者故事：「使用者需要一個可以新增、查詢、刪除待辦事項的 RESTful API」。

- **開發者 (戰術/操作層)**:
    1.  **技術調研**:
        ```bash
        claude --use-brave-search "what are the best practices for RESTful API design in Python for 2025"
        ```
    2.  **生成初步方案**:
        ```bash
        claude "Based on the best practices, propose a technology stack and project structure for a simple Todo API using Python."
        ```
    3.  **初始化專案**:
        ```bash
        gh repo create my-todo-api --private --clone
        cd my-todo-api
        # (根據 AI 建議建立專案結構)
        ```

### 3.2 階段二：解決方案策略 (Solution Strategy)

- **PM/SA (戰略層)**: 根據業務邏輯，確認 API 端點與資料模型。

- **開發者 (戰術/操作層)**:
    1.  **生成 API 規格**:
        ```bash
        claude "Use the api-designer subagent to generate an OpenAPI 3.0 specification for a Todo API. It should include endpoints for creating, listing, getting, and deleting todos. Each todo has an id, content, and a is_completed status."
        ```
    2.  **設計資料庫結構**:
        ```bash
        claude "Design a simple SQLAlchemy model for the Todo item."
        ```

### 3.3 階段三：實作開發 (Implementation)

- **PM/SA (戰略層)**: 透過 GitHub Issues 追蹤開發進度。

- **開發者 (戰術/操作層)**:
    1.  **AI 生成程式碼框架**:
        ```bash
        claude "Generate the Python Flask application code based on the OpenAPI spec and the SQLAlchemy model we just designed. Include error handling."
        ```
    2.  **開發與測試**: 開發者在 AI 生成的基礎上手動完善程式碼細節。當程式碼被修改並提交 (`git commit`)，CI/CD 管線會被觸發，並自動調用 `test-runner` 子代理。
        ```bash
        # (手動編寫 pytest 測試案例)
        git add .
        git commit -m "feat: implement initial API endpoints"
        # CI/CD 流程將自動運行 pytest，並由 test-runner 分析結果
        ```
    3.  **程式碼審查**: 當開發者建立一個 Pull Request 時，`code-reviewer` 和 `security-auditor` 將被自動觸發，並以評論的形式提供建議。
        ```bash
        gh pr create --title "Implement Todo API" --body "Ready for review."
        # code-reviewer 和 security-auditor 將自動對此 PR 進行分析
        ```

### 3.4 階段四：部署與維運 (Deployment)

- **PM/SA (戰略層)**: 規劃上線時程與資源。

- **開發者 (戰術/操作層)**:
    1.  **生成部署腳本**:
        ```bash
        claude "Use the deployment-expert subagent to create a multi-stage Dockerfile for this Flask application."
        ```
    2.  **生成 K8s 配置**:
        ```bash
        claude "Now, use the deployment-expert to generate a Kubernetes deployment and service YAML file for this application."
        ```
    3.  **執行部署**:
        ```bash
        docker build -t my-todo-api:v1 .
        # (推送鏡像到容器倉庫)
        kubectl apply -f deployment.yaml
        ```

    4.  **部署後驗證 (Post-Deployment Verification)**:
        部署完成後，使用新的瀏覽器自動化專家來執行煙霧測試，確保核心功能正常。
        ```bash
        claude "Use the browser-automation-expert to navigate to our newly deployed Todo API's health check URL. Then, try to create a new todo item via the UI, take a snapshot, and confirm the item appears in the list."
        ```

---

## 結論：開發新範式

本指南詳細闡述的 AI-Driven CLI 工作流程，不僅僅是一套工具的組合，更是一種全新的開發哲學。它將 AI 從一個被動的輔助工具，轉變為主動的、專業化的開發夥伴。

透過人機之間在戰略、戰術、操作層面的清晰分工與協同，您的團隊將能夠在保持高品質與安全性的同時，極大地提升開發效率與創新速度。歡迎來到軟體開發的下一個時代。

---

## 第三部分：頂尖開發者進階配置 (Elite Developer Advanced Setup)

本部分整合了頂尖軟體工程師的進階配置策略，涵蓋多模態處理、網頁自動化、視覺測試等領域的完整解決方案。

### 3.1 多模態處理增強 (Multi-modal Enhancement)

#### Screenshot & Visual Analysis MCP Server
解決 Claude Code 無法「看見」介面的核心痛點：

**MCP 伺服器配置** (`~/.claude/.mcp.json`):
```json
{
  "mcpServers": {
    "screenshot-analysis": {
      "command": "python",
      "args": ["$HOME/.claude/mcp-servers/screenshot-analysis/server.py"],
      "env": {
        "OPENAI_API_KEY": "your-openai-api-key"
      }
    }
  }
}
```

**Visual Analyzer Subagent** (`~/.claude/agents/visual-analyzer.md`):
```markdown
---
name: visual-analyzer
description: UI/UX 視覺分析專家，專門處理介面設計、可用性和視覺回歸測試
tools: browse_public_web, search_web, execute_python
model: sonnet
---

你是專業的 UI/UX 視覺分析師，具備以下核心能力：

## 視覺分析專長
- **介面設計評估**: 分析介面配色、版面、字型、間距等設計元素
- **可用性檢測**: 檢查介面的用戶體驗、無障礙設計、響應式適配
- **視覺回歸分析**: 比較 UI 變更前後的差異，識別非預期的視覺變化
- **跨瀏覽器相容性**: 評估不同瀏覽器和裝置上的視覺一致性
```

### 3.2 網頁自動化生態系統 (Web Automation Ecosystem)

#### Enhanced Puppeteer MCP Server
提供穩定、智能的瀏覽器控制能力：

**配置範例**:
```json
{
  "mcpServers": {
    "enhanced-puppeteer": {
      "command": "node",
      "args": ["$HOME/.claude/mcp-servers/puppeteer-enhanced/server.js"],
      "env": {
        "BROWSER_PORT": "9222"
      }
    }
  }
}
```

#### Browser Test Expert Subagent
自動化測試的專業代理：

**配置檔案** (`~/.claude/agents/browser-test-expert.md`):
```markdown
---
name: browser-test-expert
description: 瀏覽器自動化測試專家，處理端到端測試、性能測試和跨瀏覽器驗證
tools: execute_python, search_web
model: sonnet
---

## 測試策略設計
- **端到端測試**: 設計完整的用戶流程測試案例
- **跨瀏覽器測試**: Chrome, Firefox, Safari, Edge 相容性驗證
- **響應式測試**: 多裝置、多解析度的 UI 適配測試
- **性能測試**: 頁面載入速度、互動響應時間測量
```

### 3.3 Hook 自動化系統 (Automated Hook System)

#### 視覺回饋自動化
檔案修改後自動觸發視覺分析：

**Hook 配置** (`~/.claude/settings.local.json`):
```json
{
  "hooks": [
    {
      "event": "PostToolUse",
      "matcher": {
        "tool_name": "edit_file",
        "file_paths": ["src/components/**/*.tsx", "src/pages/**/*.tsx", "*.css", "*.scss"]
      },
      "command": "python3 ~/.claude/scripts/auto-screenshot.py \"$CLAUDE_FILE_PATHS\"",
      "run_in_background": true
    }
  ]
}
```

#### 部署前視覺回歸檢查
```json
{
  "hooks": [
    {
      "event": "PreToolUse",
      "matcher": {
        "tool_name": "run_command",
        "query": "deploy"
      },
      "command": "python3 ~/.claude/scripts/visual-regression-test.py"
    }
  ]
}
```

### 3.4 完整配置目錄結構

**全域 Claude Code 配置**:
```bash
~/.claude/
├── .mcp.json                          # MCP 伺服器配置
├── agents/                            # Subagents 配置
│   ├── visual-analyzer.md             # 視覺分析專家
│   ├── browser-test-expert.md         # 瀏覽器測試專家
│   ├── ui-feedback.md                 # UI 回饋專家
│   ├── task-coordinator.md            # 任務協調專家
│   ├── test-runner.md                 # 測試執行專家
│   ├── code-reviewer.md               # 程式碼審查專家
│   ├── security-auditor.md            # 安全審計專家
│   └── deployment-expert.md           # 部署專家
├── commands/                          # 自訂命令
│   ├── visual-debug.md                # 視覺除錯命令
│   ├── browser-test.md                # 瀏覽器測試命令
│   ├── ui-compare.md                  # UI 比較命令
│   ├── screenshot.md                  # 截圖命令
│   ├── preview.md                     # 預覽命令
│   └── deploy.md                      # 部署命令
├── mcp-servers/                       # 自訂 MCP 伺服器源碼
│   ├── screenshot-analysis/           # 截圖分析伺服器
│   ├── puppeteer-enhanced/            # 增強版 Puppeteer 伺服器
│   ├── visual-testing/                # 視覺測試伺服器
│   └── workflow-orchestration/        # 工作流編排伺服器
├── scripts/                           # Hook 腳本
│   ├── auto-screenshot.py             # 自動截圖腳本
│   ├── visual-regression-test.py      # 視覺回歸測試
│   ├── trigger-e2e-test.py            # 觸發端到端測試
│   └── generate-visual-report.py      # 生成視覺報告
└── settings.local.json                # 全域設定與 Hooks
```

### 3.5 實作優先級路徑圖

#### Phase 1: 核心多模態能力 (2-4 週)
| 優先級 | 增強領域 | 具體解決方案 | 配置路徑 |
|--------|----------|--------------|----------|
| 1 | 多模態處理 | Screenshot MCP + Image Analysis API | `~/.claude/.mcp.json` |
| 1 | 網頁自動化 | Puppeteer MCP Server | `~/.claude/.mcp.json` |
| 1 | UI回饋循環 | Real-time Preview MCP | `~/.claude/.mcp.json` |

#### Phase 2: 專業 Subagents (3-6 週)
| 優先級 | 增強領域 | 具體解決方案 | 配置路徑 |
|--------|----------|--------------|----------|
| 2 | 多模態處理 | Visual Analyzer Subagent + OCR能力 | `~/.claude/agents/visual-analyzer.md` |
| 2 | 網頁自動化 | Browser Automation Subagent | `~/.claude/agents/browser-automation.md` |
| 2 | 工作流自動化 | Workflow Orchestration MCP | `~/.claude/.mcp.json` |

#### Phase 3: 自動化 Hooks (4-8 週)
| 優先級 | 增強領域 | 具體解決方案 | 配置路徑 |
|--------|----------|--------------|----------|
| 3 | 網頁自動化 | PreToolUse Hook 驗證頁面載入 | `~/.claude/settings.local.json` |
| 3 | UI回饋循環 | Notification Hook 推送預覽 | `~/.claude/settings.local.json` |
| 4 | 多模態處理 | PostToolUse Hook 自動截圖 | `~/.claude/settings.local.json` |

### 3.6 投資回報分析

**開發投資**:
- 初期開發: 40-80 小時
- 學習適應: 2-4 週
- 維護成本: 每週 2-4 小時

**預期收益**:
- 開發效率提升: **35-50%**
- Bug 檢測率提升: **60-80%**
- 視覺回歸問題減少: **90%**
- 手動測試時間節省: **70%**
- Token 使用成本降低: **70%**

### 3.7 配置驗證與故障排除

#### 驗證命令
```bash
# 檢查 MCP 配置
/mcp

# 檢查 Claude Code 整體狀態
/doctor

# 列出可用的 Subagents
/agents

# 測試自訂命令
/visual-debug
/browser-test
```

#### 常見問題解決
1. **MCP 伺服器未顯示**: 確認 `.mcp.json` 在 `~/.claude/` 目錄且檔名以 `.` 開頭
2. **Subagents 無法載入**: 確認 `agents/` 目錄在全域 `~/.claude/` 路徑
3. **Hooks 未觸發**: 檢查 `settings.local.json` 中的 `hooks` 配置語法
4. **權限被拒絕**: 檢查 `settings.local.json` 中的 `permissions` 設定

**這套頂尖開發者配置將 Claude Code 從純程式碼生成工具升級為具備完整視覺感知、瀏覽器自動化和即時回饋能力的 AI 開發夥伴，實現真正的「人機共生」開發體驗。**
