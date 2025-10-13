# 模組依賴關係分析 (Module Dependency Analysis) - [專案/服務名稱]

---

**文件版本 (Document Version):** `v1.1`

**最後更新 (Last Updated):** `YYYY-MM-DD`

**主要作者 (Lead Author):** `[請填寫]`

**審核者 (Reviewers):** `[列出主要審核人員/團隊]`

**狀態 (Status):** `[例如：草稿 (Draft), 審核中 (In Review), 已批准 (Approved)]`

---

## 目錄 (Table of Contents)

1.  [概述 (Overview)](#1-概述-overview)
2.  [核心依賴原則 (Core Dependency Principles)](#2-核心依賴原則-core-dependency-principles)
3.  [高層級模組依賴 (High-Level Module Dependencies)](#3-高層級模組依賴-high-level-module-dependencies)
4.  [模組/層級職責定義 (Module/Layer Responsibility Definition)](#4-模組層級職責定義-modulelayer-responsibility-definition)
5.  [關鍵依賴路徑分析 (Key Dependency Path Analysis)](#5-關鍵依賴路徑分析-key-dependency-path-analysis)
6.  [依賴風險與管理 (Dependency Risks and Management)](#6-依賴風險與管理-dependency-risks-and-management)
7.  [外部依賴管理 (External Dependency Management)](#7-外部依賴管理-external-dependency-management)

---

## 1. 概述 (Overview)

### 1.1 文檔目的 (Document Purpose)
*   本文檔旨在分析和定義 **[專案/服務名稱]** 的內部模組與外部套件之間的依賴關係。
*   其目的不僅是記錄現狀，更是為了指導開發，確保專案遵循健康的依賴結構，以提升代碼的可維護性、可測試性和可擴展性。
*   本文檔是程式碼審查 (Code Review) 和架構決策的重要參考依據。

### 1.2 分析範圍 (Analysis Scope)
*   **分析層級**: `[例如：模組級 (Module-level)、套件級 (Package-level)]`
*   **包含範圍**: `[例如：應用程式原始碼內部依賴、對外部函式庫的依賴]`
*   **排除項目**: `[例如：標準庫、開發工具、測試專用依賴]`

---

## 2. 核心依賴原則 (Core Dependency Principles)

本專案遵循以下核心原則來管理依賴關係，確保系統的長期健康。

*   **依賴倒置原則 (Dependency Inversion Principle - DIP):**
    *   **定義:** 高層模組不應依賴於低層模組，兩者都應依賴於抽象（例如介面或抽象類別）。抽象不應依賴於細節，細節應依賴於抽象。
    *   **實踐:** 業務邏輯（應用層、領域層）應定義其需要的介面，而基礎設施層（如資料庫、外部 API 客戶端）則提供這些介面的具體實現。這使得核心業務邏輯與具體的技術實現解耦。

*   **無循環依賴原則 (Acyclic Dependencies Principle - ADP):**
    *   **定義:** 在模組依賴關係圖中，不應存在任何循環。依賴關係必須是單向的，形成一個有向無環圖 (DAG)。
    *   **實踐:** 嚴格禁止模組間的雙向 `import`。例如，`module_a.py` 導入 `module_b.py`，則 `module_b.py` 絕不能直接或間接導入 `module_a.py`。

*   **穩定依賴原則 (Stable Dependencies Principle - SDP):**
    *   **定義:** 依賴關係應朝著更穩定的方向進行。一個模組不應該依賴於比自己更不穩定的模組。
    *   **實踐:** 核心領域模型和業務規則（最穩定）不應依賴於經常變動的 UI 或基礎設施代碼（最不穩定）。

---

## 3. 高層級模組依賴 (High-Level Module Dependencies)

### 3.1 架構分層依賴圖 (Layered Architecture Dependency Diagram)

此圖展示了系統的主要架構層級及其單向依賴關係。

```mermaid
graph TD
    subgraph "外部基礎設施 (External Infrastructure)"
        direction LR
        Database[(Database)]
        ExternalAPI[External API]
        MessageQueue{Message Queue}
    end

    subgraph "應用程式 (Application)"
        direction BT
        A[介面層 (Presentation Layer)]
        B[應用層 (Application Layer)]
        C[領域層 (Domain Layer)]
        D[基礎設施層 (Infrastructure Layer)]
    end

    A -- "調用 (invokes)" --> B
    B -- "使用 (uses)" --> C
    B -- "依賴介面 (depends on interfaces defined in Domain)" --> D
    D -- "實現介面 (implements interfaces)" --> C
    D -- "訪問 (accesses)" --> Database
    D -- "請求 (requests)" --> ExternalAPI
    D -- "發布/訂閱 (pub/sub)" --> MessageQueue

    classDef presentation fill:#e3f2fd,stroke:#333
    classDef application fill:#f3e5f5,stroke:#333
    classDef domain fill:#fff3e0,stroke:#333
    classDef infrastructure fill:#e8f5e9,stroke:#333
    classDef external fill:#f1f8e9,stroke:#333

    class A presentation
    class B application
    class C domain
    class D infrastructure
    class Database,ExternalAPI,MessageQueue external
```

### 3.2 依賴規則說明 (Dependency Rule Explanation)
*   **單向性:** 所有依賴關係嚴格從上層指向下層（介面層 → 應用層 → 領域層）。
*   **依賴倒置:** 基礎設施層是特殊的，它實現了由應用層或領域層定義的介面，從而反轉了控制流，但依賴關係（源碼層面）仍然是基礎設施層指向領域層。

---

## 4. 模組/層級職責定義 (Module/Layer Responsibility Definition)

| 層級/模組 | 主要職責 | 程式碼示例 (路徑) |
| :--- | :--- | :--- |
| **介面層 (Presentation)** | 處理 HTTP 請求、API 端點定義、數據驗證、序列化。 | `src/app/api/` |
| **應用層 (Application)** | 編排業務流程、協調領域對象和基礎設施服務。 | `src/app/services/` |
| **領域層 (Domain)** | 包含核心業務邏輯、實體、值對象和倉儲介面。 | `src/app/domain/` |
| **基礎設施層 (Infrastructure)** | 實現數據庫訪問、與外部服務通信、消息隊列等。 | `src/app/repositories/`, `src/app/clients/` |

---

## 5. 關鍵依賴路徑分析 (Key Dependency Path Analysis)

本節分析一個典型業務流程中的依賴調用鏈，以確保其符合設計原則。

*   **場景:** `[例如：創建一個新訂單]`
*   **路徑:**
    1.  `api.v1.orders.create_order` (介面層) 接收請求。
    2.  調用 `services.order_service.place_order` (應用層)。
    3.  `order_service` 創建 `Order` 實體 (領域層)。
    4.  `order_service` 調用由領域層定義、由基礎設施層實現的 `OrderRepository` 介面來持久化 `Order`。
    5.  `repositories.postgres_order_repo.save` (基礎設施層) 執行資料庫操作。
*   **結論:** `[該路徑符合單向依賴和依賴倒置原則。]`

---

## 6. 依賴風險與管理 (Dependency Risks and Management)

### 6.1 循環依賴 (Circular Dependencies)
*   **檢測工具:** `[例如：使用 Pydeps, SonarQube 或 IDE 內置工具定期掃描循環依賴。]`
*   **解決策略:**
    *   **重構:** 提取共享邏輯到新的、更低層的模組中。
    *   **介面提取:** 引入介面 (抽象類別) 來打破雙向依賴。
    *   **事件驅動:** 使用事件/回調機制解耦強依賴關係。

### 6.2 不穩定依賴 (Unstable Dependencies)
*   **識別:** `[識別出專案中不穩定（即經常變更）的模組或第三方函式庫。]`
*   **管理策略 (隔離層):**
    *   **適配器模式 (Adapter Pattern):** 對於外部函式庫，創建一個內部適配器來封裝其 API，使內部代碼僅依賴於穩定的適配器介面。
    *   **範例:** `[例如：所有對外部支付閘道的調用都通過 PaymentGatewayAdapter 進行，而不是直接調用 SDK。]`

---

## 7. 外部依賴管理 (External Dependency Management)

### 7.1 外部依賴清單 (External Dependencies List)

| 外部依賴 (函式庫) | 版本 | 用途說明 | 風險評估 (社群活躍度/穩定性) |
| :--- | :--- | :--- | :--- |
| `[fastapi]` | `[^0.104.0]` | `[提供 Web 框架]` | `低 (主流、活躍)` |
| `[sqlalchemy]` | `[^2.0.22]` | `[數據庫 ORM]` | `低 (成熟、穩定)` |
| `[some-beta-lib]` | `[0.1.0]` | `[用於 XX 功能]` | `高 (處於 Beta 階段，API 可能變更)` |

### 7.2 依賴更新策略 (Dependency Update Strategy)
*   **工具:** `[例如：使用 Dependabot 或 Snyk 自動掃描和更新依賴。]`
*   **流程:** `[所有依賴更新需通過完整的 CI 測試套件後才能合併到主分支。]`

---

## 📝 使用指南 (Usage Guide)

*   **持續維護:** 本文檔應與程式碼庫同步更新。任何重大的架構或依賴關係變更都應在此處反映。
*   **作為審查工具:** 在進行程式碼審查時，請參考本文檔中的原則和圖表，以評估變更是否引入了不良的依賴關係。
