# 🌐 API 設計助手

像娜美畫航海圖一樣精確地設計 API！

## API 設計流程

### 1. 📋 需求分析

#### 資源識別
- **主要資源**: [列出核心資源]
- **子資源**: [相關的子資源]
- **關聯關係**: [資源之間的關係]

#### 操作定義
- **CRUD 操作**: Create, Read, Update, Delete
- **特殊操作**: [業務特定的操作]
- **批量操作**: [需要批量處理的場景]

### 2. 🏗️ RESTful 設計

#### 端點設計
```yaml
# 資源集合
GET    /api/v1/resources          # 列表（支援分頁、篩選、排序）
POST   /api/v1/resources          # 創建新資源

# 單一資源
GET    /api/v1/resources/:id      # 獲取詳情
PUT    /api/v1/resources/:id      # 完整更新
PATCH  /api/v1/resources/:id      # 部分更新
DELETE /api/v1/resources/:id      # 刪除

# 子資源
GET    /api/v1/resources/:id/sub-resources     # 子資源列表
POST   /api/v1/resources/:id/sub-resources     # 創建子資源

# 特殊操作
POST   /api/v1/resources/:id/action            # 執行特定動作
GET    /api/v1/resources/search                # 搜尋
POST   /api/v1/resources/bulk                  # 批量操作
```

#### 查詢參數設計
```typescript
// 分頁
?page=1&limit=20

// 排序
?sort=created_at:desc,name:asc

// 篩選
?status=active&type=premium

// 搜尋
?q=keyword

// 欄位選擇
?fields=id,name,email

// 關聯載入
?include=author,comments.user
```

### 3. 📦 請求/回應格式

#### 請求格式
```typescript
// 創建資源
POST /api/v1/users
{
  "data": {
    "type": "users",
    "attributes": {
      "email": "user@example.com",
      "name": "John Doe",
      "password": "SecurePassword123!"
    }
  }
}

// 更新資源
PATCH /api/v1/users/123
{
  "data": {
    "type": "users",
    "id": "123",
    "attributes": {
      "name": "Jane Doe"
    }
  }
}
```

#### 成功回應
```typescript
// 單一資源
{
  "data": {
    "type": "users",
    "id": "123",
    "attributes": {
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "relationships": {
      "posts": {
        "data": [
          { "type": "posts", "id": "1" },
          { "type": "posts", "id": "2" }
        ]
      }
    }
  },
  "included": [], // 包含的關聯資源
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z"
  }
}

// 資源列表
{
  "data": [...],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  },
  "links": {
    "first": "/api/v1/users?page=1",
    "last": "/api/v1/users?page=5",
    "prev": null,
    "next": "/api/v1/users?page=2"
  }
}
```

#### 錯誤回應
```typescript
{
  "errors": [
    {
      "id": "error-uuid",
      "status": "422",
      "code": "VALIDATION_ERROR",
      "title": "Validation Failed",
      "detail": "The email field is required",
      "source": {
        "pointer": "/data/attributes/email"
      },
      "meta": {
        "timestamp": "2024-01-01T00:00:00Z"
      }
    }
  ]
}
```

### 4. 🔐 認證授權

#### 認證機制
```typescript
// JWT Bearer Token
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
}

// API Key
headers: {
  'X-API-Key': 'your-api-key-here'
}

// OAuth 2.0
// 1. 獲取授權碼
GET /oauth/authorize?
  response_type=code&
  client_id=CLIENT_ID&
  redirect_uri=REDIRECT_URI&
  scope=read:user

// 2. 交換 Token
POST /oauth/token
{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE",
  "client_id": "CLIENT_ID",
  "client_secret": "CLIENT_SECRET"
}
```

#### 權限控制
```typescript
// RBAC (角色基礎存取控制)
{
  "user": {
    "id": "123",
    "roles": ["admin", "editor"],
    "permissions": [
      "users:read",
      "users:write",
      "posts:*"
    ]
  }
}

// 權限檢查中間件
function authorize(permission) {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        error: "Insufficient permissions"
      })
    }
    next()
  }
}
```

### 5. 📝 資料驗證

#### Schema 驗證
```typescript
import { z } from 'zod'

// 使用者創建 Schema
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string()
    .min(8)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number'),
  age: z.number().int().min(0).max(150).optional(),
  role: z.enum(['user', 'admin', 'moderator']).default('user')
})

// 驗證中間件
const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body)
    next()
  } catch (error) {
    res.status(422).json({
      errors: error.errors
    })
  }
}
```

### 6. 📊 API 版本管理

#### 版本策略
```typescript
// URL 路徑版本
/api/v1/users
/api/v2/users

// Header 版本
headers: {
  'Accept': 'application/vnd.api+json;version=2'
}

// 查詢參數版本
/api/users?version=2
```

#### 向後相容
```typescript
// 版本轉換中間件
function versionAdapter(req, res, next) {
  const version = req.headers['api-version'] || 'v1'

  if (version === 'v1') {
    // 轉換 v1 格式到 v2
    if (req.body.username) {
      req.body.name = req.body.username
      delete req.body.username
    }
  }

  next()
}
```

### 7. 🚦 Rate Limiting

```typescript
const rateLimit = {
  // 基本限制
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 100, // 最多 100 個請求

  // 動態限制
  keyGenerator: (req) => {
    return req.user?.id || req.ip
  },

  // 自定義回應
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: req.rateLimit.resetTime
    })
  },

  // Headers
  standardHeaders: true,
  legacyHeaders: false
}
```

### 8. 📚 API 文檔

#### OpenAPI/Swagger 規範
```yaml
openapi: 3.0.0
info:
  title: API 名稱
  version: 1.0.0
  description: API 描述

paths:
  /api/v1/users:
    get:
      summary: 獲取用戶列表
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        200:
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
        name:
          type: string
```

## 輸出格式

### API 規範文檔
```markdown
# API: [資源名稱]

## 端點清單
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/resources | 獲取列表 |
| POST | /api/v1/resources | 創建資源 |

## 請求/回應範例
[具體的範例]

## 錯誤碼
| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |

## 認證方式
[認證說明]
```

### 實作程式碼
生成完整的 Controller/Service/Model 程式碼