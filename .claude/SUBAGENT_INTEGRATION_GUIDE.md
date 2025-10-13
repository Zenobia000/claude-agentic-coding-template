# 🤖 Subagent 整合指南

## 🎯 整合目標

TaskMaster 需要與 Claude Code 的 Subagent 系統進行深度整合，實現：
1. **智能任務分派** - 根據任務類型自動選擇最佳 Subagent
2. **資訊共享** - WBS Todo List 與 Subagent 的雙向資訊同步
3. **狀態追蹤** - 即時監控 Subagent 執行狀態
4. **結果收集** - 自動收集和整合 Subagent 執行結果

## ❓ 需要澄清的問題

### 1. Subagent 調用機制

**目前不清楚**：
- Subagent 是如何被調用的？
- 是通過特定的 API、命令還是其他機制？
- 調用時可以傳遞哪些參數和上下文資訊？

**期望了解**：
```javascript
// 期望的調用方式範例
await callSubagent('code-quality-specialist', {
    task: taskContext,
    wbsInfo: currentWBSStatus,
    projectContext: projectInfo
});
```

### 2. 資訊共享機制

**目前不清楚**：
- Subagent 是否可以訪問 TaskMaster 的 WBS 資訊？
- TaskMaster 是否可以獲得 Subagent 的執行進度？
- 是否有共享的資料存儲機制？

**期望實現**：
```json
{
    "sharedContext": {
        "projectName": "current-project",
        "currentPhase": "development",
        "wbsStatus": {
            "currentTask": "task-005",
            "progress": 60,
            "blockers": []
        },
        "availableResources": [...],
        "previousResults": [...]
    }
}
```

### 3. 狀態回報機制

**目前不清楚**：
- Subagent 是否可以主動回報執行狀態？
- 是否有標準的狀態更新格式？
- TaskMaster 如何知道 Subagent 的執行進度？

**期望格式**：
```json
{
    "agentId": "code-quality-specialist",
    "taskId": "task-005",
    "status": "in_progress",
    "progress": 75,
    "currentStep": "running eslint analysis",
    "estimatedCompletion": "2024-01-01T15:30:00Z",
    "intermediateResults": {...}
}
```

## 🔧 當前整合點

### TaskMaster 中的整合位置

```javascript
// taskmaster.js 第 165 行
async callSubagent(task, agent, hubAnalysis) {
    // TODO: 實現與 Claude Code Subagent 的實際通信
    // 需要了解 Subagent 調用機制和資訊共享方式

    console.log('⏳ 執行中...');

    // 1. 準備共享上下文
    const sharedContext = {
        task: task,
        wbsStatus: await this.wbsTodos.getStatus(),
        hubAnalysis: hubAnalysis,
        projectContext: await this.persistence.loadProject()
    };

    // 2. 調用 Subagent（待實現）
    // const result = await actualSubagentCall(agent, sharedContext);

    // 3. 處理結果（待實現）
    // await this.processSubagentResult(result);

    await this.sleep(1000); // 暫時模擬

    return {
        output: `✅ ${agent} 完成任務: ${task.title}`,
        files: [`${task.id}-result.txt`],
        notes: `Task executed by ${agent}`
    };
}
```

### WBS Todo Manager 中的整合點

```javascript
// WBSTodoManager 類中的監控方法
async monitorSubagentExecution(taskId, agentId) {
    // TODO: 實現 Subagent 執行監控
    // 1. 定期檢查 Subagent 狀態
    // 2. 更新 WBS Todo List
    // 3. 處理執行異常
}

async receiveSubagentUpdate(statusUpdate) {
    // TODO: 處理來自 Subagent 的狀態更新
    // 1. 驗證更新資訊
    // 2. 更新對應任務狀態
    // 3. 通知人類駕駛員（如需要）
}
```

## 📋 建議的整合架構

### 1. 統一通信介面

```javascript
class SubagentInterface {
    async call(agentType, context) {
        // 標準化的 Subagent 調用介面
    }

    async getStatus(agentId) {
        // 查詢 Subagent 執行狀態
    }

    async subscribe(agentId, callback) {
        // 訂閱 Subagent 狀態更新
    }

    async cancel(agentId) {
        // 取消 Subagent 執行
    }
}
```

### 2. 共享資料格式

```typescript
interface SharedContext {
    // 任務資訊
    task: {
        id: string;
        title: string;
        description: string;
        requirements: string[];
    };

    // WBS 狀態
    wbs: {
        projectName: string;
        currentPhase: string;
        progress: number;
        previousTasks: TaskResult[];
        upcomingTasks: Task[];
    };

    // 專案上下文
    project: {
        type: string;
        technologies: string[];
        constraints: string[];
        qualityGates: QualityGate[];
    };

    // Hub 分析
    hubAnalysis: {
        confidence: number;
        estimatedTime: string;
        risks: Risk[];
        alternatives: Alternative[];
    };
}
```

### 3. 狀態同步機制

```javascript
class StatusSynchronizer {
    async syncToSubagent(wbsStatus, agentId) {
        // 將 WBS 狀態同步到 Subagent
    }

    async syncFromSubagent(agentUpdate) {
        // 接收 Subagent 更新並同步到 WBS
    }

    async handleConflict(wbsState, agentState) {
        // 處理狀態衝突
    }
}
```

## 🚀 實現步驟

### Phase 1: 調用機制確認
1. 確認 Subagent 的具體調用方式
2. 測試基本的 Subagent 調用
3. 驗證參數傳遞機制

### Phase 2: 資訊共享實現
1. 建立共享資料格式標準
2. 實現 WBS 資訊傳遞到 Subagent
3. 測試資訊完整性

### Phase 3: 狀態同步
1. 實現 Subagent 狀態監控
2. 建立雙向狀態同步機制
3. 處理異常和衝突情況

### Phase 4: 完整整合
1. 整合所有功能到 TaskMaster
2. 端到端測試
3. 優化性能和穩定性

## 📞 需要的資訊

為了完成整合，需要了解：

1. **Subagent 調用的具體方式**
   - API 端點或命令格式
   - 認證和授權機制
   - 調用超時和重試策略

2. **可用的 Subagent 列表**
   - 每個 Subagent 的能力和專長
   - 輸入和輸出格式
   - 執行時間範圍

3. **狀態回報機制**
   - Subagent 如何回報狀態
   - 更新頻率和格式
   - 錯誤和異常處理

4. **資料存儲和共享**
   - 是否有共享的資料存儲
   - 資料格式和存取權限
   - 資料持久化機制

一旦獲得這些資訊，TaskMaster 就可以實現與 Subagent 的完整整合，提供真正的智能任務協調能力。

## 🤖⚔️ 整合後的願景

完成整合後，TaskMaster 將能夠：

1. **智能分派**: 根據任務特性自動選擇最佳 Subagent
2. **即時監控**: 實時追蹤所有 Subagent 的執行狀態
3. **資訊共享**: WBS Todo List 與所有 Subagent 保持同步
4. **品質保證**: 自動收集和整合所有執行結果
5. **人類控制**: 保持人類對所有決策的最終控制權

**Ready for Subagent integration!** 🚀