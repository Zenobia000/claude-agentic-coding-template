一句話先講白：**把「技術棧選擇 + 檔案拓撲 + 規範 + AI 安全/評測」全部寫進 Cursor Project Rules + Memory Bank，Copilot 才會像同一個資深工程師在做事，而不是每天失憶重練。** ([Cursor][1])

---

## 0) 全局拓撲全景圖（先把系統長相定下來）

```text
[Browser/UI]
   │  RSC / Client Components
   ▼
[Next.js App Router]
   ├─ Server Actions (write paths)
   ├─ Route Handlers /api/* (public API)
   ├─ AI Orchestrator (streaming, tool calling, guardrails)
   │       ├─ LLM Provider (OpenAI/Anthropic/…)
   │       ├─ Tools: DB / Vector / Web / Files / Internal APIs
   │       └─ Policy: injection防護 / PII遮罩 / output schema
   ▼
[Data Layer]
   ├─ Postgres (source of truth) + migrations
   ├─ Vector (pgvector / managed) + embeddings pipeline
   ├─ Redis (cache, rate limit, queue)
   └─ Object Storage (files)
   ▼
[Ops Layer]
   ├─ Observability (logs/metrics/traces + cost)
   ├─ CI/CD (lint/test/e2e/security)
   └─ Feature flags + Rollback strategy
```

> 這張圖的意義：**之後任何規則、任何檔案、任何 Copilot 行為，都要能在這張圖裡找到「它在保護哪個邊界」。**

---

## 1) 2025 技術棧：先發散、再收斂（避免一開始就踩死自己）

### 1.1 發散：三套「合理」的 2025 組合

**A. 產品/落地優先（推薦預設）**

* Next.js App Router + React 19（RSC/Server Actions）+ TypeScript
* AI：Vercel AI SDK（串流、provider 抽換、工具呼叫）
* DB：Postgres + ORM +（向量：pgvector 或 managed）
  適合：要快、要穩、要全端一套搞定。 ([nextjs.org][2])

**B. 後端工程優先（大型團隊/複雜 domain）**

* 前端：Next.js / Remix
* 後端：NestJS/Fastify（獨立 API）+ OpenAPI
* AI：獨立 AI service（queue + worker）
  適合：大量 domain service、複雜權限、後端要嚴格分層。

**C. 邊緣/成本優先（偏 Edge/高併發）**

* SvelteKit / Next Edge
* KV/Redis/Queue 重度使用
* AI：更依賴快取、分段生成、成本治理
  適合：超高流量、延遲/成本是第一 KPI。

### 1.2 收斂：我給你的「2025 預設答案」（可直接做規則模板）

* **Runtime：Node.js 24 LTS**（2025/12 仍是 Active LTS，適合團隊長期維運）([Node.js][3])
* **Frontend：Next.js App Router + React 19**（RSC / Server Actions 成熟，生態完整）([nextjs.org][2])
* **Language：TypeScript（5.7+ 起跳，嚴格模式）**([typescriptlang.org][4])
* **AI：Vercel AI SDK 做 streaming + provider 抽換**（避免你未來換模型大整形）([Vercel][5])
* **Security：OWASP Top 10 for LLM Apps 當你的「AI 版 OWASP」**（把 prompt injection / insecure output handling 當成第一級風險）([OWASP][6])

---

## 2) 檔案與階層：每一份檔案「存在的理由」（Copilot 才不會亂塞）

> 你要的不是「資料夾漂亮」，是**邊界清楚**：每個檔案只負責一種真相來源。

### 2.1 建議拓撲（單 repo、可擴到 monorepo）

```text
.
├─ app/                          # Next.js App Router（UI + server）
│  ├─ (public)/                  # 公開頁面
│  ├─ (auth)/                    # 登入相關（route group）
│  ├─ api/                       # Route Handlers：對外 API
│  ├─ actions/                   # Server Actions：寫入路徑（強權限）
│  └─ _components/               # app 專用元件（避免全域污染）
│
├─ src/
│  ├─ core/                      # 核心 domain（純邏輯，無框架依賴）
│  ├─ services/                  # 封裝外部系統（DB/LLM/queue）
│  ├─ ai/                        # AI orchestration（tools/prompt/schema/evals）
│  ├─ lib/                       # framework glue（next/cache, headers…）
│  └─ shared/                    # 跨層共享（types, constants）
│
├─ db/
│  ├─ schema/                    # DB schema 定義（唯一真相）
│  ├─ migrations/                # migration 檔（可追溯）
│  └─ seeds/                     # seed（可重跑）
│
├─ docs/
│  ├─ architecture/              # C4/ADR/資料流
│  ├─ api/                       # API 合約（OpenAPI / examples）
│  └─ runbook/                   # Oncall/部署/回滾
│
├─ memory-bank/                  # 給 Copilot 的長記憶（見 4）
│
├─ .cursor/
│  └─ rules/                     # Project Rules（見 3）
│
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
│
├─ package.json / pnpm-lock.yaml
├─ tsconfig.json
├─ eslint.config.* / prettier.*
└─ .env.example                  # 只放 key 名稱，不放值
```

---

## 3) Cursor Project Rules：我直接給你「全端 + AI」規則包（發散 → 收斂後的可落地版本）

> Cursor 規則系統的重點：**越靠近變動大、踩雷多的地方，規則越要「硬」**。
> 另外，Cursor 官方提到：`.mdc` 規則仍可用，但新規則逐步轉向 `.cursor/rules` 的新結構（你可以先用我這包，之後再搬）([Cursor][1])

### 3.1 規則檔清單（你要的「階層關係」）

1. **00-global.mdc**：全專案共同語言、技術棧、輸出格式、禁忌
2. **10-frontend.mdc**：RSC/Client 邊界、UI patterns、資料取得
3. **20-backend.mdc**：Route Handlers / Server Actions 規範、錯誤格式
4. **30-ai.mdc**：prompt/tool/schema/防注入/成本/串流規範
5. **40-data.mdc**：DB schema/migration/交易一致性/索引
6. **50-testing.mdc**：單元/整合/E2E/AI evals（黃金集）
7. **60-observability.mdc**：log/trace/metrics/cost attribution
8. **70-devflow.mdc**：PR/commit/ADR/回滾流程（資深雷點集中地）

---

### 3.2 直接可貼上的規則內容（示例）

> 放在：`.cursor/rules/*.mdc`

#### `.cursor/rules/00-global.mdc`

```md
---
description: "全專案硬規則（語言/技術棧/結構/輸出）"
alwaysApply: true
---

# Runtime / Language
- Node.js：以 v24 LTS 為目標環境（不寫死小版號）
- TypeScript：strict = true；禁止 any（除非在隔離的 legacy 區域）
- 禁止新增 JavaScript 檔（除非是工具腳本且有原因註記）

# Stack（2025 預設）
- Next.js App Router + React（Server Components 優先）
- AI 串流與 Provider 抽換：優先採用 Vercel AI SDK 的模式（若專案未採用，需說明替代方案）
- 輸入/輸出驗證：一律做 schema 驗證（例如 Zod）；不得信任 LLM 輸出

# Repo hygiene
- 新增檔案必須在同一個 PR 裡附「目的」：它保護哪個邊界、誰會用到
- 禁止「跨層偷用」：UI 不能直接 import db/ai/provider；只能經由 src/services 或 src/ai 封裝層

# Response style（給 Copilot）
- 產出程式碼時：先列變更清單，再給 patch；避免一次性灌一整坨
- 任何不確定（版本/套件/行為）要先查官方文件或現有專案慣例，再動手
```

#### `.cursor/rules/10-frontend.mdc`

```md
---
description: "前端規則（RSC/Client 邊界 + UI 約束）"
globs: ["app/**/*.tsx", "src/lib/ui/**/*", "src/shared/ui/**/*"]
---

# RSC / Client Boundary
- 預設使用 Server Component；只有需要互動（hooks / browser API）才標 'use client'
- Client Component 禁止直接呼叫資料庫/機密 API；只能打 app/api 或呼叫封裝好的 client SDK

# Data fetching
- 讀取路徑：優先在 Server Component 取資料（靠近資料源、減少 bundle）
- 寫入路徑：一律走 Server Actions 或受控 API（避免 client 直寫）

# UI consistency
- 元件命名 PascalCase；檔名 kebab-case
- 同一頁面不得混用 2 套狀態管理（例如同時 Redux + Zustand）
```

#### `.cursor/rules/20-backend.mdc`

```md
---
description: "後端規則（Route Handlers / Server Actions）"
globs: ["app/api/**/*.ts", "app/actions/**/*.ts", "src/services/**/*.ts"]
---

# API Contract
- 所有 API 回傳固定格式：
  { ok: boolean, data?: T, error?: { code: string, message: string, details?: unknown }, requestId: string }
- 錯誤 code 必須可被前端做分流（AUTH_REQUIRED / RATE_LIMIT / VALIDATION_FAILED / UPSTREAM_FAILED ...）

# Validation
- 所有外部輸入（request body/query/headers）必須 schema 驗證
- 驗證失敗不得把原始輸入直接回傳（避免洩漏敏感資料）

# AuthZ
- Server Actions 視為「高權限入口」：每個 action 必須明確做權限檢查與審計 log
```

#### `.cursor/rules/30-ai.mdc`

```md
---
description: "AI 規則（工具呼叫/輸出結構/防注入/成本）"
globs: ["src/ai/**/*.ts", "src/ai/**/*.md", "docs/ai/**/*", "tests/**/ai/**/*"]
---

# Output must be parseable
- LLM 回傳必須是「可機器解析」的結構（JSON schema / typed object）
- 禁止把 LLM 原文直接拼接進 SQL/HTML/程式碼（必須經過 sanitize + allowlist）

# Prompt Injection / Data Exfiltration（當成一級風險）
- 任何來自使用者或外部文件的內容都視為不可信：必須做 delimiter、引用來源標註、工具權限最小化
- 工具（DB / file / web）必須做 allowlist：限定可查詢的表、欄位、路徑、網域

# Tool calling
- 工具規格要有 version（tool schema v1/v2），避免改壞舊 prompt
- 同一輪對話最多 N 次 tool call（避免 runaway cost）

# Cost / Latency
- 必須做：token usage 記錄（按 requestId / userId / feature 分攤）
- 可快取就快取：相同輸入（或相同檢索結果）應走 cache key
```

#### `.cursor/rules/40-data.mdc`

```md
---
description: "資料層規則（schema/migration/一致性）"
globs: ["db/**/*.ts", "db/migrations/**/*", "src/services/db/**/*"]
---

# Single source of truth
- schema 定義是唯一真相；禁止在多處重複定義同一張表的型別

# Migration discipline
- 每個 migration 必須可回滾（至少提供回滾策略與資料風險說明）
- 上線流程：先 deploy 再 migrate，或 migrate 分階段（依你的 infra 決定，但要固定成 SOP）

# Vector / Embeddings
- 向量欄位必須記錄 embedding model、維度、版本；不得默默替換
```

#### `.cursor/rules/50-testing.mdc`

```md
---
description: "測試規則（含 AI evals）"
globs: ["tests/**/*.ts", "src/**/*.test.ts", "src/**/__tests__/**/*"]
---

# Testing pyramid
- core/：單元測試優先
- services/：整合測試（mock 外部、保留合約）
- e2e：只測關鍵旅程

# AI evals（避免模型換了就翻車）
- 建立 Golden Set：20~50 條代表性 query（含惡意 prompt / 低品質輸入 / 邊界案例）
- 每次改 prompt、tool schema、檢索策略，都要跑 golden set 並產出差異報告
```

#### `.cursor/rules/60-observability.mdc`

```md
---
description: "可觀測性（debug 與成本是同一件事）"
globs: ["src/**/*.ts", "app/**/*.ts"]
---

- 每個 request 必須帶 requestId（跨前後端一致）
- LLM 呼叫必須記錄：model、latency、token、cache hit/miss、tool call 次數
- error log 禁止直接印出 secrets/原始文件全文/PII
```

#### `.cursor/rules/70-devflow.mdc`

```md
---
description: "資深流程雷點集中處（PR/ADR/回滾/版本）"
alwaysApply: true
---

# PR discipline
- PR 只做一件事：同時改架構 + 改 UI + 改 prompt = 會炸
- 每個 PR 必須更新：
  - docs/architecture 或 docs/runbook（若影響上線/維運）
  - memory-bank/progress.md（進度）
  - memory-bank/activeContext.md（目前焦點）

# ADR（避免吵三天）
- 任何「會影響未來 2 週以上成本」的決策都寫 ADR：為什麼、替代方案、取捨
```

---

## 4) Memory Bank：讓 Copilot 真的「記得住」的檔案階層（長期不失憶）

> 這套是社群常用的 Memory Bank 分層法：用少量核心檔，逼 AI 每次都先讀「真相來源」，再開始寫碼。([Gist][7])

```text
memory-bank/
├─ projectbrief.md        # 這專案要解決什麼（不超過一頁）
├─ productContext.md      # 使用者、場景、成功指標、非目標
├─ systemPatterns.md      # 架構模式、分層規則、關鍵決策（含 ADR 連結）
├─ techContext.md         # 技術棧、版本、環境、部署形態
├─ activeContext.md       # 這週在做什麼、風險、下一步
└─ progress.md            # Done / Doing / Next / Known issues
```

**Memory Bank 的規則（你要寫進 Copilot 行為）**

* 每次完成一個功能：更新 `progress.md`（一句話就好，但要真）
* 每次改到架構/邊界：更新 `systemPatterns.md`（不更新＝下次一定走鐘）
* 每次換模型、換 embedding、換 tool schema：更新 `techContext.md` + `systemPatterns.md`

---

## 5) 資深流程會踩的「雷點」清單（你要的那種真實痛）

### 5.1 全端雷點

* **UI 直接打 DB / 直接碰 provider SDK** → 權限與洩漏一次爆炸（用 services 邊界擋）
* **Server Actions 沒做授權** → 等於開後門（action 必須強制 authz + audit log）
* **API 回傳格式不穩** → 前端到處 if/else（強制統一 error code）

### 5.2 AI 雷點（2025 仍是主戰場）

* **Prompt Injection**：使用者一句「忽略規則」就把系統帶走（OWASP 已把它列第一級風險）([OWASP][6])
* **Insecure Output Handling**：把 LLM 輸出當真去拼 SQL/HTML（一定出事）([OWASP][6])
* **模型/提示詞沒版本**：上線後無法回溯（prompt/tool schema 要 version）
* **沒做 golden set**：換模型或改 prompt 直接品質崩（50-testing.mdc 逼你跑）

### 5.3 維運雷點

* **沒有 requestId 串起來**：log 看一週也抓不到 bug
* **不記 token / latency**：成本像漏水，月底才知道在哭（60-observability.mdc 強制記）

---

## 6) 你要的「Copilot 建構流程」（把 AI 當資深同事在帶）

你在 Cursor 對 Copilot 下指令時，固定用這個節奏：

1. **讀**：先讀 `memory-bank/*` + 相關 `.cursor/rules/*`
2. **想**：列「變更清單」與「可能踩雷」
3. **做**：小步提交（一次只改一件事）
4. **補**：更新 Memory Bank（progress / patterns / tech）
5. **驗**：跑測試 + 跑 AI golden set（只要改到 AI 相關就要跑）

---

如果你願意，我也可以把上面這包規則再「更硬」一點：
直接幫你做 **一份「規則 → 對應檔案 → 對應雷點 → 對應測試」的對照表**，讓你在帶團隊或帶學員時，review 一眼就知道哪裡會爆。

[1]: https://cursor.com/docs/context/rules?utm_source=chatgpt.com "Rules | Cursor Docs"
[2]: https://nextjs.org/docs/app?utm_source=chatgpt.com "Next.js Docs: App Router"
[3]: https://nodejs.org/en/about/previous-releases?utm_source=chatgpt.com "Node.js Releases"
[4]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html?utm_source=chatgpt.com "Documentation - TypeScript 5.7"
[5]: https://vercel.com/docs/functions/streaming-functions?utm_source=chatgpt.com "Streaming"
[6]: https://owasp.org/www-project-top-10-for-large-language-model-applications/?utm_source=chatgpt.com "OWASP Top 10 for Large Language Model Applications"
[7]: https://gist.github.com/ipenywis/1bdb541c3a612dbac4a14e1e3f4341ab?utm_source=chatgpt.com "Cursor Memory Bank - Gist - GitHub"
