# 🧪 測試撰寫

像烏索普的彈弓一樣精準的測試！

## 測試策略

### 1. 📋 測試範圍分析
分析需要測試的內容：
- **核心功能**: 主要業務邏輯
- **邊界條件**: 極端值、空值、異常輸入
- **錯誤處理**: 異常情況、錯誤路徑
- **整合點**: API、資料庫、第三方服務

### 2. 🎯 測試類型

#### 單元測試 (Unit Tests)
```typescript
describe('FunctionName', () => {
  it('should handle normal case', () => {
    // Arrange
    const input = ...

    // Act
    const result = functionName(input)

    // Assert
    expect(result).toBe(expected)
  })

  it('should handle edge case', () => {
    // 邊界條件測試
  })

  it('should throw error for invalid input', () => {
    // 錯誤處理測試
  })
})
```

#### 整合測試 (Integration Tests)
```typescript
describe('API Endpoint', () => {
  it('should return correct response', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200)

    expect(response.body).toMatchObject({
      // 預期結構
    })
  })
})
```

#### E2E 測試 (End-to-End Tests)
```typescript
test('user flow', async ({ page }) => {
  await page.goto('/')
  await page.click('button[data-testid="login"]')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/dashboard')
})
```

### 3. 📊 測試案例設計

#### 測試矩陣
| 輸入類型 | 預期結果 | 優先級 |
|---------|---------|--------|
| 正常輸入 | 正確輸出 | 高 |
| 空值 | 錯誤處理 | 高 |
| 邊界值 | 正確處理 | 中 |
| 異常格式 | 錯誤訊息 | 中 |
| 極大值 | 效能正常 | 低 |

### 4. 🔧 Mock 與 Stub

```typescript
// Mock 外部相依
jest.mock('./database', () => ({
  query: jest.fn().mockResolvedValue(mockData)
}))

// Spy 函數呼叫
const spy = jest.spyOn(module, 'method')

// Stub 時間
jest.useFakeTimers()
jest.setSystemTime(new Date('2024-01-01'))
```

### 5. 📈 測試品質指標

#### 覆蓋率目標
- 語句覆蓋率 (Statement): > 80%
- 分支覆蓋率 (Branch): > 75%
- 函數覆蓋率 (Function): > 90%
- 行覆蓋率 (Line): > 80%

#### 測試金字塔
```
      /\
     /E2E\     (10%)
    /------\
   /Integration\ (30%)
  /------------\
 / Unit Tests   \ (60%)
/________________\
```

### 6. ✅ 測試檢查清單

#### 測試完整性
- [ ] Happy path 測試
- [ ] Sad path 測試
- [ ] Edge cases 測試
- [ ] 異常處理測試

#### 測試品質
- [ ] 測試獨立性（不依賴順序）
- [ ] 測試可重複性
- [ ] 測試速度合理
- [ ] 測試名稱描述清楚

#### 測試維護
- [ ] 避免脆弱測試
- [ ] 適當的 mock/stub
- [ ] 清理測試資料
- [ ] 文檔說明複雜測試

### 7. 🚀 測試執行

```bash
# 執行所有測試
npm test

# 執行特定測試
npm test -- --grep "specific test"

# 測試覆蓋率
npm run test:coverage

# Watch 模式
npm run test:watch
```

## 輸出格式

生成的測試應該：
1. 遵循 AAA 模式 (Arrange-Act-Assert)
2. 使用描述性的測試名稱
3. 包含正向和負向測試案例
4. 有適當的錯誤訊息
5. 可獨立執行