# ⚡ 效能優化

像索隆的三刀流一樣快速！讓程式碼跑得飛快！

## 效能分析

### 1. 🔍 效能瓶頸識別

#### 前端效能檢查
- [ ] **首次載入時間 (FCP)**：目標 < 2s
- [ ] **可互動時間 (TTI)**：目標 < 3.5s
- [ ] **最大內容繪製 (LCP)**：目標 < 2.5s
- [ ] **累積版面配置偏移 (CLS)**：目標 < 0.1
- [ ] **首次輸入延遲 (FID)**：目標 < 100ms

#### 後端效能檢查
- [ ] **API 回應時間**：P50 < 100ms, P95 < 500ms
- [ ] **資料庫查詢時間**：< 50ms
- [ ] **記憶體使用**：< 512MB
- [ ] **CPU 使用率**：< 70%

### 2. 📊 效能測量工具

```javascript
// 前端效能測量
const measurePerformance = () => {
  // Web Vitals
  const CLS = /* 累積版面配置偏移 */
  const FID = /* 首次輸入延遲 */
  const LCP = /* 最大內容繪製 */

  // 自定義指標
  const customMetrics = {
    apiCallDuration: [],
    renderTime: [],
    bundleSize: 0
  }

  return { CLS, FID, LCP, customMetrics }
}

// 後端效能測量
const performanceMiddleware = (req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.url}: ${duration}ms`)
  })

  next()
}
```

### 3. 🚀 優化策略

#### 前端優化

##### Bundle 優化
```javascript
// Code Splitting
const LazyComponent = lazy(() => import('./HeavyComponent'))

// Tree Shaking
import { specific } from 'large-library'  // ✅
// import * as all from 'large-library'  // ❌

// 動態導入
if (condition) {
  const module = await import('./conditional-module')
}
```

##### 渲染優化
```javascript
// React.memo 防止不必要重渲染
const MemoizedComponent = memo(Component, (prev, next) => {
  return prev.id === next.id
})

// useMemo 快取昂貴計算
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// useCallback 快取函數
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])

// 虛擬列表
import { FixedSizeList } from 'react-window'
```

##### 資源優化
```javascript
// 圖片優化
<Image
  src="/hero.webp"  // WebP 格式
  loading="lazy"     // 延遲載入
  decoding="async"   // 非同步解碼
  sizes="(max-width: 768px) 100vw, 50vw"
  srcSet="..."       // 響應式圖片
/>

// 字體優化
<link
  rel="preload"
  href="/fonts/main.woff2"
  as="font"
  crossOrigin="anonymous"
/>
```

#### 後端優化

##### 資料庫優化
```sql
-- 建立索引
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_post_user_date ON posts(user_id, created_at);

-- 查詢優化
-- ❌ N+1 問題
SELECT * FROM users;
-- 然後對每個用戶
SELECT * FROM posts WHERE user_id = ?;

-- ✅ 使用 JOIN
SELECT u.*, p.*
FROM users u
LEFT JOIN posts p ON u.id = p.user_id;
```

##### 快取策略
```javascript
// Redis 快取
const cacheMiddleware = async (req, res, next) => {
  const key = `cache:${req.url}`
  const cached = await redis.get(key)

  if (cached) {
    return res.json(JSON.parse(cached))
  }

  // 儲存原始 send 方法
  const originalSend = res.json
  res.json = function(data) {
    redis.setex(key, 3600, JSON.stringify(data))
    originalSend.call(this, data)
  }

  next()
}

// 記憶體快取
const memCache = new Map()
const CACHE_TTL = 60000 // 1 分鐘

function memoize(fn) {
  return async (...args) => {
    const key = JSON.stringify(args)
    const cached = memCache.get(key)

    if (cached && Date.now() - cached.time < CACHE_TTL) {
      return cached.value
    }

    const result = await fn(...args)
    memCache.set(key, { value: result, time: Date.now() })
    return result
  }
}
```

##### 並發優化
```javascript
// 使用 Worker Threads
const { Worker } = require('worker_threads')

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-task.js', {
      workerData: data
    })

    worker.on('message', resolve)
    worker.on('error', reject)
  })
}

// 批量處理
async function batchProcess(items, batchSize = 100) {
  const results = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    )
    results.push(...batchResults)
  }

  return results
}
```

### 4. 📈 效能監控

#### 設定監控指標
```javascript
// Prometheus 指標
const promClient = require('prom-client')

const httpDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
})

// 記錄指標
app.use((req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000
    httpDuration
      .labels(req.method, req.route?.path || req.url, res.statusCode)
      .observe(duration)
  })

  next()
})
```

### 5. ✅ 優化檢查清單

#### 必要優化
- [ ] 移除未使用的程式碼
- [ ] 壓縮 JavaScript/CSS
- [ ] 優化圖片格式和大小
- [ ] 啟用 Gzip/Brotli 壓縮
- [ ] 設定適當的快取標頭

#### 進階優化
- [ ] 實施 Service Worker
- [ ] 使用 CDN
- [ ] 資料庫連線池
- [ ] 實施 Rate Limiting
- [ ] 使用 HTTP/2 或 HTTP/3

#### 監控設定
- [ ] 設定 APM 工具
- [ ] 配置錯誤追蹤
- [ ] 建立效能儀表板
- [ ] 設定警報閾值

## 輸出報告格式

### 效能基準
```markdown
## Before Optimization
- FCP: X.Xs
- LCP: X.Xs
- TTI: X.Xs
- Bundle Size: XXX KB
- API Response: XXXms (P95)

## After Optimization
- FCP: X.Xs (↓ XX%)
- LCP: X.Xs (↓ XX%)
- TTI: X.Xs (↓ XX%)
- Bundle Size: XXX KB (↓ XX%)
- API Response: XXXms (↓ XX%)
```

### 實施的優化
1. ✅ [優化項目 1] - 改善 XX%
2. ✅ [優化項目 2] - 改善 XX%
3. ✅ [優化項目 3] - 改善 XX%

### 建議的後續優化
1. [建議 1] - 預期改善 XX%
2. [建議 2] - 預期改善 XX%