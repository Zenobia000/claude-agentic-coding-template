---
description: TaskMaster project initialization - Auto-triggered by CLAUDE_TEMPLATE.md
argument-hint: [project-name]
allowed-tools: Read(/**), Write(/**), Edit(/**), Bash(*), Glob(*), Grep(*)
---

# 🚀 TaskMaster Project Initialization

## 🎯 自動觸發流程

**當 Claude Code 偵測到 CLAUDE_TEMPLATE.md 時，會自動執行以下流程：**

### Step 1: 顯示模板資訊
```
🎯 模板作者：Sunny | v2.0 - 人類主導版
📺 教學影片：youtube
🤖 TaskMaster 功能：人類主導的文檔導向智能協作開發平台
```

### Step 2: 詢問使用者
```
❓ 我偵測到一個 TaskMaster 專案範本。
   您想要我初始化一個智能協作專案嗎？

   [是] → 執行 /task-init 初始化工作流程
   [否] → 保留 CLAUDE_TEMPLATE.md 供日後使用
```

### Step 3: 如果使用者同意，自動執行初始化

## 📋 完整初始化工作流程

### Phase 1: 人類主導的基礎澄清 👨‍💻

**Claude Code 直接與人類對話**

#### 快速資訊收集
```
1. "您的專案名稱是什麼？" → [PROJECT_NAME]
2. "專案的簡要描述？" → [PROJECT_DESCRIPTION]
3. "主要程式語言？" (Python/JavaScript/TypeScript/Java/其他)
4. "是否設定 GitHub 儲存庫？" (是-新增/是-現有/否)
```

### Phase 2: VibeCoding 7問快速澄清

**必須完整執行的七個關鍵問題：**

#### 🎯 問題 1: 核心問題定義
```
這個專案主要解決什麼問題？請詳細描述：
- 目前的痛點是什麼？
- 誰會遇到這個問題？
- 為什麼現有方案無法滿足？

範例回答：
"目前團隊在管理多個微服務時，缺乏統一的監控和日誌管理平台，
導致問題排查效率低下，需要一個整合式的觀測平台。"
```

#### 🎯 問題 2: 核心功能範圍
```
請列出 3-5 個最重要的功能需求：
1. [核心功能 1]
2. [核心功能 2]
3. [核心功能 3]
4. [可選功能 4]
5. [可選功能 5]

範例：
1. 即時日誌聚合和搜索
2. 性能指標監控和警報
3. 服務依賴關係可視化
4. 異常檢測和根因分析
5. 自定義儀表板
```

#### 🎯 問題 3: 技術偏好和約束
```
技術選型和限制條件：
- 偏好的技術棧：[語言/框架/資料庫]
- 必須整合的系統：[現有系統/API]
- 技術限制：[效能/安全/合規要求]
- 部署環境：[雲端/本地/混合]

範例：
"必須使用 Python/FastAPI，需要整合現有的 Elasticsearch，
要符合 GDPR 合規要求，部署在 AWS EKS 上。"
```

#### 🎯 問題 4: 用戶體驗期望
```
期望的使用體驗：
- 主要用戶群體：[開發者/運維/業務人員]
- 介面類型：[Web/CLI/API/Mobile]
- 易用性要求：[專業級/一般用戶/零門檻]
- 關鍵用戶流程：[描述最重要的操作流程]

範例：
"主要給運維團隊使用，需要 Web 介面和 CLI 工具，
專業級工具但要有良好的視覺化，關鍵流程是快速定位問題根源。"
```

#### 🎯 問題 5: 規模和性能要求
```
系統規模和效能指標：
- 預期用戶數量：[同時在線/總用戶數]
- 數據量級：[每日數據量/存儲需求]
- 效能要求：[響應時間/吞吐量]
- 擴展性需求：[垂直/水平擴展計劃]

範例：
"支持 100 個同時在線用戶，每日處理 1TB 日誌數據，
查詢響應時間 <2秒，需要支持水平擴展。"
```

#### 🎯 問題 6: 時程和資源限制
```
專案時程和資源：
- 交付時程：[MVP/正式版本時間]
- 團隊規模：[開發人數/角色分工]
- 預算限制：[基礎設施/第三方服務]
- 維護計劃：[長期維護/一次性交付]

範例：
"需要在 3 個月內交付 MVP，2 名全職開發者，
月度雲端預算 $5000，需要長期維護和迭代。"
```

#### 🎯 問題 7: 成功標準定義
```
如何衡量專案成功：
- 技術指標：[性能/可用性/品質]
- 業務指標：[ROI/效率提升/成本節省]
- 用戶指標：[滿意度/採用率]
- 里程碑：[關鍵檢查點]

範例：
"技術上達到 99.9% 可用性，問題定位時間從平均 2 小時降到 15 分鐘，
80% 的運維團隊主動使用，3 個月內完成核心功能上線。"
```

### Phase 2.5: 🆕 自動文檔生成

**七問完成後，自動觸發 `/generate-docs`**

```
🎯 七問已完成！正在生成專案文檔...

📄 VibeCoding 範本填充中：
├── 載入 VibeCoding_Workflow_Templates/ ✅
├── 映射七問答案到範本欄位 ✅
└── 生成專案文檔...

📁 生成的文檔：
├── docs/01_PRD.md              [████████░░] 85%
├── docs/02_Architecture.md     [██████████] 100%
├── docs/03_UX_Design.md        [██████░░░░] 60%
├── docs/04_WBS.md              [████████░░] 80%
└── docs/05_Module_Spec.md      [████████░░] 75%

📊 整體完整性: 80%

🚪 審查閘道：
❓ 請審查生成的文檔：
[1] ✅ 文檔通過 - 繼續初始化
[2] 📝 需要修改 - 指定要調整的文檔
[3] 🔄 重新生成 - 補充七問答案
[4] ⏸️ 稍後審查 - 先完成初始化
```

**💡 文檔審查通過後才會進入 Phase 3**

### Phase 3: 人類確認專案設定

```
📁 推薦專案結構：[簡易型/標準型/AI-ML型] (Claude 基於回答建議)
🎛️ Subagent 建議頻率：[HIGH/MEDIUM/LOW/OFF] (可調整)
🔧 專案複雜度：[根據需求分析]
📄 文檔狀態：已生成並通過審查 ✅

❓ 確認以上設定？(y/N)
```

## 🤖 TaskMaster 智能專案初始化

### 自動執行的 TaskMaster 流程

基於七問回答，系統將：

1. **載入 VibeCoding 範本** - 基於專案類型自動選擇相關範本
2. **生成智能任務列表** - 基於範本和需求生成 WBS 任務
3. **Hub-and-Spoke 分析** - 分析專案複雜度和協調策略
4. **建立 WBS Todo List** - 統一任務狀態管理系統
5. **人類確認專案計劃** - 駕駛員最終決策

### Claude Code 執行步驟

1. **建立專案結構** (基於 TaskMaster 分析)
   ```
   ✅ 建立專案目錄結構
   ✅ 初始化 .claude/taskmaster-data/
      ├── project.json (專案配置)
      └── wbs-todos.json (WBS Todo List)
   ```

2. **生成整合式 CLAUDE.md**
   - 包含 Linus 心法 + TaskMaster 協作
   - 基於七問回答的專案特定配置
   - 智能體協作規則

3. **初始化 git 並設定基本檔案**
   ```bash
   git init
   git add .
   git commit -m "feat: initialize TaskMaster project"
   ```

4. **設定 GitHub** (如用戶選擇)
   ```bash
   gh repo create [project-name] --public --confirm
   git remote add origin [url]
   git push -u origin main
   ```

5. **刪除 CLAUDE_TEMPLATE.md**
   ```bash
   rm CLAUDE_TEMPLATE.md
   echo "✅ 模板檔案已刪除，專案初始化完成"
   ```

## 📊 文檔導向的任務流程

### Phase 2.5: VibeCoding 文檔生成（自動）

**觸發條件**: 七問完成後自動執行 `/generate-docs`

```
📄 VibeCoding 範本 → 專案文檔：

VibeCoding_Workflow_Templates/          docs/
├── 02_project_brief_and_prd.md    →   ├── 01_PRD.md
├── 05_architecture_and_design.md  →   ├── 02_Architecture.md
├── 17_frontend_ia_template.md     →   ├── 03_UX_Design.md
├── 16_wbs_development_plan.md     →   ├── 04_WBS.md
├── 07_module_specification.md     →   ├── 05_Module_Spec.md
└── 06_api_design_specification.md →   └── 06_API_Spec.md
```

### 七問→文檔映射

| 七問 | 主要填充文檔 |
|------|-------------|
| Q1 核心問題 | 01_PRD.md |
| Q2 核心功能 | 01_PRD.md, 05_Module_Spec.md |
| Q3 技術偏好 | 02_Architecture.md |
| Q4 用戶體驗 | 03_UX_Design.md |
| Q5 規模性能 | 02_Architecture.md |
| Q6 時程資源 | 04_WBS.md |
| Q7 成功標準 | 01_PRD.md, 04_WBS.md |

### 審查閘道
```
🚪 駕駛員文檔審查檢查點：
├── 文檔必須經過人類審查
├── 審查通過後才能進入 Phase 3 開發
├── 可以要求修改或重新生成文檔
└── 使用 /generate-docs 隨時更新
```

### Phase 3: 開發實作階段
```
🔨 開發任務（文檔審查通過後）：
├── 環境設置和專案初始化
├── 核心功能模組開發
├── API 端點實作
├── 前端介面開發（如需要）
├── 測試編寫和執行
└── 部署和監控設置
```

## 🎯 TaskMaster 控制中心

初始化完成後，立即可用的功能：

```
📋 TaskMaster 控制中心已啟用:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎛️ 立即可用命令:
├── /task-status     → 查看完整專案狀態
├── /task-next       → 獲得下個智能任務建議
├── /hub-delegate    → Hub 協調智能體委派
├── /suggest-mode    → 調整 TaskMaster 模式
└── /review-code     → Hub 協調程式碼審查

📊 WBS Todo List 已建立:
├── 📋 總任務: [根據專案計算]
├── ⏳ 待處理: [待處理數量]
├── 🎯 當前: 準備開始第一個任務
└── 📈 進度: 0% (初始化完成)

💡 建議下一步:
1. 使用 /task-next 開始第一個任務
2. 使用 /task-status 查看詳細狀態
3. 隨時可用 /pause 暫停 TaskMaster
```

## ⚠️ 重要注意事項

1. **必須完成七問** - 不允許跳過任何問題
2. **文檔優先** - Phase 1-2 必須先生成文檔
3. **人類審查** - 文檔必須經過駕駛員審查
4. **保持控制** - 所有重要決策由人類做出

## 🚀 使用方式

### 標準觸發流程
1. Claude Code 偵測到 CLAUDE_TEMPLATE.md
2. 顯示模板資訊並詢問使用者
3. 使用者確認後自動執行 `/task-init [project-name]`
4. 完成七問澄清流程
5. 生成文檔和任務
6. 建立 TaskMaster 系統
7. 刪除 CLAUDE_TEMPLATE.md

### 手動執行
```bash
# 如果需要手動執行初始化
/task-init my-project
```

## ✅ 預期結果

完成初始化後，您將獲得：
1. **完整的專案結構** - 基於專案類型建立
2. **客製化 CLAUDE.md** - 包含專案特定規則
3. **專案文檔** - PRD、架構、API 等文檔
4. **WBS Todo List** - 完整的任務管理系統
5. **Git/GitHub 設置** - 版本控制就緒

---

**Ready to initialize your TaskMaster-powered project!** 🚀🤖⚔️