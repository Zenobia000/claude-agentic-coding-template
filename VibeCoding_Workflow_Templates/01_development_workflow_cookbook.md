# 開發流程總覽手冊 (Development Workflow Cookbook)

---

**文件版本 (Document Version):** `v1.0`
**最後更新 (Last Updated):** `YYYY-MM-DD`
**主要作者 (Lead Author):** `[VibeCoding AI]`
**狀態 (Status):** `活躍 (Active)`

---

## 目錄 (Table of Contents)

- [開發流程總覽手冊 (Development Workflow Cookbook)](#開發流程總覽手冊-development-workflow-cookbook)
  - [目錄 (Table of Contents)](#目錄-table-of-contents)
  - [Ⅰ. 核心理念：從商業價值到高品質程式碼](#ⅰ-核心理念從商業價值到高品質程式碼)
  - [Ⅱ. 開發階段與文件產出](#ⅱ-開發階段與文件產出)
    - [**第一階段：規劃 (Planning) - 定義「為何」與「什麼」**](#第一階段規劃-planning---定義為何與什麼)
    - [**第二階段：設計 (Design) - 定義「如何」的藍圖**](#第二階段設計-design---定義如何的藍圖)
    - [**第三階段：開發 (Development) - 精確實現**](#第三階段開發-development---精確實現)
    - [**第四階段：品質與部署 (Quality \& Deployment)**](#第四階段品質與部署-quality--deployment)
  - [Ⅲ. 支援文件](#ⅲ-支援文件)

---

## Ⅰ. 核心理念：從商業價值到高品質程式碼

**目的**: 本手冊旨在提供一個頂層指導，說明整個開發流程的各個階段、目標，並作為導航中心，連結到所有相關的文件範本。

本開發流程旨在建立一個從商業需求到高品質程式碼的完整、可追溯的鏈路。我們融合 BDD (行為驅動開發)、DDD (領域驅動設計)、Clean Architecture (潔淨架構) 與 TDD (測試驅動開發)，形成一套以「規格」為驅動、以「測試」為驗證的現代軟體開發模型。

**推演的第一性原理:**

1.  **從「為何」到「什麼」，再到「如何」**:
    *   **為何 (Why)**: 我們為何要投入資源？這要解決什麼商業問題？
    *   **什麼 (What)**: 使用者認為「完成」的標準是什麼？
    *   **如何 (How)**: 系統與程式碼應如何被建構以實現目標？

2.  **品質內建 (Quality Built-in)**: 我們不將測試視為事後檢查，而是將其融入開發的每一步，從根本上減少錯誤。

3.  **AI 輔助就緒 (AI-Assistant Ready)**: 流程中的每一份文件都旨在產生精確、無歧義的「上下文」，為大型語言模型 (LLM) 輔助開發提供必要的「護欄」。

---

## Ⅱ. 開發階段與文件產出

本流程分為四個主要階段，每個階段都會產出關鍵文件，環環相扣，共同構成專案的完整藍圖。

### **第一階段：規劃 (Planning) - 定義「為何」與「什麼」**

**目標**: 確保開發方向從一開始就與商業價值和使用者需求對齊。

1.  **[專案簡報與產品需求 (PRD)](./VibeCoding_Workflow_Templates/00_project_brief_prd_summary_template.md)**
    *   **目的**: 定義專案的「為何」與「為誰」，設定最高層次的目標和邊界。
    *   **產出**: 一份清晰的 PRD 文件，包含商業目標、使用者故事、成功指標以及範圍限制。

2.  **[行為驅動情境 (BDD Scenarios)](./VibeCoding_Workflow_Templates/docs/02_bdd_scenarios_guide.md)** `(待建立)`
    *   **目的**: 將 PRD 中的使用者故事轉化為精確、無歧義的自然語言規格，作為連接業務與技術的橋樑。
    *   **產出**: `.feature` 檔案，其中包含使用 Gherkin 語法描述的 `Given-When-Then` 情境。

### **第二階段：設計 (Design) - 定義「如何」的藍圖**

**目標**: 將業務需求轉化為穩固、可擴展的技術藍圖，避免系統演變成難以維護的「大泥球」。

3.  **[架構與設計文檔 (SAD & SDD)](./VibeCoding_Workflow_Templates/02_system_architecture_document_template.md)**
    *   **目的**: 建立系統的結構（架構）並填充具體的實現細節（設計）。
    *   **產出**: 一份整合性的設計文檔，包含 C4 模型、DDD 戰略設計、Clean Architecture 分層，並連結至：
        *   **[架構決策記錄 (ADR)](./VibeCoding_Workflow_Templates/01_adr_template.md)**
        *   **[API 設計規格](./VibeCoding_Workflow_Templates/04_api_design_specification_template.md)**

### **第三階段：開發 (Development) - 精確實現**

**目標**: 透過 TDD 和契約式設計，確保每一個程式碼單元都被精確、健壯地實現。

4.  **[模組規格與測試](./VibeCoding_Workflow_Templates/docs/04_module_specification_and_tests.md)** `(待建立)`
    *   **目的**: 將高層次的 BDD 情境分解到具體的模組或類別層級，並使用契約式設計 (DbC) 來精確定義其職責邊界。
    *   **產出**: 模組規格文件，包含詳細的測試情境與函式契約（前置/後置條件、不變性）。

### **第四階段：品質與部署 (Quality & Deployment)**

**目標**: 確保專案在交付前符合安全、隱私與生產環境的標準。

5.  **[安全與上線檢查清單](./VibeCoding_Workflow_Templates/05_security_privacy_review_checklist_template.md)**
    *   **目的**: 在設計階段與部署前進行全面的審查。
    *   **產出**: 已完成的檢查清單，確保所有項目均已達標。

---

## Ⅲ. 支援文件

*   **[專案結構指南](./VibeCoding_Workflow_Templates/07_project_structure_template.md)**: 提供標準化的專案目錄結構，確保所有專案的一致性。
