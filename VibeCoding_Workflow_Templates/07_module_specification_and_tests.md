# 模組規格與測試案例 (Module Specification & Test Cases)

---

**文件版本 (Document Version):** `v1.0`
**最後更新 (Last Updated):** `YYYY-MM-DD`
**主要作者 (Lead Author):** `[開發工程師]`
**審核者 (Reviewers):** `[技術負責人]`
**狀態 (Status):** `[草稿 (Draft), 待開發 (To Do), 開發中 (In Progress), 已完成 (Done)]`

---

## 目錄 (Table of Contents)

- [模組: `[模組/類別名稱]`](#-模組-模組類別名稱)
  - [規格 1: `[函式/方法名稱]`](#-規格-1-函式方法名稱)
  - [測試情境與案例 (Test Scenarios & Cases)](#-測試情境與案例-test-scenarios--cases)

---

**目的**: 本文件旨在將高層次的 BDD 情境分解到具體的模組或類別層級，定義其詳細規格、測試場景，並使用契約式設計 (Design by Contract, DbC) 來精確定義每個函式的職責邊界。這是最低層級、最精確的規格，直接指導 TDD (測試驅動開發) 的實踐。

---

## 模組: `[模組/類別名稱，例如：ShoppingCartService]`

**對應架構文件**: `[Link to 03_architecture_and_design_document.md#module-shoppingcartservice]`
**對應 BDD Feature**: `[Link to authentication.feature]`

---

### 規格 1: `[函式/方法名稱，例如：AddItemToCart]`

**描述 (Description)**: 將指定數量的商品加入購物車。如果商品已存在，則增加其數量。

**契約式設計 (Design by Contract, DbC)**:
*   **前置條件 (Preconditions)**: *函式被呼叫前必須為真的條件。*
    1.  `quantity` 必須大於 0。
    2.  `productId` 不可為空或空白字串。
    3.  `productId` 必須對應到一個實際存在的商品。
*   **後置條件 (Postconditions)**: *函式成功執行後必須為真的條件。*
    1.  購物車中的品項總數 (`Items.Count`) 等於 `old count + 1` (如果商品是新的)。
    2.  對應 `productId` 的品項數量 (`Item.Quantity`) 等於 `old quantity + quantity`。
    3.  購物車的總金額 (`TotalPrice`) 已被更新。
*   **不變性 (Invariants)**: *在函式執行前後，整個類別必須保持的狀態。*
    1.  購物車的總金額 (`TotalPrice`) 永遠不可為負數。
    2.  任何品項的數量 (`Item.Quantity`) 永遠不可小於等於 0。

---

### 測試情境與案例 (Test Scenarios & Cases)

*以下是針對 `AddItemToCart` 規格需要覆蓋的測試情境。*

#### 情境 1: 正常路徑 (Happy Path)

*   **測試案例 ID**: `TC-AddItem-001`
*   **描述**: 成功將一件商品加入一個空的購物車。
*   **測試步驟 (Arrange-Act-Assert)**:
    1.  **Arrange**: 建立一個空的 `ShoppingCart` 物件。
    2.  **Act**: 呼叫 `shoppingCart.AddItem(productId: "P01", quantity: 1)`。
    3.  **Assert**:
        *   驗證 `shoppingCart.Items.Count` 為 1。
        *   驗證 `shoppingCart.GetItem("P01").Quantity` 為 1。
        *   驗證 `shoppingCart.TotalPrice` 為商品 "P01" 的單價。

#### 情境 2: 邊界情況 (Edge Case)

*   **測試案例 ID**: `TC-AddItem-002`
*   **描述**: 將一個已存在於購物車的商品數量加一。
*   **測試步驟 (Arrange-Act-Assert)**:
    1.  **Arrange**: 建立一個 `ShoppingCart` 物件，其中已包含 `productId: "P01", quantity: 2`。
    2.  **Act**: 呼叫 `shoppingCart.AddItem(productId: "P01", quantity: 1)`。
    3.  **Assert**:
        *   驗證 `shoppingCart.Items.Count` 仍然為 1 (品項數不變)。
        *   驗證 `shoppingCart.GetItem("P01").Quantity` 為 3。

#### 情境 3: 無效輸入 (違反前置條件)

*   **測試案例 ID**: `TC-AddItem-003`
*   **描述**: 嘗試加入數量為 0 的商品。
*   **測試步驟 (Arrange-Act-Assert)**:
    1.  **Arrange**: 建立一個空的 `ShoppingCart` 物件。
    2.  **Act**: 呼叫 `shoppingCart.AddItem(productId: "P01", quantity: 0)`。
    3.  **Assert**: 預期系統拋出 `ArgumentOutOfRangeException` 或類似的無效參數例外。

#### 情境 4: 業務規則 (Business Rule)

*   **測試案例 ID**: `TC-AddItem-004`
*   **描述**: 當購物車商品總數已達上限 (例如 50) 時，嘗試加入一個**新**商品。
*   **測試步驟 (Arrange-Act-Assert)**:
    1.  **Arrange**: 建立一個 `ShoppingCart` 物件，其中已包含 50 種不同的商品。
    2.  **Act**: 呼叫 `shoppingCart.AddItem(productId: "P51", quantity: 1)`。
    3.  **Assert**: 預期系統拋出 `ShoppingCartFullException` 或類似的業務規則例外。

---

**LLM Prompting Guide:**
*`「請根據以下的測試案例規格，為我生成一個會失敗的 TDD 單元測試。目標函式：AddItemToCart。測試案例 ID：TC-AddItem-001。規格如下：[貼上測試案例文本]」`*
