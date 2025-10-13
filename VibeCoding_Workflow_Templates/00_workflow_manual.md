# 產品開發流程使用說明書 (Dual-Mode: Full Process / Lean MVP)

---

**文件版本 (Document Version):** `v2.0`
**最後更新 (Last Updated):** `YYYY-MM-DD`
**主要作者 (Lead Author):** `[VibeCoding AI]`
**狀態 (Status):** `活躍 (Active)`

---

## 目錄 (Table of Contents)

- [1. 使用原則](#1-使用原則適用於兩種模式)
- [2. 模式選擇建議與升級規則](#2-模式選擇建議與升級規則)
- [3. 模式 A：完整流程 (Full Process)](#3-模式-a完整流程-full-process)
- [4. 模式 B：MVP 快速迭代 (Lean)](#4-模式-b-mvp-快速迭代-lean)
- [5. 文檔產出清單與模板映射](#5-文檔產出清單與模板映射)
- [6. Gate 準入/準出與度量](#6-gate-準入準出與度量兩種模式通用)
- [7. 附錄：檢查清單（摘錄）](#7-附錄檢查清單摘錄)
- [8. MVP 產出與格式規範](#8-mvp-產出與格式規範對齊-mvp_tech_specmd-與-development_progress_reportmd)

---

## 1. 使用原則（適用於兩種模式）

- **以文檔為契約**：所有決策以文檔為單一事實來源（SSOT）。
- **小步快跑、可回溯**：優先小批量交付，保留 ADR 以利回溯決策脈絡。
- **風險前置、代價後置**：在投入大量開發前，用審查 Gate 降低重大偏差風險。
- **模式可升降級**：MVP 模式可在風險上升/範圍擴大時升級為完整流程；完整流程在低風險子專案可降級為 MVP。

**角色縮寫（RACI）：**
- PM（產品經理）、TL（技術負責人）、ARCH（架構師）、DEV、QA、SRE、SEC（安全/隱私）、OPS、DATA

**模板路徑：**
- `VibeCoding_Workflow_Templates/01_development_workflow_cookbook.md` - 開發流程指南
- `VibeCoding_Workflow_Templates/02_project_brief_and_prd.md` - 專案簡報與 PRD
- `VibeCoding_Workflow_Templates/03_behavior_driven_development_guide.md` - BDD 指南
- `VibeCoding_Workflow_Templates/04_architecture_decision_record_template.md` - ADR 模板
- `VibeCoding_Workflow_Templates/05_architecture_and_design_document.md` - 架構與設計文檔
- `VibeCoding_Workflow_Templates/06_api_design_specification.md` - API 設計規範
- `VibeCoding_Workflow_Templates/07_module_specification_and_tests.md` - 模組規格與測試
- `VibeCoding_Workflow_Templates/08_project_structure_guide.md` - 專案結構指南
- `VibeCoding_Workflow_Templates/13_security_and_readiness_checklists.md` - 安全與上線檢查
- `VibeCoding_Workflow_Templates/14_deployment_and_operations_guide.md` - 部署與運維指南

---

## 2. 模式選擇建議與升級規則

- 建議使用完整流程若：涉及金流/法遵/隱私資料、高可用與規模化要求、跨 3+ 團隊協作、需長期維運。
- 建議使用 MVP 若：需快速驗證價值假設、時間/預算有限、功能邊界清晰、可容忍較高風險與手動運維。
- 升級準則（MVP -> 完整）：任一事件觸發升級：
  - 觸及敏感資料或外部合規約束
  - 月活/交易量預估超過既有閾值（例如 DAU > 10k 或 TPS > 100）
  - 引入新服務/資料庫/對外 API 或多團隊協作
  - 產品定位由探索性轉為核心營收/關鍵運營

---

## 3. 模式 A：完整流程（Full Process）

### A0 啟動與對齊（Kickoff）
- 目標：對齊商業目標、成功指標、邊界與風險；建立規範與節奏。
- 輸入：商業構想、既有研究、競品分析
- 產出：
  - 啟動簡報、里程碑與資源規劃
  - 文檔規範與模板鏈接、版本策略
- RACI：PM R、TL/ARCH A、各團隊 C/I
- Gate（準出）：利益相關者對里程碑/風險/溝通節奏達成共識

### A1 構想與規劃（PRD）
- 目標：定義問題、受眾、範圍、成功指標與里程碑
- 輸入：Kickoff 輸出、商業策略
- 產出：`02_project_brief_and_prd.md`
- 主要活動：價值主張、需求分解、KPI、風險與依賴
- RACI：PM R/A、TL/ARCH/QA/OPS/SRE/SEC/DATA C、DEV I
- Gate：PRD 已審核簽核；KPI 可量測且與業務對齊

### A2 高層次架構（SA + ADR）
- 目標：確立系統邊界、架構模式、技術選型、NFR；記錄關鍵決策
- 輸入：PRD、現況系統/資源盤點
- 產出：
  - `05_architecture_and_design_document.md`
  - `04_architecture_decision_record_template.md`（多份，隨決策累積）
- 主要活動：上下文/組件/部署與資料架構、設計權衡、關鍵用戶旅程
- RACI：ARCH R/A、TL R、PM/SRE/SEC/OPS C、DEV/QA I
- Gate：核心 ADR 齊備且權衡明確；NFR 可被驗證；風險與緩解策略明列

### A3 詳細設計（SDD + API）
- 目標：把 SA 轉化為可實作規格與契約
- 輸入：SA、ADR、資料字典
- 產出：
  - `07_module_specification_and_tests.md`
  - `06_api_design_specification.md`
  - `08_project_structure_guide.md`
- 主要活動：資料模型與索引策略、內外部介面、流程圖、錯誤與可觀測性方案
- RACI：TL R/A、DEV/ARCH R、QA/SRE/SEC C、PM I
- Gate：介面契約穩定、測試策略完整、回滾與相容性考量完備

### A4 開發與驗證（Build & Verify）
- 目標：可交付、可測試、可回滾的增量交付
- 輸入：SDD、API Spec、Backlog
- 產出：程式碼、測試、建置產物、變更紀錄
- 主要活動：CI/CD、單元/整合/E2E 測試、性能預檢、資安依賴掃描
- RACI：DEV R、TL/QA A、SRE/SEC/OPS C、PM I
- Gate：測試綠燈、Coverage 達標、性能/資安閾值過關

### A5 安全與上線審查 (Quality Gate)
- 目標：在上線前消除高風險弱點、隱私風險並確保生產就緒。
- 輸入：SA/SDD/API、風險登記、掃描報告
- 產出：`13_security_and_readiness_checklists.md`（完成的審查清單與整改項）
- RACI：SEC/SRE R/A、TL/DEV C、PM I
- Gate：高/中風險已整改或有替代方案；威脅模型、資料保護與可觀測性措施完備。

### A6 上線 (Launch)
- 目標：確保可靠性、可觀測性、運維準備就緒
- 輸入：運維手冊、監控儀表板、回滾計畫、災難演練結果
- 產出：Go/No-Go 簽核
- RACI：SRE/OPS R/A、TL/DEV/QA/SEC C、PM I
- Gate：SLO/Alert 就緒；回滾與備援演練通過；Go/No-Go 簽核

### A* 跨階段：變更管理與文件治理
- 變更需更新 ADR 與相依文檔；重大變更需重過 Gate。
- 文檔版本策略：語義化版本 + 變更日誌；關聯 PR/Issue。

```mermaid
graph TD
  A0[Kickoff]-->A1[PRD]
  A1-->A2[Architecture & Design]
  A2-->A3[Module Spec & API]
  A3-->A4[Build & Verify]
  A4-->A5[Quality Gate]
  A5-->A6[Launch]
  class A1,A2,A3,A5,A6 stage;
  classDef stage fill:#e6f3ff,stroke:#333,stroke-width:1px;
```

---

## 4. 模式 B：MVP 快速迭代（Lean）

### B0 Sprint 0：範圍界定與 Tech Spec
- 目標：最小可行閉環、最快驗證路徑
- 輸入：商業假設、用戶洞察、限制條件
- 產出：一份輕量 `Tech Spec`（合併 PRD/SA/SDD/API 的最小集合）
- 主要內容：
  - 問題/目標用戶/成功指標（最多 3 條）
  - 高層設計一句話 + 1 張組件圖
  - 必要 API 契約（僅核心端點）
  - 1-2 張資料表 Schema
  - 風險與手動替代方案（Runbook 級）
- RACI：PM/TL R/A、DEV/QA/SRE C、其餘 I
- Gate：Tech Spec 被團隊認可；估算與時程可落地

### B1-Bn 迭代循環
- 每次迭代固定交付：可運行版本 + 指標驗證 + 回顧
- 迭代內活動：
  - 設計/實作/測試同步進行；必要時補充簡短 ADR
  - 最低限度安全檢查（Secrets、認證、輸入驗證）
  - 最低限度可觀測性（日誌、基本健康檢查）
- Gate：
  - 端到端用戶路徑可跑通
  - Bug/風險在可接受閾值內
  - 指標達成或產生明確學習（可迭代調整）

### Bx MVP 上線 Gate
- 條件：
  - 有最小可運營 Runbook（部署、監控、回滾步驟）
  - 數據備份已啟用；關鍵日誌可查
  - 風險與債務列入後續 Backlog 與升級評估

```mermaid
graph TD
  B0[Tech Spec]-->B1[Iter 1]
  B1-->|Learn|B2[Iter 2]
  B2-->|Learn|Bn[Iter n]
  Bn-->|Gate|BL[Light Launch]
  class B0,B1,B2,Bn,BL stage;
  classDef stage fill:#d5f5e3,stroke:#333,stroke-width:1px;
```

升級提示：出現「敏感資料/規模擴大/跨團隊/合規」任一情形，即刻評估升級至「完整流程」。

---

## 5. 文檔產出清單與模板映射

| 階段 | 模式 A（完整） | 模式 B（MVP） |
| :-- | :-- | :-- |
| 啟動 | Kickoff 簡報、里程碑 | 迭代計畫草案 |
| 規劃 | `02_project_brief_and_prd.md` | Tech Spec 的 PRD 區塊 |
| 架構與設計 | `05_architecture_and_design_document.md`、`04_architecture_decision_record_template.md` | Tech Spec 的 SA/ADR 區塊 |
| 規格與開發 | `07_module_specification_and_tests.md`、`06_api_design_specification.md` | Tech Spec 的 SDD/API 區塊 |
| 品質保證 | `13_security_and_readiness_checklists.md` | 簡化安全與上線檢查清單 |
| 結構規範 | `08_project_structure_guide.md` | Tech Spec 的結構區塊 |

---

## 6. Gate 準入/準出與度量（兩種模式通用）

- 準入（每階段必備）：輸入文檔完整性、角色對齊、風險已登記
- 準出（才能進下一階段）：產出文檔完成度 ≥ 90%、審查簽核、關鍵指標可驗證
- 共同度量：
  - 需求穩定度（變更率）、缺陷密度、交付節奏（Lead Time / Cycle Time）
  - 上線後 SLO 達成率、回滾頻次、事故 MTTR

---

## 7. 附錄：檢查清單（摘錄）

- PRD：是否有明確的問題陳述、非目標、量化 KPI？
- 架構：是否記錄權衡與 ADR？NFR 是否可測？
- 設計：資料模型/索引、API 契約、錯誤處理、可觀測性是否具體？
- 安全：Secrets 管理、認證授權、輸入驗證、依賴風險是否已覆蓋？
- 上線：備份、監控、告警、回滾方案與演練是否到位？

---

本文件可作為評審與交付的「操作指南」。若無特別說明，預設採「模式 A：完整流程」，並允許在子模組/探索階段採用「模式 B：MVP」，但需明確標注並保留升級機制。

---

## 8. MVP 產出與格式規範

> **核心原則：** 為確保 MVP 階段的速度與品質，文件產出將精簡為三份核心文件。本節範本為強制性規範，旨在確保規劃、執行與上線之間的一致性，並作為 LLM 生成程式碼時最關鍵的上下文。

### 8.1 核心文件總覽 (Core MVP Documents)

| 文件 (File) | 目的 (Purpose) | 主要負責人 (Owner) |
| :--- | :--- | :--- |
| `docs/planning/mvp_tech_spec.md` | 定義 MVP 的「做什麼」與「如何做」，是開發的唯一契約。 | TL / PM |
| `docs/dev/development_progress_report.md` | 透明化開發進度、風險與指標，是團隊同步與決策的依據。 | TL / DEV |
| `docs/launch/mvp_launch_checklist.md` | 確保上線前的最小品質與運維準備，是發布的最後門禁。 | SRE / OPS / TL |

### 8.2 通用規範 (General Specifications)

#### 8.2.1 命名與路徑 (Naming & Location)
- 所有 MVP 文件 **必須 (MUST)** 存放於上述指定路徑。
- 檔名 **必須 (MUST)** 使用 `kebab-case` 格式 (例如 `mvp-tech-spec.md`)。

#### 8.2.2 文件標頭 (Metadata Header)
- 每份文件開頭 **必須 (MUST)** 包含中繼資料標頭，以利追蹤。
- **範本:**
  ```markdown
  > Version: 1.0.0
  > Date: YYYY-MM-DD
  > Status: Draft | Active | Deprecated
  > Owner(s): [姓名 (角色)]
  > Reviewers: [姓名 (角色)]
  ```

#### 8.2.3 一致性規則 (Consistency Rules)
- **章節順序固定：** 文件內的章節順序 **不應 (SHOULD NOT)** 隨意更動。
- **格式統一：** API 契約與 Schema **必須 (MUST)** 在單一文件中風格一致 (擇一呈現)。
- **命名一致：** 指標/KPI 名稱 **必須 (MUST)** 在所有文件中保持一致 (例如，統一使用 `API Response Time`)。

#### 8.2.4 版本與變更治理 (Versioning & Governance)
- 版本號 **必須 (MUST)** 遵循語義化版本（MAJOR.MINOR.PATCH）。
- Git 提交紀錄 **應 (SHOULD)** 包含簡短的變更摘要。
- 涉及重大設計權衡的變更 **必須 (MUST)** 建立或更新對應的 ADR。

---

### 8.3 文件結構範本 (Document Structure & Skeletons)

此處提供三份核心文件的結構、驗收標準 (DoD) 與骨架，可直接複製使用。

#### 8.3.1 `mvp_tech_spec.md` - MVP 技術規格

> **目的：** 作為開發與審查的唯一契約。若與其他文檔衝突，以此為準。

- **必要章節 (Required Sections):**
  1.  `問題陳述與目標用戶` (Problem & Users)
  2.  `高層設計` (High-Level Design)
  3.  `必要 API 契約` (API Contracts)
  4.  `資料表 Schema` (Data Schema)
  5.  `前端範圍與路由` (Frontend Scope & Routes)
  6.  `風險與手動替代方案` (Risks & Mitigations)
  7.  `部署與監控` (Deployment & Monitoring)
  8.  `Gate 通過標準` (Go-Live Criteria)

- **驗收標準 (Definition of Done):**
  - [ ] KPI ≤ 3 且可量測。
  - [ ] 核心 API 與 Schema 完整且相互對齊。
  - [ ] 前端頁面/路由與其依賴的 API 已清楚對應。
  - [ ] 風險表已包含可行的手動替代或回退方案。
  - [ ] Gate 條件為客觀、可驗證的指標。

- **骨架 (Skeleton):**
  ```markdown
  # [專案名稱] - MVP Tech Spec
  > Version: 1.0.0
  > Date: YYYY-MM-DD
  > Status: Draft
  > Owner(s): [姓名 (角色)]

  ## 1. 問題陳述與目標用戶
  - **核心問題:** ...
  - **目標用戶:** ...
  - **成功指標 (KPIs):** 1. ... 2. ... 3. ...

  ## 2. 高層設計
  - **一句話架構:** ...
  - **組件圖:**
    ```mermaid
    graph TD
      A --> B
    ```

  ## 3. 必要 API 契約
  | 方法 | 路徑 | 說明 | 請求 | 回應 | 錯誤碼 |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | POST | /api/assessment/... | ...  | ...  | ...  | 4xx/5xx |

  ## 4. 資料表 Schema
  ```sql
  CREATE TABLE ...
  ```

  ## 5. 前端範圍與路由
  | 頁面/路由 | 依賴 API | 核心組件 |
  | :--- | :--- | :--- |
  | /login | `POST /api/privacy/auth` | `LoginForm` |

  ## 6. 風險與手動替代方案
  | 風險分類 | 描述 | 替代/回退方案 |
  | :--- | :--- | :--- |
  | 技術 | ... | ... |

  ## 7. 部署與監控
  - **部署:** ...
  - **監控:** ...

  ## 8. Gate 通過標準
  - ...
  ```

#### 8.3.2 `development_progress_report.md` - 開發進度報告

> **目的：** 對齊迭代節奏與交付透明度，為跨職能決策提供依據。

- **必要章節 (Required Sections):**
  1. `總體進度概覽` (Overall Progress)
  2. `開發進度時間軸 (Gantt)` (Timeline)
  3. `功能開發狀態` (Feature Status)
  4. `前端開發進度` (Frontend Progress)
  5. `關鍵技術指標` (Key Metrics)
  6. `下階段重點` (Next Steps)
  7. `技術債務與風險` (Risks & Tech Debt)
  8. `成功指標追蹤 (KPIs)` (KPI Tracking)

- **驗收標準 (Definition of Done):**
  - [ ] 每週或每個迭代至少更新一次。
  - [ ] 甘特圖時間軸與里程碑一致。
  - [ ] 指標欄位有具體數值或標示為 `N/A`。
  - [ ] 前端進度與 `mvp_tech_spec.md` 中的 API 依賴對齊。

- **骨架 (Skeleton):**
  ```markdown
  # [專案名稱] - 開發進度報告
  > 更新日期: YYYY-MM-DD
  > 開發狀態: In Progress
  > 完成度: XX%
  > Iteration: N

  ## 📊 總體進度概覽
  - **當前里程碑:** ...
  - **實際進度:** ...

  ## 📈 開發進度時間軸
  ```mermaid
  gantt
    ...
  ```

  ## ✅ 功能開發狀態 (已完成 / 開發中 / 待辦)
  - ...

  ## 🖥️ 前端開發進度
  - ...

  ## 📊 關鍵技術指標
  | 指標 | 當前值 | 目標值 |
  | :--- | :--- | :--- |
  | API Response Time | 120ms | < 200ms |

  ## 🎯 下階段開發重點
  - ...

  ## ⚠️ 技術債務與風險
  - ...

  ## 📈 成功指標追蹤 (KPIs)
  - ...
  ```

#### 8.3.3 `mvp_launch_checklist.md` - MVP 輕量上線檢查清單

> **目的：** 確保 MVP 上線前的最小品質與運維準備就緒，作為 Go/No-Go 的最終決策依據。

- **必要條目 (Required Items):**
  - **[ ] 備份 (Backup):** 資料庫與檔案系統的自動備份策略已啟用並驗證。
  - **[ ] 監控 (Monitoring):** `/health` 健康檢查端點可用，核心錯誤日誌已接入告警系統。
  - **[ ] 運維 (Operations):** 標準部署與回滾流程已寫入 `Runbook` 並完成演練。
  - **[ ] 風險 (Risk):** 已知風險的手動替代方案已通知相關運維與客服團隊。
  - **[ ] 安全 (Security):** 所有 `Secrets` (密碼、API Key) 已從程式碼中移除，並由配置中心管理。
