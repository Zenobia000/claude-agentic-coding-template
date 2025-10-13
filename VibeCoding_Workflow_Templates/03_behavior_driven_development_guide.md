# 行為驅動情境 (BDD) 指南與範本

---

**文件版本 (Document Version):** `v1.0`
**最後更新 (Last Updated):** `YYYY-MM-DD`
**主要作者 (Lead Author):** `[技術負責人, 產品經理]`
**狀態 (Status):** `活躍 (Active)`

---

## 目錄 (Table of Contents)

- [Ⅰ. BDD 核心原則](#-bdd-核心原則)
- [Ⅱ. Gherkin 語法速查](#-gherkin-語法速查)
- [Ⅲ. BDD 範本 (`.feature` file)](#-bdd-範本-feature-file)
- [Ⅳ. 最佳實踐](#-最佳實踐)

---

**目的**: 本文件旨在提供一套標準化的指南和範本，用於編寫行為驅動開發 (BDD) 的情境。BDD 的核心是使用一種名為 Gherkin 的結構化自然語言，來描述系統的預期行為，確保業務人員、開發者和測試者對「完成」的定義達成共識。

---

## Ⅰ. BDD 核心原則

1.  **從對話開始**: BDD 不是關於寫測試，而是關於團隊成員（業務、開發、測試）之間的對話，以確保對需求的共同理解。
2.  **由外而內**: 我們從使用者與系統的互動（外部行為）開始定義，然後才深入到內部實現。
3.  **使用通用語言 (Ubiquitous Language)**: 在 BDD 情境中使用的術語，應與在 PRD 和程式碼中使用的術語保持一致。

---

## Ⅱ. Gherkin 語法速查

Gherkin 是編寫 BDD 情境的語言。一個 `.feature` 檔案通常包含以下關鍵字：

*   `Feature`: 描述一個高層次的功能，通常對應 PRD 中的一個 Epic。
*   `Scenario`: 描述 `Feature` 下的一個具體業務場景或測試案例。
*   `Given`: **(給定)** 描述場景開始前的初始狀態或上下文（Arrange）。
*   `When`: **(當)** 描述使用者執行的某個具體操作或觸發的事件（Act）。
*   `Then`: **(那麼)** 描述在 `When` 發生後，系統應有的輸出或結果（Assert）。
*   `And`, `But`: 用於連接多個 `Given`, `When`, 或 `Then` 步驟，使其更具可讀性。
*   `Background`: 用於定義在該 Feature 的所有 Scenarios 之前都需要執行的 `Given` 步驟，以減少重複。
*   `Scenario Outline`: 用於執行同一個場景的多組不同數據的測試，通常與 `Examples` 關鍵字配合使用。

---

## Ⅲ. BDD 範本 (`.feature` file)

這是一個使用者身份驗證功能的 BDD 範本。

**檔案名稱**: `authentication.feature`

```gherkin
# Feature: 使用者身份驗證
# 目的: 為使用者提供安全可靠的身份驗證機制。
# 對應 PRD: [Link to 01_project_brief_and_prd.md#epic-auth]

Feature: User Authentication

  Background:
    Given I am a guest user
    And I am on the "/login" page

  @happy-path @smoke-test
  Scenario: 成功登入
    Given the user "testuser@example.com" exists with password "password123"
    When I fill in "Email" with "testuser@example.com"
    And I fill in "Password" with "password123"
    And I press the "Login" button
    Then I should be redirected to the "/dashboard" page
    And I should see a message "Welcome back, testuser!"

  @sad-path
  Scenario: 使用無效密碼登入失敗
    Given the user "testuser@example.com" exists with password "password123"
    When I fill in "Email" with "testuser@example.com"
    And I fill in "Password" with "wrong-password"
    And I press the "Login" button
    Then I should remain on the "/login" page
    And I should see an error message "Invalid email or password."

  @edge-case
  Scenario Outline: 登入時的輸入驗證
    When I fill in "Email" with "<email>"
    And I fill in "Password" with "<password>"
    And I press the "Login" button
    Then I should see a validation error message "<message>"

    Examples:
      | email                  | password    | message                       |
      | ""                     | "password"  | "Email is required."          |
      | "testuser@example.com" | ""          | "Password is required."       |
      | "invalid-email"        | "password"  | "Email format is invalid."    |
```

---

## Ⅳ. 最佳實踐

1.  **一個 Scenario 只測一件事**: 保持每個場景的專注性和簡潔性。
2.  **使用陳述式而非命令式**: `Then` 應該描述「系統的狀態是什麼」，而不是「系統應該做什麼」。
    *   **好的**: `Then I should be redirected to the dashboard`
    *   **不好的**: `Then the system redirects me to the dashboard`
3.  **避免 UI 細節**: BDD 關注的是「行為」，而不是「實現方式」。盡量避免提及具體的按鈕顏色、元素 ID 等。
    *   **好的**: `When I confirm my order`
    *   **不好的**: `When I click the green "Confirm" button with id "btn-confirm"`
4.  **從使用者的角度編寫**: 讓非技術人員也能輕鬆讀懂。

**LLM Prompting Guide:**
*`「請根據以下的 BDD 情境，使用 Clean Architecture 和 TDD 方法，為我生成對應的 Controller、Use Case、Entity 以及一個初步的、會失敗的單元測試。情境如下：[貼上 Gherkin Scenario 文本]」`*

```
