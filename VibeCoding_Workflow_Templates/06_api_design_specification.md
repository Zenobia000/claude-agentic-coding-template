# API 設計規範 (API Design Specification) - [API 名稱/服務名稱]

---

**文件版本 (Document Version):** `v1.1.0`

**最後更新 (Last Updated):** `YYYY-MM-DD`

**主要作者/設計師 (Lead Author/Designer):** `[請填寫]`

**審核者 (Reviewers):** `[API 設計委員會、架構團隊、相關開發團隊等]`

**狀態 (Status):** `[例如：草稿 (Draft), 審核中 (In Review), 已批准 (Approved), 已發布 (Published), 已棄用 (Deprecated)]`

**相關 SD 文檔:** `[連結到對應的 03_system_design_document.md]`

**OpenAPI (Swagger) 定義文件:** `[連結到 OpenAPI (YAML/JSON) 文件的路徑或 URL]`

---

## 目錄 (Table of Contents)

1.  [引言 (Introduction)](#1-引言-introduction)
    *   [1.1 目的 (Purpose)](#11-目的-purpose)
    *   [1.2 目標讀者 (Target Audience)](#12-目標讀者-target-audience)
    *   [1.3 快速入門 (Quick Start)](#13-快速入門-quick-start)
2.  [設計原則與約定 (Design Principles and Conventions)](#2-設計原則與約定-design-principles-and-conventions)
    *   [2.1 API 風格 (API Style)](#21-api-風格-api-style)
    *   [2.2 基本 URL (Base URL)](#22-基本-url-base-url)
    *   [2.3 請求與回應格式 (Request and Response Formats)](#23-請求與回應格式-request-and-response-formats)
    *   [2.4 標準 HTTP Headers](#24-標準-http-headers)
    *   [2.5 命名約定 (Naming Conventions)](#25-命名約定-naming-conventions)
    *   [2.6 日期與時間格式 (Date and Time Formats)](#26-日期與時間格式-date-and-time-formats)
3.  [認證與授權 (Authentication and Authorization)](#3-認證與授權-authentication-and-authorization)
    *   [3.1 認證機制 (Authentication Mechanism)](#31-認證機制-authentication-mechanism)
    *   [3.2 授權模型/範圍 (Authorization Model/Scopes)](#32-授權模型範圍-authorization-modelscopes)
4.  [通用 API 行為 (Common API Behaviors)](#4-通用-api-行為-common-api-behaviors)
    *   [4.1 分頁 (Pagination)](#41-分頁-pagination)
    *   [4.2 排序 (Sorting)](#42-排序-sorting)
    *   [4.3 過濾 (Filtering)](#43-過濾-filtering)
    *   [4.4 部分回應 (Partial Responses)](#44-部分回應-partial-responses)
    *   [4.5 關聯擴展 (Expanding Related Objects)](#45-關聯擴展-expanding-related-objects)
    *   [4.6 冪等性 (Idempotency)](#46-冪等性-idempotency)
5.  [錯誤處理 (Error Handling)](#5-錯誤處理-error-handling)
    *   [5.1 標準錯誤回應格式 (Standard Error Response Format)](#51-標準錯誤回應格式-standard-error-response-format)
    *   [5.2 通用 HTTP 狀態碼](#52-通用-http-狀態碼)
    *   [5.3 錯誤碼字典 (Error Code Dictionary)](#53-錯誤碼字典-error-code-dictionary)
6.  [安全性考量 (Security Considerations)](#6-安全性-考量-security-considerations)
    *   [6.1 傳輸層安全 (TLS)](#61-傳輸層安全-tls)
    *   [6.2 HTTP 安全 Headers](#62-http-安全-headers)
    *   [6.3 速率限制 (Rate Limiting)](#63-速率限制-rate-limiting)
    *   [6.4 OWASP API Security Top 10](#64-owasp-api-security-top-10)
7.  [API 端點詳述 (API Endpoint Definitions)](#7-api-端點詳述-api-endpoint-definitions)
    *   [7.1 資源：用戶 (Users)](#71-資源用戶-users)
8.  [資料模型/Schema 定義 (Data Models / Schema Definitions)](#8-資料模型schema-定義-data-models--schema-definitions)
    *   [8.1 `User`](#81-user)
    *   [8.2 `UserCreate`](#82-usercreate)
9.  [API 生命週期與版本控制 (API Lifecycle and Versioning)](#9-api-生命週期與版本控制-api-lifecycle-and-versioning)
    *   [9.1 API 生命週期階段 (API Lifecycle Stages)](#91-api-生命週期階段-api-lifecycle-stages)
    *   [9.2 版本控制策略 (Versioning Strategy)](#92-版本控制策略-versioning-strategy)
    *   [9.3 API 棄用策略 (Deprecation Policy)](#93-api-棄用策略-deprecation-policy)
10. [附錄 (Appendix)](#10-附錄-appendix)
    *   [10.1 請求/回應範例 (Request/Response Examples)](#101-請求回應範例-requestresponse-examples)

---

## 1. 引言 (Introduction)

### 1.1 目的 (Purpose)
*   `[為 [API 名稱/服務名稱] 的消費者和實現者提供一個統一、明確、易於遵循的接口契約。]`

### 1.2 目標讀者 (Target Audience)
*   `[API 消費者 (前端、移動端、後端服務開發者)、API 實現者、測試工程師、技術文件撰寫者。]`

### 1.3 快速入門 (Quick Start)
*   **第 1 步: 獲取 API 金鑰 (API Key)**
    *   `[在開發者後台...處註冊並獲取您的 API 金鑰。]`
*   **第 2 步: 發送您的第一個請求**
    *   `[使用以下 cURL 命令來驗證您的連接。]`
    ```bash
    curl --request GET \
      --url https://api.example.com/v1/health \
      --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
    ```
*   **預期回應:**
    ```json
    {
      "status": "ok"
    }
    ```

---

## 2. 設計原則與約定 (Design Principles and Conventions)

### 2.1 API 風格 (API Style)
*   **風格:** RESTful
*   **核心原則:** 資源導向、無狀態、標準 HTTP 方法、HATEOAS (可選但推薦)。

### 2.2 基本 URL (Base URL)
*   **生產環境 (Production):** `https://api.example.com/v1`
*   **預備環境 (Staging):** `https://staging-api.example.com/v1`

### 2.3 請求與回應格式 (Request and Response Formats)
*   **格式:** `application/json` (UTF-8 編碼)。客戶端應在請求中包含 `Content-Type: application/json` 和 `Accept: application/json` headers。

### 2.4 標準 HTTP Headers
*   **所有請求 (All Requests):**
    *   `Authorization`: 包含認證憑證 (Bearer Token)。
    *   `X-Request-ID`: 一個唯一的 ID (e.g., UUID)，用於追蹤請求，便於調試。客戶端未提供時，伺服器應生成一個並在回應頭中返回。
*   **所有回應 (All Responses):**
    *   `X-Request-ID`: 從請求中傳入或由伺服器生成的唯一 ID。
*   **可選請求 (Optional Requests):**
    *   `Accept-Language`: 指定期望的回應語言 (e.g., `en-US`, `zh-TW`)。
    *   `Idempotency-Key`: 用於冪等性保證。

### 2.5 命名約定 (Naming Conventions)
*   **資源路徑 (Resource Paths):** 小寫，多個單詞用連字符 `-` 連接，名詞複數形式 (e.g., `/user-profiles`)。
*   **查詢參數 & JSON 欄位 (Query Parameters & JSON Fields):** `snake_case` (e.g., `page_size`, `user_id`)。

### 2.6 日期與時間格式 (Date and Time Formats)
*   **標準格式:** 所有日期時間字段均使用 ISO 8601 格式，並包含 UTC 時區標識 (e.g., `2023-10-27T10:00:00Z`)。

---

## 3. 認證與授權 (Authentication and Authorization)

### 3.1 認證機制 (Authentication Mechanism)
*   **機制:** OAuth 2.0 (Client Credentials Grant / Authorization Code Grant)。
*   **憑證傳遞:** 客戶端需在 `Authorization` header 中提供 `Bearer <access_token>`。
*   `[說明 Token 的獲取方式、有效期、刷新機制等。]`

### 3.2 授權模型/範圍 (Authorization Model/Scopes)
*   **模型:** 基於角色的訪問控制 (RBAC) 結合 OAuth 2.0 範圍 (Scopes)。
*   **範圍定義:** `[定義不同的 scope 及其代表的權限，例如：users.read, users.write]。`
*   **權限失敗:** 當授權失敗時，API 應返回 `403 Forbidden`。

---

## 4. 通用 API 行為 (Common API Behaviors)

### 4.1 分頁 (Pagination)
*   **策略:** 基於游標 (Cursor-based) 的分頁。
*   **查詢參數:** `limit` (預設 25，最大 100) 和 `starting_after` / `ending_before` (游標)。
*   **回應結構:**
    ```json
    {
      "object": "list",
      "data": [ ... ],
      "has_more": true,
      "next_page_url": "/v1/users?limit=25&starting_after=user_curs_abcde"
    }
    ```

### 4.2 排序 (Sorting)
*   **查詢參數:** `sort_by`
*   **格式:** `sort_by=field_name` (升序預設), `sort_by=-field_name` (降序)。
*   **可排序欄位:** `[明確列出哪些欄位支持排序。]`

### 4.3 過濾 (Filtering)
*   **策略:** `[直接使用欄位名作為參數 (e.g., /users?status=active)，對於複雜過濾，可使用範圍操作符 (e.g., created_at[gte]=...)]`

### 4.4 部分回應 (Partial Responses)
*   **目的:** 允許客戶端只選擇性地獲取他們需要的欄位，以減少網路流量。
*   **查詢參數:** `fields`
*   **格式:** `fields=field1,field2,nested_object.field3`
*   **範例:** `GET /users/{id}?fields=id,email,profile.display_name`

### 4.5 關聯擴展 (Expanding Related Objects)
*   **目的:** 允許客戶端在單個請求中加載關聯的資源，以避免 N+1 查詢。
*   **查詢參數:** `expand`
*   **格式:** `expand=relation1,relation2.nested_relation`
*   **範例:** `GET /orders/{id}?expand=customer,line_items.product`

### 4.6 冪等性 (Idempotency)
*   **機制:** 對於所有非 GET 請求 (POST, PUT, PATCH, DELETE)，客戶端可選傳遞 `Idempotency-Key: <unique-key>` header。
*   **行為:** 伺服器將保存第一次請求的結果 (狀態碼和回應體)，並在 `Idempotency-Key` 的有效期內 (e.g., 24小時) 對後續相同 key 的請求返回相同結果。

---

## 5. 錯誤處理 (Error Handling)

### 5.1 標準錯誤回應格式 (Standard Error Response Format)
```json
{
  "error": {
    "type": "[ERROR_TYPE]",         // e.g., "invalid_request_error", "api_error"
    "code": "[error_code]",         // e.g., "parameter_missing", "token_expired"
    "message": "[對開發者友好的錯誤描述]",
    "param": "[出錯的參數名 (若適用)]",
    "request_id": "[請求的唯一標識]"
  }
}
```

### 5.2 通用 HTTP 狀態碼
*   **2xx:** 成功 (`200 OK`, `201 Created`, `202 Accepted`, `204 No Content`)。
*   **4xx:** 客戶端錯誤 (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `429 Too Many Requests`)。
*   **5xx:** 伺服器錯誤 (`500 Internal Server Error`, `503 Service Unavailable`)。

### 5.3 錯誤碼字典 (Error Code Dictionary)
| `error.code` | 建議 HTTP 狀態碼 | 描述 |
| :--- | :--- | :--- |
| `resource_not_found` | 404 Not Found | 請求的資源不存在。 |
| `parameter_invalid` | 400 Bad Request | 請求中的某個參數格式無效或值不合法。 |
| `parameter_missing` | 400 Bad Request | 缺少必要的請求參數。 |
| `authentication_failed` | 401 Unauthorized | 認證失敗，提供的憑證無效或過期。 |
| `permission_denied` | 403 Forbidden | 雖然認證成功，但用戶沒有執行此操作的權限。 |
| `rate_limit_exceeded`| 429 Too Many Requests | 超出速率限制。 |
| `idempotency_key_reused`| 422 Unprocessable Entity| 冪等性金鑰已被用於不同的請求體。 |
| `internal_server_error` | 500 Internal Server Error | 伺服器內部發生未知錯誤。 |

---

## 6. 安全性考量 (Security Considerations)

### 6.1 傳輸層安全 (TLS)
*   所有 API 端點強制使用 HTTPS (TLS 1.2+)。

### 6.2 HTTP 安全 Headers
*   `[應包含 Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options 等。]`

### 6.3 速率限制 (Rate Limiting)
*   **策略:** 基於 API Key 或用戶 ID 進行限制。
*   **回應 Headers:** `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`。
*   **超出限制回應:** `429 Too Many Requests`。

### 6.4 OWASP API Security Top 10
*   `[強調設計已考慮並緩解了常見 API 漏洞，如 Broken Object Level Authorization, Excessive Data Exposure 等。]`

---

## 7. API 端點詳述 (API Endpoint Definitions)

*   `[這是 API 設計的核心部分。對每個資源 (Resource) 及其相關的端點 (Endpoint) 進行詳細定義。]`

### 7.1 資源：用戶 (Users)
*   **資源路徑:** `/users`
*   **資源對象 (Schema):** `User`

#### `POST /users` (創建用戶)
*   **描述:** `[創建一個新的用戶。]`
*   **授權範圍:** `users.write`
*   **請求體:** `UserCreate`
*   **成功回應 (201 Created):** `User`
*   **冪等性:** 支持

#### `GET /users/{user_id}` (獲取用戶)
*   **描述:** `[獲取指定 ID 的用戶詳情。]`
*   **授權範圍:** `users.read`
*   **成功回應 (200 OK):** `User`

*   `... (繼續列出 LIST, UPDATE, DELETE 等其他端點) ...`

---

## 8. 資料模型/Schema 定義 (Data Models / Schema Definitions)

*   `[使用 OpenAPI Schema Object 或 Pydantic 模型風格定義 API 中使用的所有數據模型。]`

### 8.1 `User`
*   **描述:** `[代表一個用戶的標準數據結構。]`
    ```json
    {
      "id": "string (user_...)",
      "object": "user",
      "email": "string",
      "created_at": "string (date-time)",
      ...
    }
    ```

### 8.2 `UserCreate`
*   **描述:** `[用於創建新用戶時的請求體結構。]`
    ```json
    {
      "email": "string (required, email format)",
      "password": "string (required, min_length: 8)"
    }
    ```

---

## 9. API 生命週期與版本控制 (API Lifecycle and Versioning)

### 9.1 API 生命週期階段 (API Lifecycle Stages)
*   **設計 (Design):** API 正在設計和審查中，尚未實現。
*   **開發 (Development):** 僅供內部開發和測試使用，API 極不穩定。
*   **Alpha:** 功能基本完成，開放給少量信任的合作夥伴測試，API 可能會有破壞性變更。
*   **Beta:** API 相對穩定，開放給更廣泛的用戶測試，應盡量避免破壞性變更。
*   **通用版本 (General Availability - GA):** 官方穩定版本，承諾遵守版本控制和棄用策略。
*   **已棄用 (Deprecated):** 不再推薦使用，將在未來被移除。
*   **已停用 (Decommissioned):** API 已被移除，無法再訪問。

### 9.2 版本控制策略 (Versioning Strategy)
*   **策略:** URL 路徑版本控制 (e.g., `/v1/...`)。
*   **變更類型:**
    *   **向後兼容變更 (Backward-compatible):** 增加新的 API 端點、在請求中增加新的可選參數、在回應中增加新的欄位。這些變更不會導致版本號變更。
    *   **破壞性變更 (Breaking change):** 刪除或重命名欄位/端點、修改現有欄位型別、增加新的必選參數。這些變更 **必須** 增加 API 的主版本號 (e.g., `v1` -> `v2`)。

### 9.3 API 棄用策略 (Deprecation Policy)
*   `[當一個舊版本的 API 需要被棄用時，我們承諾：]`
    1.  `[至少提前 6 個月通知。]`
    2.  `[通過文檔、HTTP Header (`Deprecation`) 和客戶郵件進行溝通。]`
    3.  `[提供詳細的遷移指南。]`

---

## 10. 附錄 (Appendix)

### 10.1 請求/回應範例 (Request/Response Examples)
*   **請求/回應範例:** `[為關鍵端點提供詳細的 cURL 請求和 JSON 回應範例。]`
*   **客戶端庫:** `[列出官方或社區支持的客戶端庫 (若有)。]`

---
**文件審核記錄 (Review History):**

| 日期       | 審核人     | 版本 | 變更摘要/主要反饋 |
| :--------- | :--------- | :--- | :---------------- |
| YYYY-MM-DD | [API委員會] | v1.0 | 批准發布          | 