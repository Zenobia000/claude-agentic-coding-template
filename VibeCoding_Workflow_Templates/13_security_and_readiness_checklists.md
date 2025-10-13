# 綜合品質檢查清單 (Unified Quality Checklist) - [專案/功能名稱]

---

**文件版本 (Document Version):** `v1.0`
**最後更新 (Last Updated):** `YYYY-MM-DD`
**主要作者 (Lead Author):** `[技術負責人, 安全工程師]`
**狀態 (Status):** `使用中 (In Use)`

---

## 目錄 (Table of Contents)

- [A. 核心安全原則 (Core Security Principles)](#a-核心安全原則-core-security-principles)
- [B. 數據生命週期安全與隱私 (Data Lifecycle Security & Privacy)](#b-數據生命週期安全與隱私-data-lifecycle-security--privacy)
- [C. 應用程式安全 (Application Security)](#c-應用程式安全-application-security)
- [D. 基礎設施與運維安全 (Infrastructure & Operations Security)](#d-基礎設施與運維安全-infrastructure--operations-security)
- [E. 合規性 (Compliance)](#e-合規性-compliance)
- [F. 審查結論與行動項 (Review Conclusion & Action Items)](#f-審查結論與行動項-review-conclusion--action-items)
- [G. 生產準備就緒 (Production Readiness)](#g-生產準備就緒-production-readiness)
  - [G.1 可觀測性 (Observability)](#g1-可觀測性-observability)
  - [G.2 可靠性與彈性 (Reliability & Resilience)](#g2-可靠性與彈性-reliability--resilience)
  - [G.3 性能與可擴展性 (Performance & Scalability)](#g3-性能與可擴展性-performance--scalability)
  - [G.4 可維護性與文檔 (Maintainability & Documentation)](#g4-可維護性與文檔-maintainability--documentation)

---
# 安全與隱私設計審查 (Security and Privacy Design Review) - [專案/功能名稱]
## 目的

**目的**: 本檢查清單旨在提供一個統一的框架，用於在專案的關鍵階段（如設計審查、上線前）進行全面的安全、隱私和生產準備就緒評估。

---

**審查對象 (Review Target):** `[專案名稱] v[版本] / [功能名稱]`

**審查日期 (Review Date):** `YYYY-MM-DD`

**審查人員 (Reviewers):** `[安全架構師、隱私顧問、主要開發者]`

**相關文檔 (Related Documents):**
*   SA 文檔: `[連結]`
*   SD 文檔: `[連結]`
*   API 設計規範: `[連結]`

---

## A. 核心安全原則 (Core Security Principles)

*   `[ ]` **最小權限 (Least Privilege):** 系統組件和用戶是否僅被授予執行其預期功能所需的最小權限？
*   `[ ]` **縱深防禦 (Defense in Depth):** 是否有多層安全控制？單點安全機制的失效是否會導致嚴重後果？
*   `[ ]` **預設安全 (Secure by Default):** 系統的預設配置是否是安全的？
*   `[ ]` **攻擊面最小化 (Minimize Attack Surface):** 是否關閉了不必要的端口、功能和 API？
*   `[ ]` **職責分離 (Separation of Duties):** 關鍵操作是否需要多方參與或批准？

## B. 數據生命週期安全與隱私 (Data Lifecycle Security & Privacy)

### B.1 數據分類與收集 (Data Classification & Collection)
*   `[ ]` **數據分類 (Data Classification):** 系統處理的所有數據是否已根據敏感性進行分類 (e.g., 公開, 內部, 機密, PII)？
*   `[ ]` **數據最小化 (Data Minimization):** 是否只收集業務功能絕對必要的數據？是否避免收集高風險數據 (如信用卡號)？
*   `[ ]` **用戶同意/告知 (User Consent/Notification):** 在收集個人身份信息 (PII) 或敏感數據前，是否已獲得用戶的明確同意或已充分告知？

### B.2 數據傳輸 (Data in Transit)
*   `[ ]` **傳輸加密 (Encryption in Transit):** 所有外部網路通訊 (用戶到伺服器，服務到公開網路) 是否都使用強加密協議 (TLS 1.2+)?
*   `[ ]` **內部傳輸加密 (Internal Encryption):** 內部網路 (服務到服務) 的敏感數據傳輸是否也加密？
*   `[ ]` **證書管理 (Certificate Management):** TLS 證書是否有效、來自受信任的 CA，並有自動更新和輪換機制？

### B.3 數據儲存 (Data at Rest)
*   `[ ]` **儲存加密 (Encryption at Rest):** 儲存的敏感數據 (特別是 PII) 是否使用強加密演算法 (e.g., AES-256) 進行加密？
*   `[ ]` **金鑰管理 (Key Management):** 加密金鑰是否安全地生成、儲存、分發和輪換 (e.g., 使用 AWS KMS, HashiCorp Vault)？
*   `[ ]` **數據備份安全:** 備份數據是否也受到同等級別的加密和訪問控制保護？

### B.4 數據使用與處理 (Data Usage & Processing)
*   `[ ]` **日誌記錄中的敏感資訊:** 系統日誌是否避免記錄不必要的敏感資訊 (如密碼、PII)？若必須記錄，是否已進行遮罩或脫敏？
*   `[ ]` **第三方共享:** 如果與第三方共享數據，是否有適當的數據共享協議和安全評估？

### B.5 數據保留與銷毀 (Data Retention & Disposal)
*   `[ ]` **保留策略 (Retention Policy):** 是否為不同類型的數據定義了明確的保留期限？
*   `[ ]` **安全銷毀 (Secure Disposal):** 過期或不再需要的數據是否被安全地、不可恢復地銷毀？

## C. 應用程式安全 (Application Security)

### C.1 身份驗證 (Authentication)
*   `[ ]` **密碼策略:** 密碼策略是否強制足夠的複雜度？是否提供多因子認證 (MFA)？
*   `[ ]` **憑證儲存:** 用戶密碼是否使用強大的、加鹽的哈希演算法 (e.g., Argon2, bcrypt) 儲存？
*   `[ ]` **會話管理 (Session Management):** 會話 Token 是否安全生成、傳輸 (HttpOnly, Secure flag) 和管理 (超時、註銷時失效)？
*   `[ ]` **暴力破解防護:** 是否有速率限制、帳戶鎖定或驗證碼機制來防止登錄接口的暴力破解？

### C.2 授權與訪問控制 (Authorization & Access Control)
*   `[ ]` **物件級別授權 (Object-Level Authorization):** 除了功能級別授權，是否對特定數據對象的訪問也進行了權限控制 (e.g., 用戶 A 不能訪問用戶 B 的數據)？
*   `[ ]` **功能級別授權 (Function-Level Authorization):** 敏感操作或 API 端點前是否都執行了明確的權限檢查？

### C.3 輸入驗證與輸出編碼 (Input Validation & Output Encoding)
*   `[ ]` **防止注入攻擊:** 是否有效防禦了 SQL/NoSQL 注入, 命令注入等？(首選參數化查詢/ORM)。
*   `[ ]` **防止跨站腳本 (XSS):** 所有輸出到用戶界面的數據是否都進行了上下文感知的編碼？是否使用了 Content Security Policy (CSP)？
*   `[ ]` **防止跨站請求偽造 (CSRF):** 對於會改變狀態的請求，是否使用了 CSRF Token 或 SameSite Cookie 等防護機制？

### C.4 API 安全 (API Security)
*   `[ ]` **API 認證/授權:** 所有 API 端點是否都經過了嚴格的身份驗證和授權檢查？
*   `[ ]` **速率限制:** 是否對 API 請求進行了速率限制以防止濫用？
*   `[ ]` **參數校驗:** 是否對 API 的所有輸入參數（路徑、查詢、請求體）進行了嚴格的白名單驗證？
*   `[ ]` **避免數據過度暴露:** API 回應是否只包含客戶端真正需要的數據，避免返回整個數據庫對象？

### C.5 依賴庫安全 (Dependency Security)
*   `[ ]` **漏洞掃描:** 是否使用工具 (e.g., `pip-audit`, Snyk, Dependabot) 定期掃描第三方函式庫的已知漏洞？
*   `[ ]` **更新策略:** 是否有流程及時更新存在高危漏洞的依賴庫？

## D. 基礎設施與運維安全 (Infrastructure & Operations Security)

### D.1 網路安全 (Network Security)
*   `[ ]` **防火牆/安全組:** 網路訪問是否遵循最小開放原則？
*   `[ ]` **DDoS 防護:** 是否有 DDoS 緩解措施 (e.g., AWS Shield, Cloudflare)？

### D.2 機密管理 (Secrets Management)
*   `[ ]` **安全儲存:** API Keys, 資料庫密碼等機密信息是否使用專用的機密管理系統 (e.g., AWS Secrets Manager, Vault) 進行儲存？嚴禁硬編碼或存儲在版本控制中。
*   `[ ]` **權限與輪換:** 對機密的訪問權限是否遵循最小權限原則？是否有自動輪換機制？

### D.3 Docker/容器安全 (Container Security)
*   `[ ]` **最小化基礎鏡像:** 基礎鏡像是否來自受信任的來源，且是最小化的 (e.g., distroless, alpine)？
*   `[ ]` **非 Root 用戶運行:** 容器是否以非 root 用戶運行？
*   `[ ]` **鏡像掃描:** CI/CD 流程中是否包含對容器鏡像的漏洞掃描？

### D.4 日誌與監控 (Logging & Monitoring)
*   `[ ]` **安全事件日誌:** 是否記錄了足夠的安全相關事件 (e.g., 登錄失敗、權限變更)？
*   `[ ]` **安全告警:** 是否針對可疑活動和安全事件配置了實時告警？

## E. 合規性 (Compliance)
*   `[ ]` **法規識別:** 是否已識別專案需要遵循的所有相關法律法規 (e.g., GDPR, CCPA, HIPAA)？
*   `[ ]` **合規性措施:** 是否已將合規性要求落實到設計和實現中？

## F. 審查結論與行動項 (Review Conclusion & Action Items)

*   **主要風險 (Key Risks Identified):**
    *   `[風險 1: 描述, 評級: 高/中/低]`
    *   `[風險 2: 描述, 評級: 高/中/低]`
*   **行動項 (Action Items):**

| # | 行動項描述 | 負責人 | 預計完成日期 | 狀態 |
|:-:| :--- | :--- | :--- | :--- |
| 1 | `[修復 XX 漏洞]` | `[開發者 A]` | `YYYY-MM-DD` | `待辦` |
| 2 | `[增加 YY 安全機制]` | `[開發者 B]` | `YYYY-MM-DD` | `待辦` |

*   **整體評估 (Overall Assessment):** `[對專案/功能的整體安全與隱私態勢給出評價 (e.g., 在完成上述行動項前不建議上線)。]`

---
**簽署 (Sign-off):**

*   **安全審查團隊代表:** _______________
*   **專案/功能負責人:** _______________

---

## G. 生產準備就緒 (Production Readiness)

*此部分旨在確保系統在上線前，在可觀測性、可靠性、可擴展性和可維護性等方面已達到生產標準。*

### G.1 可觀測性 (Observability)
*   `[ ]` **監控儀表板 (Monitoring Dashboard):** 是否已為此服務建立核心指標的監控儀表板 (例如，在 Grafana, Datadog)？
*   `[ ]` **核心指標 (Key Metrics - SLIs):** 是否已定義並暴露服務等級指標 (SLIs)，如：請求延遲 (Latency)、流量 (Traffic)、錯誤率 (Errors)、飽和度 (Saturation)？
*   `[ ]` **日誌 (Logging):** 應用程式日誌是否為結構化日誌 (e.g., JSON)？是否已接入中央日誌系統 (e.g., Loki, ELK)？日誌級別是否可在運行時調整？
*   `[ ]` **全鏈路追蹤 (Distributed Tracing):** 是否已集成全鏈路追蹤 (e.g., OpenTelemetry)，並能在生產環境中採樣？
*   `[ ]` **告警 (Alerting):** 是否已為關鍵故障場景 (e.g., 錯誤率飆升, 延遲超標) 配置了自動告警？告警是否能準確通知到 On-call 負責人？

### G.2 可靠性與彈性 (Reliability & Resilience)
*   `[ ]` **健康檢查 (Health Checks):** 是否已實現 `/health` 或 `/ready` 端點，供負載均衡器或 K8s 進行健康檢查？
*   `[ ]` **優雅啟停 (Graceful Shutdown):** 應用程式是否能處理 `SIGTERM` 信號，實現優雅關閉（完成進行中的請求，釋放資源）？
*   `[ ]` **重試與超時 (Retries & Timeouts):** 對外部服務的調用是否配置了合理的超時和重試機制（如指數退避）？
*   `[ ]` **故障轉移 (Failover):** 系統的關鍵組件（如資料庫、快取）是否有故障轉移機制？
*   `[ ]` **備份與恢復 (Backup & Recovery):** 是否有自動化的數據備份機制？恢復流程是否經過演練並有文檔記錄？

### G.3 性能與可擴展性 (Performance & Scalability)
*   `[ ]` **負載測試 (Load Testing):** 是否已進行負載測試，以了解系統在預期峰值負載下的性能表現？
*   `[ ]` **容量規劃 (Capacity Planning):** 是否已根據負載測試結果和業務預期，規劃了足夠的資源 (CPU, Memory, IOPS)？
*   `[ ]` **水平擴展 (Horizontal Scaling):** 服務是否設計為無狀態？是否可以簡單地通過增加實例數量來水平擴展？
*   `[ ]` **依賴擴展性:** 系統依賴的所有下游服務（資料庫、其他微服務）是否也能滿足擴展性需求？

### G.4 可維護性與文檔 (Maintainability & Documentation)
*   `[ ]` **部署文檔/腳本 (Runbook/Playbook):** 是否有清晰的文檔或自動化腳本來指導如何部署、回滾和排查此服務？
*   `[ ]` **CI/CD:** 是否已建立完整的持續整合/持續部署 (CI/CD) 流水線？
*   `[ ]` **配置管理 (Configuration Management):** 服務的所有配置是否都集中管理（如 ConfigMap, Vault），而不是硬編碼在代碼或鏡像中？
*   `[ ]` **功能開關 (Feature Flags):** 對於有風險的重大變更，是否使用了功能開關以便於快速啟用/禁用？ 