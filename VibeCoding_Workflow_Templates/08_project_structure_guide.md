# 專案結構指南 (Project Structure Guide)

---

**文件版本 (Document Version):** `v1.0`
**最後更新 (Last Updated):** `YYYY-MM-DD`
**主要作者 (Lead Author):** `[技術負責人/架構團隊]`
**狀態 (Status):** `活躍 (Active)`

---

## 目錄 (Table of Contents)

- [1. 指南目的 (Purpose of This Guide)](#1-指南目的-purpose-of-this-guide)
- [2. 核心設計原則 (Core Design Principles)](#2-核心設計原則-core-design-principles)
- [3. 頂層目錄結構 (Top-Level Directory Structure)](#3-頂層目錄結構-top-level-directory-structure)
- [4. 目錄詳解 (Directory Breakdown)](#4-目錄詳解-directory-breakdown)
  - [4.1 `src/[app_name]/` - 應用程式原始碼](#41-srcapp_name---應用程式原始碼)
  - [4.2 `tests/` - 測試代碼](#42-tests---測試代碼)
  - [4.3 `docs/` - 文檔](#43-docs---文檔)
  - [4.4 `scripts/` - 腳本](#44-scripts---腳本)
- [5. 文件命名約定 (File Naming Conventions)](#5-文件命名約定-file-naming-conventions)
- [6. 演進原則 (Evolution Principles)](#6-演進原則-evolution-principles)

---

## 1. 指南目的 (Purpose of This Guide)

*   為 `[專案名稱]` 提供一個標準化、可擴展且易於理解的目錄和文件結構。
*   確保團隊成員能夠快速定位代碼、配置文件和文檔，降低新成員的上手成本。
*   促進代碼的模塊化和關注點分離，提高可維護性。

## 2. 核心設計原則 (Core Design Principles)

*   **按功能組織 (Organize by Feature):** 相關的功能（例如，用戶管理、訂單處理）應盡可能放在一起，而不是按類型（e.g., `controllers`, `models`）分散在各處。這有助於提高內聚性。
*   **明確的職責 (Clear Responsibilities):** 每個頂層目錄都應該有其單一、明確的職責。
*   **一致的命名 (Consistent Naming):** 文件和目錄的命名應遵循一致的、可預測的約定（e.g., `kebab-case` for directories, `snake_case.py` for Python files）。
*   **配置外部化 (Externalized Configuration):** 應用程式的配置應與代碼分離，便於在不同環境中部署。
*   **根目錄簡潔 (Clean Root Directory):** 根目錄應只包含專案級別的文件（如 README, Dockerfile, `pyproject.toml` 等），原始碼應放在專用的目錄下（e.g., `src/`）。

## 3. 頂層目錄結構 (Top-Level Directory Structure)

```plaintext
[project-root]/
├── .github/              # CI/CD 工作流程 (e.g., GitHub Actions)
├── .vscode/              # VS Code 編輯器特定配置
├── api/                  # (選填) OpenAPI/Protobuf 等 API 定義文件
├── build/                # (選填) 構建腳本和Dockerfile
├── cmd/                  # (選填, Go 專案常用) 應用程式的入口點
├── configs/              # 環境配置文件 (e.g., settings.toml, config.yaml)
├── data/                 # (選填) 專案使用的靜態數據、種子數據
├── docs/                 # 專案文檔 (本文檔、ADRs、設計文檔等)
├── scripts/              # 開發和運維腳本 (e.g., shell, Python scripts)
├── src/                  # 應用程式的 Python 原始碼 (Source code)
│   └── [app_name]/       # 專案主應用程式包
├── tests/                # 所有測試代碼
├── .dockerignore         # Docker 忽略文件
├── .gitignore            # Git 忽略文件
├── .pre-commit-config.yaml # pre-commit 鉤子配置
├── LICENSE               # 專案許可證
├── pyproject.toml        # Python 專案定義、依賴和工具配置 (PEP 621)
└── README.md             # 專案介紹和快速入門指南
```

## 4. 目錄詳解 (Directory Breakdown)

### 4.1 `src/[app_name]/` - 應用程式原始碼

*   這是專案的核心，所有 Python 原始碼都應放在這裡。
*   **結構建議 (Clean Architecture 分層):**

```plaintext
src/[app_name]/
├── __init__.py
├── main.py                     # 應用程式入口點 (FastAPI/Flask instance)
│
├── core/                       # 核心邏輯，跨功能共享
│   ├── __init__.py
│   ├── config.py             # 配置加載
│   └── security.py           # 認證、授權等
│
├── domains/                    # Domain Layer: 核心業務領域模型
│   ├── __init__.py
│   └── orders/                 # "訂單" 領域
│       ├── __init__.py
│       ├── entities.py       # 業務實體 (e.g., Order, OrderItem)
│       ├── aggregates.py     # 聚合根
│       └── exceptions.py     # 自定義領域例外
│
├── application/                # Application Layer: 應用程式邏輯
│   ├── __init__.py
│   └── orders/
│       ├── __init__.py
│       ├── use_cases.py      # 用例/服務 (e.g., CreateOrderUseCase)
│       ├── dtos.py           # 數據傳輸對象 (DTOs)
│       └── validators.py     # 輸入驗證
│
└── infrastructure/             # Infrastructure Layer: 外部世界的實現
    ├── __init__.py
    ├── web/                    # Web 框架相關 (Controllers/Routers)
    │   └── orders_router.py
    └── persistence/            # 持久化相關
        ├── __init__.py
        ├── orm_models.py     # SQLAlchemy/ORM 模型
        └── order_repository.py # Repository 實現
```

### 4.2 `tests/` - 測試代碼

*   測試代碼應與 `src` 目錄結構保持一致，以便清晰地對應到被測試的代碼。

```plaintext
tests/
├── __init__.py
├── conftest.py           # Pytest 的全局 fixtures 和鉤子
├── factories.py          # (選填) 測試數據工廠 (e.g., using factory-boy)
├── features/             # 功能測試
│   ├── __init__.py
│   └── auth/
│       ├── __init__.py
│       ├── test_router.py  # 測試 API 端點
│       └── test_service.py # 測試業務邏輯
├── integration/          # 整合測試
│   └── test_db_connection.py
└── unit/                 # 單元測試
    └── core/
        └── test_security.py
```

### 4.3 `docs/` - 文檔

*   所有與專案相關的長篇文檔都應存放在此。

```plaintext
docs/
├── adrs/                 # 架構決策記錄 (Architecture Decision Records)
│   └── adr-001-template.md
├── design/               # 設計文檔
│   ├── system-architecture.md
│   └── system-design-module-x.md
├── images/               # 文檔中使用的圖片
└── index.md              # (選填) 文檔首頁
```

### 4.4 `scripts/` - 腳本

*   **用途:** 存放用於自動化開發、部署或維護任務的腳本。
*   **範例:** `lint.sh`, `test.sh`, `run_migrations.py`, `seed_database.sh`。

## 5. 文件命名約定 (File Naming Conventions)

*   **Python 模組:** `snake_case.py` (e.g., `user_service.py`)。
*   **測試文件:** 以 `test_` 開頭 (e.g., `test_user_service.py`)。
*   **Markdown 文件:** `kebab-case.md` (e.g., `project-structure.md`)。
*   **腳本文件:** `snake_case.sh` 或 `kebab-case.sh`。

## 6. 演進原則 (Evolution Principles)

*   本結構是一個起點，應根據專案的發展進行調整。
*   任何對頂層目錄結構的重大變更，都應通過團隊討論或 ADR 的形式進行記錄。
*   保持結構的清晰和一致性比嚴格遵守某個特定模式更重要。 