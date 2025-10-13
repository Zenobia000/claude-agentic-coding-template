# 🏗️ TaskMaster & Claude Code Collective - 系統架構設計

## 🎯 核心設計理念

**TaskMaster** 採用「人類駕駛員 + AI 副駕駛」的協作模式，結合 Hub-and-Spoke 架構與 WBS Todo List 系統，實現智能化但人類主導的開發協作平台。

### 🤖⚔️ 人類駕駛員哲學
- **完全控制權**: 所有重要決策由人類做出
- **智能建議**: AI 提供分析和建議，但不自作主張
- **透明執行**: 所有狀態和決策過程完全可見
- **緊急控制**: 隨時可暫停系統，完全手動接管

## 🏗️ 系統架構組件

### 1. **TaskMaster 核心引擎** (`taskmaster.js`)

#### 核心類別設計
```javascript
class TaskMaster {
    constructor() {
        this.taskManager = new HumanTaskManager();     // 人類任務管理
        this.hubController = new HubController();       // Hub 協調控制
        this.persistence = new TaskPersistence();       // 持久化存儲
        this.vbCoding = new VibeCodingBridge();         // VibeCoding 整合
        this.wbsTodos = new WBSTodoManager();           // WBS 狀態管理
    }
}
```

#### 職責分工
- **HumanTaskManager**: 人類決策接口，確保所有重要決策由人類做出
- **HubController**: Hub-and-Spoke 協調邏輯，智能分析和建議
- **TaskPersistence**: 專案配置和狀態持久化管理
- **VibeCodingBridge**: VibeCoding 範本整合和 JIT 載入
- **WBSTodoManager**: WBS Todo List 統一狀態管理

### 2. **Hub-and-Spoke 協調系統**

#### Hub 智能分析引擎
```javascript
class HubController {
    async analyzeTask(task, wbsContext) {
        // 1. 任務特性分析
        const taskAnalysis = await this.analyzeTaskCharacteristics(task);

        // 2. 智能體適配分析
        const agentSuggestions = await this.generateAgentSuggestions(taskAnalysis);

        // 3. 協調策略分析
        const coordinationStrategy = await this.determineCoordinationStrategy(taskAnalysis);

        return { taskAnalysis, agentSuggestions, coordinationStrategy };
    }
}
```

#### Spoke 專業智能體整合
- **general-purpose** 🔧 - 通用任務處理，複雜度評估，多領域協調
- **code-quality-specialist** 🔍 - 程式碼品質審查，重構建議，技術債務管理
- **test-automation-engineer** 🧪 - 測試自動化，測試策略，品質保證
- **security-infrastructure-auditor** 🔒 - 安全分析，漏洞檢測，合規檢查
- **deployment-expert** 🚀 - 部署策略，CI/CD，生產環境管理
- **documentation-specialist** 📚 - 技術文檔，API 規格，知識管理
- **workflow-template-manager** ⭐ - 工作流程管理，範本協調，生命週期管理

### 3. **WBS Todo List 系統**

#### WBS 狀態管理架構
```javascript
class WBSTodoManager {
    constructor() {
        this.todos = [];                    // 任務清單
        this.history = [];                  // 歷史記錄
        this.metadata = {};                 // 元數據
    }

    async createTask(taskData) {
        // 創建新任務，自動分配 ID 和時間戳
    }

    async updateTaskStatus(taskId, newStatus) {
        // 更新任務狀態，記錄變更歷史
    }

    async getProjectStatus() {
        // 提供專案全局狀態視圖
    }
}
```

#### WBS 任務狀態流
```
pending → in_progress → completed
    ↓           ↓           ↓
 等待中      執行中      已完成
```

#### 統一狀態管理特性
- **實時同步**: 與智能體執行狀態保持同步
- **歷史追蹤**: 完整記錄任務變更歷史
- **全局透明**: 人類駕駛員隨時掌握專案全貌
- **持久化存儲**: 狀態保存在 `.claude/taskmaster-data/wbs-todos.json`

### 4. **VibeCoding 範本整合系統**

#### VibeCoding Bridge 架構
```javascript
class VibeCodingBridge {
    constructor() {
        this.templateCache = new Map();     // 範本快取
        this.templates = [                  // 10個企業級範本
            '01_project_brief_and_prd.md',
            '02_behavior_driven_development_guide.md',
            '03_architecture_and_design_document.md',
            '04_api_design_specification.md',
            '05_module_specification_and_tests.md',
            '06_security_and_readiness_checklists.md',
            '07_project_structure_guide.md',
            '08_code_review_and_refactoring_guide.md',
            '09_deployment_and_operations_guide.md',
            '10_documentation_and_maintenance_guide.md'
        ];
    }
}
```

#### JIT (Just-in-Time) 範本載入
- **需求分析**: 基於專案特性分析相關範本
- **智能排序**: Hub 根據任務特性排序範本優先級
- **動態載入**: 只載入當前階段需要的範本內容
- **快取機制**: 載入過的範本內容進行快取優化

## 🔄 TaskMaster 協作流程設計

### 1. **專案初始化流程**
```
CLAUDE_TEMPLATE.md 偵測
    ↓
VibeCoding 7問澄清 (人類回答 + AI 建議)
    ↓
TaskMaster Hub 智能分析
    ↓
生成 WBS Todo List (31個智能任務)
    ↓
人類駕駛員最終確認
    ↓
系統建立 (.claude/taskmaster-data/)
    ↓
開始協作開發
```

### 2. **典型開發循環**
```
📊 /task-status (查看專案狀態)
    ↓
🎯 /task-next (Hub 智能建議)
    ↓
🤖⚔️ 人類決策 (採納/調整/暫停)
    ↓
🤖 /hub-delegate (委派智能體執行)
    ↓
📋 WBS 自動更新 (任務狀態同步)
    ↓
🔍 /review-code (品質檢查)
    ↓
🎯 下一循環
```

### 3. **智能體協調機制**
```javascript
// Hub 協調決策流程
async function coordinateAgent(task, wbsContext) {
    // 1. 任務特性分析
    const analysis = analyzeTaskCharacteristics(task);

    // 2. 智能體適配度計算
    const agentScores = calculateAgentSuitability(analysis);

    // 3. 協調策略決定
    const strategy = determineStrategy(analysis, wbsContext);

    // 4. 人類確認
    const humanDecision = await askHumanConfirmation({
        suggestedAgent: agentScores[0].agent,
        confidence: agentScores[0].suitability,
        alternatives: agentScores.slice(1, 3)
    });

    return humanDecision;
}
```

## 📁 TaskMaster 系統目錄架構

```
📦 TaskMaster & Claude Code Collective
├── 📄 README.md                        # 🏠 系統總覽和快速開始
├── 📄 CLAUDE_TEMPLATE.md               # ⭐ 主初始化範本 (觸發點)
├── 📄 MCP_SETUP_GUIDE.md               # 🔧 MCP 伺服器設定指南
├── 📄 .mcp.json                        # 🚀 MCP 伺服器配置 (需使用者設定 API 金鑰)
├── 📄 .mcp.json.template               # 📋 MCP 設定範本
├── 📁 .claude/                         # 🤖 TaskMaster 核心系統
│   ├── 🚀 taskmaster.js                # 核心引擎 (完整實現)
│   │   ├── class TaskMaster            # 主協調器
│   │   ├── class HumanTaskManager      # 人類決策接口
│   │   ├── class HubController         # Hub 智能分析
│   │   ├── class VibeCodingBridge      # VibeCoding 整合
│   │   ├── class WBSTodoManager        # WBS 狀態管理
│   │   ├── class TaskPersistence       # 持久化管理
│   │   ├── class DocumentGenerator     # 文檔生成器 (基於 VibeCoding 範本)
│   │   ├── class ContextManager        # 上下文管理
│   │   └── class HookHandler           # Hook 事件處理
│   │
│   ├── 🏗️ ARCHITECTURE.md             # 本檔案：完整系統架構設計
│   ├── ⚙️ settings.local.json          # Claude Code 本地設定 (需使用者配置)
│   ├── 📋 settings.local.json.template # Claude Code 設定範本
│   │
│   ├── 📁 hooks/                       # 🪝 TaskMaster Hook 系統
│   │   ├── ⚡ session-start.sh         # 會話開始檢查 (自動偵測模板)
│   │   ├── 💬 user-prompt-submit.sh    # 使用者輸入處理
│   │   ├── 🔧 pre-tool-use.sh          # 工具使用前處理
│   │   ├── 📝 post-write.sh            # 檔案寫入後處理
│   │   ├── 🛠️ hook-utils.sh            # Hook 工具函式
│   │   └── 📄 README.md                # Hook 系統說明
│   │
│   ├── 📁 taskmaster-data/             # 💾 專案資料存儲 (動態產生)
│   │   ├── 📄 project.json             # 專案配置和狀態
│   │   └── 📄 wbs-todos.json           # WBS Todo List 統一狀態管理
│   │
│   └── 📁 context/                     # 🧠 智能體上下文共享
│       ├── 📁 quality/                 # code-quality-specialist 上下文
│       ├── 📁 testing/                 # test-automation-engineer 上下文
│       ├── 📁 security/                # security-infrastructure-auditor 上下文
│       ├── 📁 deployment/              # deployment-expert 上下文
│       ├── 📁 docs/                    # documentation-specialist 上下文
│       ├── 📁 workflow/                # workflow-template-manager 上下文
│       └── 📁 decisions/               # 架構決策記錄 (ADR)
│
└── 📁 VibeCoding_Workflow_Templates/   # 🎨 企業級開發範本庫 (10個)
    ├── 📊 01_project_brief_and_prd.md
    ├── 🧪 02_behavior_driven_development_guide.md
    ├── 🏗️ 03_architecture_and_design_document.md
    ├── 🔧 04_api_design_specification.md
    ├── 📋 05_module_specification_and_tests.md
    ├── 🛡️ 06_security_and_readiness_checklists.md
    ├── 📁 07_project_structure_guide.md
    ├── 📝 08_code_review_and_refactoring_guide.md
    ├── 🚀 09_deployment_and_operations_guide.md
    └── 📚 10_documentation_and_maintenance_guide.md
```

## 🔍 系統設計分析 (System Design Analysis)

### 1. **可擴展性 (Scalability)**

#### 水平擴展設計
- **模組化架構**: 每個組件都可獨立擴展或替換
- **智能體池**: 支援動態添加新的專業智能體
- **範本系統**: VibeCoding 範本可根據需求擴展

#### 垂直擴展設計
- **分層架構**: TaskMaster → Hub → Spokes 清晰分層
- **資源管理**: 智能分配計算資源給不同智能體
- **快取優化**: 範本和狀態快取減少重複載入

### 2. **可靠性 (Reliability)**

#### 容錯機制
```javascript
// 智能體調用容錯設計
class HubController {
    async callAgentWithFallback(agentType, task) {
        try {
            return await this.callPrimaryAgent(agentType, task);
        } catch (error) {
            console.warn(`Primary agent failed: ${error.message}`);
            return await this.callFallbackAgent('general-purpose', task);
        }
    }
}
```

#### 狀態一致性保證
- **原子操作**: WBS 狀態更新使用原子操作
- **事務回滾**: 失敗時自動回滾到前一個穩定狀態
- **定期備份**: 定時備份專案狀態和配置

### 3. **性能優化 (Performance)**

#### 響應時間優化
- **異步處理**: 所有智能體調用都是異步的
- **並行執行**: Hub 可同時協調多個智能體
- **預測載入**: 基於任務序列預先載入可能需要的範本

#### 資源使用優化
```javascript
// 記憶體優化的範本管理
class VibeCodingBridge {
    constructor() {
        this.templateCache = new LRU(10);  // 最多快取 10 個範本
        this.loadTimeouts = new Map();     // 載入超時管理
    }

    async loadTemplate(templateName, maxCacheTime = 300000) {
        // 智能快取管理，5分鐘後清理未使用範本
    }
}
```

### 4. **安全性 (Security)**

#### 人類控制機制
- **決策確認**: 所有重要操作都需要人類確認
- **權限控制**: 智能體只能執行被明確授權的操作
- **透明執行**: 所有智能體操作都有完整日誌

#### 資料保護
- **本地存儲**: 所有敏感資料存儲在本地 `.claude/taskmaster-data/`
- **配置隔離**: 每個專案的配置完全隔離
- **無外部依賴**: 核心功能不依賴外部服務

### 5. **可維護性 (Maintainability)**

#### 模組化設計
```javascript
// 清晰的責任分離
class TaskMaster {
    // 單一責任：協調各個組件
}

class HumanTaskManager {
    // 單一責任：處理人類決策接口
}

class HubController {
    // 單一責任：Hub 智能分析和協調
}
```

#### 文檔系統
- **完整文檔**: 8 個層次的文檔系統，涵蓋所有使用場景
- **自動生成**: 部分文檔可基於系統狀態自動生成
- **版本控制**: 所有配置和狀態都有版本記錄

### 6. **用戶體驗 (User Experience)**

#### 人類駕駛員體驗
- **直觀控制**: 簡單明確的 8 個斜線命令
- **即時回饋**: 所有操作都有即時狀態回饋
- **錯誤恢復**: 提供清晰的錯誤訊息和恢復建議

#### 學習曲線優化
- **漸進式學習**: 從基本命令到進階功能的漸進式設計
- **智能建議**: Hub 提供上下文相關的智能建議
- **安全網**: 暫停和回滾機制讓用戶放心探索

## 🌟 TaskMaster 核心優勢

### ✅ **人類中心設計**
- **🤖⚔️ 駕駛員理念**: 人類始終保持控制權，AI 只是智能副駕駛
- **🛡️ 安全控制**: 多層安全機制，隨時可暫停和手動接管
- **👁️ 完全透明**: 所有決策過程和狀態變更完全可見

### ✅ **智能協調系統**
- **🎯 Hub-and-Spoke**: 智能分析任務特性，精準匹配專業智能體
- **📋 WBS 統一管理**: 全局狀態透明，實時同步所有任務進度
- **🔄 持續優化**: 基於執行結果持續優化協調策略

### ✅ **企業級品質**
- **🎨 VibeCoding 整合**: 10 個企業級範本，涵蓋完整開發生命週期
- **🤖 專業智能體**: 7 個專業領域智能體，確保最佳實踐
- **🔍 內建品質**: Linus 開發心法，技術債務預防機制

## 🛠️ 設定與部署架構

### 1. **MCP (Model Context Protocol) 整合**

#### MCP 伺服器架構
```json
{
  "mcpServers": {
    "brave-search": {
      "功能": "智能網路搜尋",
      "用途": "查找最新技術資訊、解決方案",
      "需求": "BRAVE_API_KEY"
    },
    "context7": {
      "功能": "程式庫文檔查詢",
      "用途": "獲取任何程式庫的最新 API 文檔",
      "需求": "CONTEXT7_API_KEY"
    },
    "github": {
      "功能": "GitHub 整合",
      "用途": "管理儲存庫、PR、Issue",
      "需求": "GITHUB_PERSONAL_ACCESS_TOKEN"
    },
    "playwright": {
      "功能": "瀏覽器自動化",
      "用途": "E2E 測試、UI 驗證",
      "需求": "無需 API 金鑰"
    }
  }
}
```

#### Claude Code 權限設定架構
- **權限分層**: allow、deny、ask 三層權限控制
- **工具白名單**: 精確控制可使用的工具和參數
- **Hook 整合**: 會話級別的事件處理機制
- **MCP 伺服器啟用**: 動態啟用/停用 MCP 伺服器

### 2. **Hook 事件系統架構**

```bash
# Hook 觸發流程
SessionStart → 偵測 CLAUDE_TEMPLATE.md → 自動初始化提示
    ↓
UserPromptSubmit → 解析指令 → TaskMaster 命令處理
    ↓
PreToolUse → 工具使用前檢查 → 權限驗證
    ↓
PostToolUse → 工具使用後處理 → 狀態更新
```

### 3. **設定檔案範本系統**

#### 安全模板機制
- **範本檔案**: `.mcp.json.template`, `settings.local.json.template`
- **佔位符系統**: `[YOUR_API_KEY]` 格式避免意外提交
- **自動檢測**: Git ignore 自動排除包含真實 API 金鑰的設定檔
- **設定指南**: 完整的 `MCP_SETUP_GUIDE.md` 引導使用者設定

#### 使用者設定流程
1. 複製範本檔案
2. 取得各服務 API 金鑰
3. 替換範本中的佔位符
4. 驗證設定 (`claude doctor`)

### 4. **資料持久化架構**

```
.claude/taskmaster-data/
├── project.json           # 專案配置
│   ├── projectName
│   ├── description
│   ├── technologies
│   ├── vbCodingAnswers   # VibeCoding 7問回答
│   ├── tasks[]           # 任務列表
│   └── hubAnalysis       # Hub 分析結果
│
└── wbs-todos.json        # WBS Todo 統一狀態
    ├── projectContext
    ├── currentTask
    ├── todos[]           # 任務狀態追蹤
    └── lastUpdated
```

---

## 🚀 **TaskMaster - 重新定義人機協作開發**

**准备好掌控您的開發工作流程了嗎？TaskMaster 讓您成為真正的開發駕駛員！** 🤖⚔️

### 📋 **快速開始檢查清單**

1. ✅ **設定 MCP 服務**: 參考 `MCP_SETUP_GUIDE.md` 配置 API 金鑰
2. ✅ **檢查權限**: 確認 `.claude/settings.local.json` 權限設定
3. ✅ **驗證安裝**: 執行 `claude doctor` 檢查所有服務狀態
4. ✅ **啟動專案**: 偵測到 `CLAUDE_TEMPLATE.md` 時會自動提示初始化
5. ✅ **開始協作**: 使用 `/task-init [專案名稱]` 開始智能協作開發

### 🎯 **核心價值承諾**
- **🤖⚔️ 人類駕駛員**: 完全掌控開發決策權
- **📋 透明管理**: WBS Todo List 全局狀態可見
- **🎨 企業品質**: VibeCoding 範本確保最佳實踐
- **🔧 即用即上手**: 完整設定指南和範本系統