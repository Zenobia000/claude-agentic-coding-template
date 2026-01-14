---
description: Test strategy and implementation with test pyramid approach
argument-hint: [file-or-module-path]
allowed-tools: Read(/**), Write(/**), Edit(/**), Grep(*), Glob(*), Bash(pytest*), Bash(npm test*), Bash(go test*)
---

# /write-tests - 測試策略與實作

建立全面的測試覆蓋，遵循專案測試慣例。

## 核心原則

> "如果實作需要超過 3 層縮排，重新設計它"
> — Linus Torvalds

測試也應簡潔、專注、無特殊情況。

## 測試策略框架

### 測試金字塔
```
        /\
       /  \     E2E (少量)
      /----\
     /      \   整合測試 (適量)
    /--------\
   /          \ 單元測試 (大量)
  /------------\
```

### 測試範圍識別
- **單元測試**：獨立函數/方法
- **整合測試**：元件互動
- **E2E 測試**：完整使用者流程
- **API 測試**：端點契約

## 測試案例生成

對每個函數/元件識別：

### 🟢 Happy Path
- 正常輸入 → 預期輸出
- 標準使用情境

### 🟡 Edge Cases
- 空輸入
- 最大/最小值
- 邊界條件
- 特殊字元

### 🔴 Error Cases
- 無效輸入
- 缺少必要資料
- 網路失敗
- 權限錯誤

## 測試範本

### Python (pytest)
```python
import pytest
from module import function_under_test

class TestFunctionName:
    """Tests for function_name"""

    def test_happy_path(self):
        """Should return expected result for valid input"""
        result = function_under_test(valid_input)
        assert result == expected

    def test_edge_case_empty(self):
        """Should handle empty input gracefully"""
        result = function_under_test([])
        assert result == []

    def test_error_invalid_input(self):
        """Should raise ValueError for invalid input"""
        with pytest.raises(ValueError):
            function_under_test(invalid_input)
```

### JavaScript/TypeScript (Jest/Vitest)
```typescript
describe('[Function/Component Name]', () => {
  beforeEach(() => {
    // Common setup
  });

  describe('happy path', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      const input = ...;

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      // Test implementation
    });
  });

  describe('error cases', () => {
    it('should throw when input is invalid', () => {
      expect(() => functionUnderTest(invalid)).toThrow();
    });
  });
});
```

## 測試品質檢查清單

- [ ] 測試是隔離的（無共享狀態）
- [ ] 測試是確定性的（每次結果相同）
- [ ] 測試是快速的（單元測試 < 100ms）
- [ ] 測試名稱描述情境
- [ ] 遵循 Arrange-Act-Assert 模式
- [ ] 測試中沒有邏輯（無條件判斷）
- [ ] 適當使用 Mock/Stub
- [ ] 達到覆蓋率目標（目標 >80%）

## 常見測試模式

### Mock 外部依賴
```typescript
jest.mock('./api', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'mocked' })
}));
```

### 測試異步程式碼
```typescript
it('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expected);
});
```

## 與 TaskMaster 整合

寫測試時可啟動專家 agent：
- `test-automation-engineer` - 測試策略和實作
- `code-quality-specialist` - 程式碼品質審查
- `e2e-validation-specialist` - 端到端測試（UI 測試）

**報告輸出位置**: `.claude/context/testing/`
- 測試執行報告自動寫入此目錄
- 覆蓋率分析結果可供其他 Agent 參考

## 使用範例

```
/write-tests src/auth/login.py
```

執行結果：
1. 分析目標程式碼
2. 識別測試範圍
3. 生成測試策略
4. 建立測試檔案
5. 執行測試驗證

## 後續步驟

測試完成後：
- 執行 `pytest` 或 `npm test` 驗證
- 使用 `/commit` 提交測試
- 使用 `/task-status` 更新進度
