#!/usr/bin/env node

/**
 * TaskMaster & Claude Code Collective - Production Core
 * 人類主導的智能任務協調平台
 * 核心理念：人類是鋼彈駕駛員，TaskMaster 是智能副駕駛系統
 */

const fs = require('fs').promises;
const path = require('path');

class TaskMaster {
    constructor() {
        this.taskManager = new HumanTaskManager();
        this.hubController = new HubController();
        this.persistence = new TaskPersistence();
        this.vbCoding = new VibeCodingBridge();
        this.state = 'waiting';
        this.wbsTodos = new WBSTodoManager();
    }

    /**
     * 專案初始化
     */
    async initializeProject(projectName, options = {}) {
        console.log('🚀 TaskMaster & Claude Code Collective');
        console.log('🎯 人類是鋼彈駕駛員，系統是智能副駕駛');
        console.log('');

        try {
            // 載入 VibeCoding 範本
            const templates = await this.vbCoding.loadRelevantTemplates(projectName);
            const tasks = await this.generateDocumentBasedTasks(templates, options);

            // Hub 分析
            const hubAnalysis = await this.hubController.analyzeProjectStrategy(projectName, tasks);

            console.log('📊 專案初始化計劃 (文檔導向流程):');
            console.log(`   🎯 專案: ${projectName}`);
            console.log(`   📋 範本: ${templates.length} 個`);
            console.log(`   📝 任務: ${tasks.length} 個 (${tasks.filter(t => t.deliverable).length} 文檔生成任務)`);
            console.log(`   🤖 策略: ${hubAnalysis.strategy}`);
            console.log('');

            const confirmation = await this.requestHumanConfirmation(
                '❓ 確認初始化？(Phase 1-2 將生成文檔供審查)',
                [
                    { key: '1', label: '✅ 確認', action: 'confirm' },
                    { key: '2', label: '❌ 取消', action: 'cancel' }
                ]
            );

            if (confirmation === 'confirm') {
                await this.persistence.saveProject({ name: projectName, tasks, hubAnalysis });
                this.taskManager.loadTasks(tasks);

                // 初始化 WBS Todo List
                await this.wbsTodos.initialize(projectName, tasks);

                // 初始化 DocumentGenerator
                this.docGenerator = new DocumentGenerator(projectName, { tasks, complexity: 'medium' });

                this.state = 'active';
                return { success: true, taskCount: tasks.length };
            } else {
                return { success: false, message: 'Cancelled by user' };
            }

        } catch (error) {
            console.error('❌ 初始化失敗:', error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * 取得任務狀態
     */
    async getTaskStatus() {
        const tasks = await this.persistence.loadTasks();
        const hubStatus = this.hubController.getStatus();
        const wbsStatus = await this.wbsTodos.getStatus();

        return {
            project: await this.persistence.loadProject(),
            tasks: this.taskManager.getTaskSummary(tasks),
            hub: hubStatus,
            wbs: wbsStatus,
            system: { state: this.state }
        };
    }

    /**
     * 下個任務建議
     */
    async getNextTask() {
        const tasks = await this.persistence.loadTasks();
        const nextTask = tasks.find(t => t.status === 'pending');

        if (!nextTask) {
            console.log('🎉 所有任務完成！');
            return null;
        }

        const hubAnalysis = await this.hubController.analyzeTask(nextTask);

        // 更新 WBS Todo
        await this.wbsTodos.updateCurrentTask(nextTask, hubAnalysis);

        console.log(`📊 下個任務: ${nextTask.title}`);
        console.log(`🤖 建議智能體: ${hubAnalysis.suggestedAgent}`);
        console.log('');

        const action = await this.requestHumanConfirmation(
            '❓ 執行決策',
            [
                { key: '1', label: '✅ 執行', action: 'execute' },
                { key: '2', label: '🤖 委派', action: 'delegate' },
                { key: '3', label: '⏭️ 跳過', action: 'skip' }
            ]
        );

        return { task: nextTask, action, hubAnalysis };
    }

    /**
     * 委派任務給 Subagent
     */
    async delegateTask(task, agent, hubAnalysis) {
        console.log(`🤖 準備委派: ${task.title} → ${agent}`);

        const confirmation = await this.requestHumanConfirmation(
            '❓ 確認委派？',
            [
                { key: '1', label: '✅ 確認', action: 'confirm' },
                { key: '2', label: '❌ 取消', action: 'cancel' }
            ]
        );

        if (confirmation === 'confirm') {
            try {
                // 更新 WBS 狀態
                await this.wbsTodos.startTask(task.id, agent);

                // TODO: 實際 Subagent 調用
                // 這裡需要整合實際的 Subagent 通信機制
                const result = await this.callSubagent(task, agent, hubAnalysis);

                // 更新任務狀態
                await this.persistence.updateTaskStatus(task.id, 'completed', result);
                await this.wbsTodos.completeTask(task.id, result);

                console.log('✅ 任務完成');
                return { success: true, result };

            } catch (error) {
                await this.wbsTodos.markTaskBlocked(task.id, error.message);
                console.error('❌ 委派失敗:', error.message);
                return { success: false, error: error.message };
            }
        }

        return { success: false, message: 'Delegation cancelled' };
    }

    /**
     * 調用 Subagent（支援文檔生成任務）
     */
    async callSubagent(task, agent, hubAnalysis) {
        console.log('⏳ 執行中...');

        try {
            let result;

            // 檢查是否為文檔生成任務
            if (task.deliverable && task.deliverable.endsWith('.md')) {
                result = await this.handleDocumentGenerationTask(task, agent, hubAnalysis);
            }
            // 檢查是否為審查閘道任務
            else if (task.isGate) {
                result = await this.handleReviewGateTask(task, agent, hubAnalysis);
            }
            // 一般任務處理
            else {
                // TODO: 實現與 Claude Code Subagent 的實際通信
                await this.sleep(1000); // 模擬執行時間

                result = {
                    output: `✅ ${agent} 完成任務: ${task.title}`,
                    files: [`${task.id}-result.txt`],
                    notes: `Task executed by ${agent}`
                };
            }

            // 記錄 Subagent 執行結果到上下文
            const contextManager = new ContextManager();
            await contextManager.writeAgentReport(agent, {
                task: `${task.title} (ID: ${task.id})`,
                result: result.output || '任務執行完成',
                files: result.files || [],
                issues: result.issues || [],
                recommendations: result.recommendations || [],
                technical: JSON.stringify({
                    hubAnalysis: hubAnalysis,
                    taskMetadata: {
                        phase: task.phase,
                        priority: task.priority,
                        deliverable: task.deliverable
                    },
                    executionResult: result
                }, null, 2)
            });

            console.log(`📝 已記錄 ${agent} 執行結果到 .claude/context`);
            return result;

        } catch (error) {
            // 記錄錯誤到上下文
            const contextManager = new ContextManager();
            await contextManager.writeAgentReport(agent, {
                task: `${task.title} (ID: ${task.id})`,
                result: `執行失敗: ${error.message}`,
                issues: [error.message],
                recommendations: ['檢查任務配置', '重試執行', '聯繫開發團隊'],
                technical: error.stack
            });

            console.error(`❌ 任務執行失敗: ${error.message}`);
            throw error;
        }
    }

    /**
     * 處理文檔生成任務
     */
    async handleDocumentGenerationTask(task, agent, hubAnalysis) {
        console.log(`📄 處理文檔生成任務: ${task.deliverable}`);

        // 如果 DocumentGenerator 尚未初始化，則創建一個
        if (!this.docGenerator) {
            console.log('📋 初始化 DocumentGenerator...');
            this.docGenerator = new DocumentGenerator(task.title || 'TaskMaster-Generated-Project', {
                complexity: 'medium',
                tasks: []
            });
        }

        const fs = require('fs').promises;
        const path = require('path');

        try {
            let generatedResult = {};
            const templatePath = `VibeCoding_Workflow_Templates/${task.template}`;

            // 檢查範本文件是否存在
            try {
                await fs.access(templatePath);
            } catch (error) {
                console.log(`⚠️ 範本文件不存在: ${templatePath}`);
                throw new Error(`範本文件不存在: ${templatePath}`);
            }

            // 讀取範本內容
            const templateContent = await fs.readFile(templatePath, 'utf8');

            // 根據任務類型調用對應的文檔生成方法
            if (task.template.includes('project_brief_and_prd')) {
                generatedResult = await this.docGenerator.generatePRD(templateContent, {
                    businessBackground: '基於 VibeCoding 7問澄清的商業需求分析',
                    functionalRequirements: '從範本提取的功能性需求',
                    technicalConstraints: '技術限制和非功能性需求'
                });
            } else if (task.template.includes('architecture_and_design')) {
                generatedResult = await this.docGenerator.generateArchitecture(templateContent, {
                    systemOverview: '基於 PRD 的系統概述',
                    componentDesign: '主要組件設計',
                    dataFlow: '數據流設計'
                });
            } else if (task.template.includes('api_design_specification')) {
                generatedResult = await this.docGenerator.generateAPISpec(templateContent, {
                    endpoints: '基於架構設計的 API 端點',
                    authentication: '身份驗證機制',
                    errorHandling: '錯誤處理策略'
                });
            } else if (task.template.includes('module_specification')) {
                generatedResult = await this.docGenerator.generateModuleSpec(templateContent, {
                    modules: '基於架構的模組劃分',
                    interfaces: '模組間介面定義',
                    testStrategy: '測試策略'
                });
            } else {
                // 通用文檔生成
                generatedResult = await this.docGenerator.generateFromTemplate(task.template, templateContent);
            }

            // 確保目標目錄存在
            const docsDir = path.dirname(task.deliverable);
            await fs.mkdir(docsDir, { recursive: true });

            // 寫入生成的文檔
            let documentContent = '';
            if (typeof generatedResult === 'string') {
                documentContent = generatedResult;
            } else if (generatedResult && typeof generatedResult === 'object') {
                // 如果返回的是對象，從對象中提取內容
                documentContent = generatedResult.content || generatedResult.document || JSON.stringify(generatedResult, null, 2);
            } else {
                throw new Error('文檔生成器返回了無效的結果');
            }

            await fs.writeFile(task.deliverable, documentContent, 'utf8');
            console.log(`✅ 文檔已成功寫入: ${task.deliverable}`);

            return {
                output: `📄 文檔已生成: ${task.deliverable}`,
                files: [task.deliverable],
                notes: `文檔基於範本 ${task.template} 生成，等待駕駛員審查`,
                reviewRequired: task.reviewRequired,
                generatedResult: generatedResult
            };

        } catch (error) {
            console.error(`❌ 文檔生成失敗: ${error.message}`);
            throw new Error(`文檔生成失敗: ${error.message}`);
        }
    }

    /**
     * 處理審查閘道任務
     */
    async handleReviewGateTask(task, agent, hubAnalysis) {
        console.log('🚪 處理審查閘道任務');

        const confirmation = await this.requestHumanConfirmation(
            '📋 駕駛員審查檢查點',
            [
                { key: '1', label: '✅ 文檔審查通過，繼續 Phase 3', action: 'approve' },
                { key: '2', label: '🔄 需要修改，返回修正', action: 'revise' },
                { key: '3', label: '⏸️ 暫停等待進一步指示', action: 'pause' }
            ]
        );

        switch (confirmation) {
            case 'approve':
                return {
                    output: '✅ 駕駛員審查通過，可以進入開發階段',
                    gateStatus: 'approved',
                    notes: '所有 Phase 1-2 文檔已通過審查，系統準備進入 Phase 3 開發'
                };
            case 'revise':
                return {
                    output: '🔄 駕駛員要求修改文檔',
                    gateStatus: 'revision_required',
                    notes: '需要根據駕駛員意見修改文檔後重新提交審查'
                };
            case 'pause':
                return {
                    output: '⏸️ 駕駛員要求暫停，等待進一步指示',
                    gateStatus: 'paused',
                    notes: '專案在審查階段暫停，等待駕駛員進一步指示'
                };
            default:
                return {
                    output: '❓ 未知的審查決策',
                    gateStatus: 'unknown',
                    notes: '需要駕駛員明確的審查決策'
                };
        }
    }

    /**
     * 人類確認機制
     */
    async requestHumanConfirmation(prompt, options) {
        console.log('🤖⚔️ 人類駕駛員決策');
        console.log(prompt);
        options.forEach(option => {
            console.log(`   [${option.key}] ${option.label}`);
        });
        console.log('');

        // TODO: 整合實際的 Claude Code 用戶介面
        return options[0].action; // 暫時返回第一個選項
    }

    // 重新設計的文檔導向任務生成方法
    async generateDocumentBasedTasks(templates, options) {
        const tasks = [];

        // Phase 1: 基於範本產出 PRD 等核心文檔
        if (templates.find(t => t.name.includes('project_brief'))) {
            tasks.push({
                title: '產生專案需求文檔 (PRD)',
                description: '基於 VibeCoding 範本生成詳細的專案需求文檔，供駕駛員審查',
                phase: 'Phase 1',
                template: '01_project_brief_and_prd.md',
                deliverable: 'docs/PRD.md',
                reviewRequired: true,
                priority: 'high'
            });
        }

        // Phase 2: 基於 PRD 產出技術架構文檔
        if (templates.find(t => t.name.includes('architecture'))) {
            tasks.push({
                title: '產生系統架構文檔',
                description: '基於 PRD 生成詳細的系統架構設計文檔，供駕駛員審查',
                phase: 'Phase 2',
                template: '03_architecture_and_design_document.md',
                deliverable: 'docs/Architecture.md',
                reviewRequired: true,
                dependsOn: ['task-001'],
                priority: 'high'
            });
        }

        if (templates.find(t => t.name.includes('api_design'))) {
            tasks.push({
                title: '產生 API 設計規格文檔',
                description: '基於架構文檔生成 API 設計規格，供駕駛員審查',
                phase: 'Phase 2',
                template: '04_api_design_specification.md',
                deliverable: 'docs/API_Specification.md',
                reviewRequired: true,
                dependsOn: ['task-002'],
                priority: 'medium'
            });
        }

        if (templates.find(t => t.name.includes('module_specification'))) {
            tasks.push({
                title: '產生模組規格文檔',
                description: '基於架構設計生成模組規格文檔，供駕駛員審查',
                phase: 'Phase 2',
                template: '05_module_specification_and_tests.md',
                deliverable: 'docs/Module_Specification.md',
                reviewRequired: true,
                dependsOn: ['task-002'],
                priority: 'medium'
            });
        }

        // Phase 3+: 在駕駛員確認文檔後才進行開發
        tasks.push({
            title: '**等待駕駛員審查 Phase 1-2 文檔**',
            description: '駕駛員需要審查所有 Phase 1-2 產生的文檔並確認後，才能進入開發階段',
            phase: 'Phase 2.5',
            deliverable: null,
            reviewRequired: true,
            isGate: true,
            dependsOn: tasks.filter(t => t.reviewRequired).map((_, i) => `task-${String(i + 1).padStart(3, '0')}`),
            priority: 'critical'
        });

        return tasks.map((task, index) => ({
            id: `task-${String(index + 1).padStart(3, '0')}`,
            ...task,
            status: 'pending',
            created: new Date()
        }));
    }

    // 保留原方法以向後兼容
    async generateTasksFromTemplates(templates, options) {
        return this.generateDocumentBasedTasks(templates, options);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 系統控制
    pause() {
        this.state = 'paused';
        console.log('⏸️ TaskMaster 已暫停');
    }

    resume() {
        this.state = 'active';
        console.log('▶️ TaskMaster 已恢復');
    }

    stop() {
        this.state = 'stopped';
        console.log('🛑 TaskMaster 已停止');
    }
}

/**
 * WBS Todo List 管理器
 */
class WBSTodoManager {
    constructor() {
        this.todos = [];
        this.currentTask = null;
        this.projectContext = null;
    }

    async initialize(projectName, tasks) {
        this.projectContext = { name: projectName, startDate: new Date() };
        this.todos = tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: 'pending',
            assignedAgent: null,
            startTime: null,
            endTime: null,
            blockers: [],
            progress: 0
        }));

        await this.saveTodos();
        console.log(`📋 WBS Todo List 已初始化: ${tasks.length} 個任務`);
    }

    async updateCurrentTask(task, hubAnalysis) {
        this.currentTask = {
            ...task,
            hubSuggestion: hubAnalysis.suggestedAgent,
            confidence: hubAnalysis.confidence,
            estimatedTime: hubAnalysis.estimatedTime
        };

        console.log(`🎯 當前任務: ${task.title}`);
        console.log(`📊 Hub 建議: ${hubAnalysis.suggestedAgent} (${Math.round(hubAnalysis.confidence * 100)}% 信心)`);
    }

    async startTask(taskId, agent) {
        const todo = this.todos.find(t => t.id === taskId);
        if (todo) {
            todo.status = 'in_progress';
            todo.assignedAgent = agent;
            todo.startTime = new Date();
            await this.saveTodos();
            console.log(`🚀 任務開始: ${taskId} → ${agent}`);
        }
    }

    async completeTask(taskId, result) {
        const todo = this.todos.find(t => t.id === taskId);
        if (todo) {
            todo.status = 'completed';
            todo.endTime = new Date();
            todo.result = result;
            todo.progress = 100;
            await this.saveTodos();
            console.log(`✅ 任務完成: ${taskId}`);
        }
    }

    async markTaskBlocked(taskId, reason) {
        const todo = this.todos.find(t => t.id === taskId);
        if (todo) {
            todo.status = 'blocked';
            todo.blockers.push({ reason, timestamp: new Date() });
            await this.saveTodos();
            console.log(`❌ 任務受阻: ${taskId} - ${reason}`);
        }
    }

    async getStatus() {
        const summary = {
            total: this.todos.length,
            pending: this.todos.filter(t => t.status === 'pending').length,
            inProgress: this.todos.filter(t => t.status === 'in_progress').length,
            completed: this.todos.filter(t => t.status === 'completed').length,
            blocked: this.todos.filter(t => t.status === 'blocked').length
        };

        return {
            summary,
            currentTask: this.currentTask,
            recentTodos: this.todos.slice(-5),
            projectContext: this.projectContext
        };
    }

    async saveTodos() {
        const dataPath = '.claude/taskmaster-data';
        await fs.mkdir(dataPath, { recursive: true });
        await fs.writeFile(
            path.join(dataPath, 'wbs-todos.json'),
            JSON.stringify({
                projectContext: this.projectContext,
                currentTask: this.currentTask,
                todos: this.todos,
                lastUpdated: new Date()
            }, null, 2)
        );
    }

    async loadTodos() {
        try {
            const dataPath = path.join('.claude/taskmaster-data', 'wbs-todos.json');
            const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
            this.projectContext = data.projectContext;
            this.currentTask = data.currentTask;
            this.todos = data.todos;
            return true;
        } catch {
            return false;
        }
    }
}

/**
 * 簡化的 Hub 控制器
 */
class HubController {
    constructor() {
        this.availableAgents = [
            'general-purpose',
            'code-quality-specialist',
            'test-automation-engineer',
            'security-infrastructure-auditor',
            'deployment-expert',
            'documentation-specialist',
            'workflow-template-manager'
        ];
        this.contextManager = new ContextManager();
    }

    async analyzeProjectStrategy(projectName, tasks) {
        return {
            strategy: tasks.length > 5 ? 'sequential-with-checkpoints' : 'parallel-optimized',
            complexity: this.calculateComplexity(tasks),
            estimatedDuration: `${Math.ceil(tasks.length * 0.5)} 小時`
        };
    }

    async analyzeTask(task) {
        const suggestedAgent = this.suggestAgent(task);
        return {
            suggestedAgent,
            confidence: 0.8,
            estimatedTime: task.estimatedTime || '15-20 分鐘',
            complexity: this.calculateTaskComplexity(task)
        };
    }

    suggestAgent(task) {
        if (task.description.includes('測試')) return 'test-automation-engineer';
        if (task.description.includes('安全')) return 'security-infrastructure-auditor';
        if (task.description.includes('文檔')) return 'documentation-specialist';
        if (task.description.includes('品質')) return 'code-quality-specialist';
        return 'workflow-template-manager';
    }

    calculateComplexity(tasks) {
        return tasks.length > 10 ? 'high' : tasks.length > 5 ? 'medium' : 'low';
    }

    calculateTaskComplexity(task) {
        return task.description.length > 100 ? 'high' : 'medium';
    }

    getStatus() {
        return {
            availableAgents: this.availableAgents.length,
            mode: 'hub-coordination',
            efficiency: 0.9
        };
    }
}

/**
 * 簡化的任務管理器
 */
class HumanTaskManager {
    constructor() {
        this.tasks = [];
    }

    loadTasks(tasks) {
        this.tasks = tasks;
        console.log(`📋 載入 ${tasks.length} 個任務`);
    }

    getTaskSummary(tasks) {
        return {
            total: tasks.length,
            pending: tasks.filter(t => t.status === 'pending').length,
            inProgress: tasks.filter(t => t.status === 'in_progress').length,
            completed: tasks.filter(t => t.status === 'completed').length,
            blocked: tasks.filter(t => t.status === 'blocked').length
        };
    }
}

/**
 * 簡化的持久化管理器
 */
class TaskPersistence {
    constructor() {
        this.dataPath = '.claude/taskmaster-data';
    }

    async saveProject(project) {
        await fs.mkdir(this.dataPath, { recursive: true });
        await fs.writeFile(
            path.join(this.dataPath, 'project.json'),
            JSON.stringify(project, null, 2)
        );
    }

    async loadProject() {
        try {
            const data = await fs.readFile(path.join(this.dataPath, 'project.json'), 'utf8');
            return JSON.parse(data);
        } catch {
            return null;
        }
    }

    async loadTasks() {
        const project = await this.loadProject();
        return project?.tasks || [];
    }

    async updateTaskStatus(taskId, status, result) {
        const project = await this.loadProject();
        if (project && project.tasks) {
            const task = project.tasks.find(t => t.id === taskId);
            if (task) {
                task.status = status;
                task.result = result;
                task.updated = new Date();
                await this.saveProject(project);
            }
        }
    }
}

/**
 * 簡化的 VibeCoding 橋接器
 */
class VibeCodingBridge {
    async loadRelevantTemplates(projectName) {
        // 模擬載入相關範本
        return [
            { name: '06_project_structure_guide.md', relevance: 0.9 },
            { name: '03_architecture_and_design_document.md', relevance: 0.8 },
            { name: '04_module_specification_and_tests.md', relevance: 0.7 }
        ];
    }

    async generateTasks(template, options) {
        // Phase 1-2: 基於範本產出具體專案文檔
        const documentGenTasks = {
            '01_project_brief_and_prd.md': [{
                phase: 1,
                title: '產出專案簡報文檔 (PRD)',
                description: '基於範本產出具體的專案需求文檔，供駕駛員審查',
                deliverable: `docs/${options.projectName}-PRD.md`,
                estimatedTime: '30-45 分鐘',
                reviewRequired: true
            }],
            '03_architecture_and_design_document.md': [{
                phase: 2,
                title: '產出系統架構設計文檔',
                description: '基於範本產出詳細的系統架構文檔，供駕駛員審查',
                deliverable: `docs/${options.projectName}-Architecture.md`,
                estimatedTime: '45-60 分鐘',
                reviewRequired: true
            }],
            '04_api_design_specification.md': [{
                phase: 2,
                title: '產出 API 設計規格文檔',
                description: '基於範本產出詳細的 API 規格文檔，供駕駛員審查',
                deliverable: `docs/${options.projectName}-API-Spec.md`,
                estimatedTime: '30-45 分鐘',
                reviewRequired: true
            }],
            '05_module_specification_and_tests.md': [{
                phase: 2,
                title: '產出模組規格文檔',
                description: '基於範本產出詳細的模組規格文檔，供駕駛員審查',
                deliverable: `docs/${options.projectName}-Modules.md`,
                estimatedTime: '40-50 分鐘',
                reviewRequired: true
            }]
        };

        return documentGenTasks[template.name] || [];
    }

    async generateProjectDocuments(projectName, selectedTemplates, vbAnswers) {
        const documentTasks = [];

        // Phase 1: 需求與設計規劃文檔
        const phase1Templates = ['01_project_brief_and_prd.md', '02_behavior_driven_development_guide.md'];

        // Phase 2: 架構與規格詳述文檔
        const phase2Templates = ['03_architecture_and_design_document.md', '04_api_design_specification.md',
                                '05_module_specification_and_tests.md', '06_security_and_readiness_checklists.md'];

        for (const template of selectedTemplates) {
            if (phase1Templates.includes(template.name)) {
                const tasks = await this.generateTasks(template, { projectName, phase: 1 });
                documentTasks.push(...tasks);
            } else if (phase2Templates.includes(template.name)) {
                const tasks = await this.generateTasks(template, { projectName, phase: 2 });
                documentTasks.push(...tasks);
            }
        }

        return documentTasks;
    }
}

/**
 * 文檔生成器 - 基於 VibeCoding 範本產出具體專案文檔
 */
class DocumentGenerator {
    constructor(projectName, projectInfo) {
        this.projectName = projectName;
        this.projectInfo = projectInfo;
        this.docsDir = 'docs';
    }

    async generateFromTemplate(templateName, templateContent, additionalContext = {}) {
        const fs = require('fs').promises;
        const path = require('path');

        // 確保 docs 目錄存在
        await fs.mkdir(this.docsDir, { recursive: true });

        // 基於範本類型選擇生成策略
        const generators = {
            '01_project_brief_and_prd.md': () => this.generatePRD(templateContent, additionalContext),
            '03_architecture_and_design_document.md': () => this.generateArchitecture(templateContent, additionalContext),
            '04_api_design_specification.md': () => this.generateAPISpec(templateContent, additionalContext),
            '05_module_specification_and_tests.md': () => this.generateModuleSpec(templateContent, additionalContext)
        };

        const generator = generators[templateName];
        if (generator) {
            return await generator();
        }

        return this.generateGenericDocument(templateName, templateContent, additionalContext);
    }

    async generatePRD(templateContent, context) {
        // 基於真實的 VibeCoding 範本內容進行填充
        const customizedDocument = templateContent
            // 替換專案名稱
            .replace(/\[專案名稱\]/g, this.projectName)
            .replace(/\[專案代號\/名稱\]/g, this.projectName)

            // 填入基本資訊
            .replace(/YYYY-MM-DD/g, new Date().toISOString().split('T')[0])
            .replace(/\[產品經理\]/g, context.productManager || '駕駛員 (人類)')
            .replace(/\[技術負責人, 設計負責人\]/g, '駕駛員 + TaskMaster 系統')
            .replace(/\[草稿 \(Draft\), 審核中 \(In Review\), 已批准 \(Approved\)\]/g, '草稿 (Draft) - 待駕駛員審查')

            // 填入狀態資訊
            .replace(/\[規劃中 \/ 開發中 \/ 已上線\]/g, '規劃中')
            .replace(/PM: \[姓名\]/g, `PM: ${context.productManager || '駕駛員'}`)
            .replace(/Lead Engineer: \[姓名\]/g, `Lead Engineer: TaskMaster + Claude`)
            .replace(/UX Designer: \[姓名\]/g, `UX Designer: ${context.uxDesigner || '待指定'}`)

            // 填入商業內容
            .replace(/\[內容\]/g, context.businessBackground || '基於 VibeCoding 7問澄清的具體需求，駕駛員將在此填入商業背景和痛點分析')

            // 填入功能需求
            .replace(/- \[功能模組 A: 核心功能\]/g, context.coreFeatures ? context.coreFeatures.map(f => `- ${f}`).join('\n') : '- 待駕駛員定義核心功能模組')
            .replace(/- \[功能模組 B: 核心功能\]/g, '')

            // 添加生成元資料
            + `\n\n---\n**📋 TaskMaster 生成資訊**:\n- 基於範本: VibeCoding 01_project_brief_and_prd.md\n- 生成時間: ${new Date().toISOString()}\n- 狀態: 待駕駛員填充具體業務內容並審查\n- 下一步: 駕駛員審查後，系統將基於此 PRD 生成架構設計文檔`;

        return customizedDocument;
    }

    async generateArchitecture(templateContent, context) {
        const document = `# ${this.projectName} - 系統架構設計

## 架構概覽
**專案名稱**: ${this.projectName}
**架構版本**: 1.0
**建立日期**: ${new Date().toISOString().split('T')[0]}
**狀態**: 待駕駛員審查

## 系統架構圖
\`\`\`
[基於專案需求產出的架構圖 - 需要駕駛員補充]
\`\`\`

## 核心組件
${context.components ? context.components.map(c => `### ${c.name}\n- **職責**: ${c.responsibility}\n- **技術**: ${c.technology}`).join('\n\n') : '基於需求分析識別的核心組件'}

## 資料流設計
${context.dataFlow || '基於功能需求設計的資料流'}

## 技術選型
${context.techStack ? Object.entries(context.techStack).map(([key, value]) => `- **${key}**: ${value}`).join('\n') : '基於專案約束的技術選擇'}

## 擴展性考量
${context.scalability || 'Phase 2 架構擴展性設計'}

## 安全性設計
${context.security || '基於 VibeCoding 安全範本的設計考量'}

---
**📋 駕駛員審查點**: 請檢查架構設計是否符合專案需求，確認後可進入詳細開發
**🔄 基於範本**: VibeCoding 03_architecture_and_design_document.md
**⏱️ 生成時間**: ${new Date().toISOString()}
`;

        return document;
    }

    async generateAPISpec(templateContent, context) {
        const document = `# ${this.projectName} - API 設計規格

## API 概覽
**專案名稱**: ${this.projectName}
**API 版本**: v1.0
**建立日期**: ${new Date().toISOString().split('T')[0]}
**狀態**: 待駕駛員審查

## 基礎資訊
- **Base URL**: \`https://api.${this.projectName.toLowerCase()}.com/v1\`
- **認證方式**: ${context.authMethod || 'JWT Bearer Token'}
- **資料格式**: JSON
- **字元編碼**: UTF-8

## 核心端點
${context.endpoints ? context.endpoints.map(ep => `### ${ep.method} ${ep.path}
**描述**: ${ep.description}
**請求格式**:
\`\`\`json
${JSON.stringify(ep.request, null, 2)}
\`\`\`
**回應格式**:
\`\`\`json
${JSON.stringify(ep.response, null, 2)}
\`\`\``).join('\n\n') : '基於功能需求設計的 API 端點'}

## 錯誤處理
${context.errorHandling || 'HTTP 標準狀態碼 + 自定義錯誤格式'}

## 限流政策
${context.rateLimit || '基於系統容量的限流設計'}

---
**📋 駕駛員審查點**: 請檢查 API 設計是否滿足功能需求，確認後可開始實作
**🔄 基於範本**: VibeCoding 04_api_design_specification.md
**⏱️ 生成時間**: ${new Date().toISOString()}
`;

        return document;
    }

    async generateModuleSpec(templateContent, context) {
        const document = `# ${this.projectName} - 模組規格文檔

## 模組架構
**專案名稱**: ${this.projectName}
**模組版本**: 1.0
**建立日期**: ${new Date().toISOString().split('T')[0]}
**狀態**: 待駕駛員審查

## 核心模組清單
${context.modules ? context.modules.map(m => `### ${m.name}
- **職責**: ${m.responsibility}
- **依賴**: ${m.dependencies ? m.dependencies.join(', ') : '無'}
- **介面**: ${m.interface || '待定義'}
- **測試策略**: ${m.testStrategy || '待規劃'}`).join('\n\n') : '基於架構設計識別的模組'}

## 模組間依賴關係
\`\`\`
[模組依賴圖 - 基於架構設計產出]
\`\`\`

## 測試策略
### 單元測試
${context.unitTestStrategy || '每個模組的單元測試規劃'}

### 整合測試
${context.integrationTestStrategy || '模組間整合測試規劃'}

## 開發優先順序
${context.developmentPriority || '基於依賴關係的開發順序'}

---
**📋 駕駛員審查點**: 請檢查模組設計和測試策略，確認後可開始實作
**🔄 基於範本**: VibeCoding 05_module_specification_and_tests.md
**⏱️ 生成時間**: ${new Date().toISOString()}
`;

        return document;
    }

    async generateGenericDocument(templateName, templateContent, context) {
        const document = `# ${this.projectName} - ${templateName}

**基於範本**: ${templateName}
**生成時間**: ${new Date().toISOString()}
**狀態**: 待駕駛員審查

## 內容
${context.content || '基於 VibeCoding 範本客製化的專案文檔'}

---
**📋 駕駛員審查點**: 請檢查此文檔內容，確認後可進行後續工作
`;

        return document;
    }
}

/**
 * Context 管理器 - 管理智能體間的上下文共享
 */
class ContextManager {
    constructor() {
        this.contextDir = '.claude/context';
    }

    async writeAgentReport(agentName, reportData) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${agentName}-report-${timestamp}.md`;
        const agentDir = `${this.contextDir}/${this.getAgentContextDir(agentName)}`;

        // 創建目錄（如果不存在）
        await fs.mkdir(agentDir, { recursive: true });

        const reportContent = this.formatAgentReport(agentName, reportData);
        await fs.writeFile(`${agentDir}/${filename}`, reportContent);
        return filename;
    }

    async readAgentReports(agentName, limit = 5) {
        const agentDir = `${this.contextDir}/${this.getAgentContextDir(agentName)}`;

        try {
            const files = await fs.readdir(agentDir);
            const reportFiles = files
                .filter(f => f.includes(`${agentName}-report-`))
                .sort()
                .slice(-limit);

            const reports = [];
            for (const file of reportFiles) {
                const content = await fs.readFile(`${agentDir}/${file}`, 'utf8');
                reports.push({ filename: file, content });
            }
            return reports;
        } catch (error) {
            return [];
        }
    }

    async writeDecisionRecord(title, decision) {
        const date = new Date().toISOString().split('T')[0];
        const sequence = String(Date.now()).slice(-3);
        const filename = `ADR-${date}-${sequence}-${title.replace(/\s+/g, '-').toLowerCase()}.md`;

        await fs.mkdir(`${this.contextDir}/decisions`, { recursive: true });

        const adrContent = this.formatDecisionRecord(title, decision);
        await fs.writeFile(`${this.contextDir}/decisions/${filename}`, adrContent);
        return filename;
    }

    getAgentContextDir(agentName) {
        const dirMap = {
            'code-quality-specialist': 'quality',
            'test-automation-engineer': 'testing',
            'e2e-validation-specialist': 'e2e',
            'security-infrastructure-auditor': 'security',
            'deployment-expert': 'deployment',
            'documentation-specialist': 'docs',
            'workflow-template-manager': 'workflow'
        };
        return dirMap[agentName] || 'general';
    }

    formatAgentReport(agentName, reportData) {
        const timestamp = new Date().toISOString();
        return `# ${agentName} 報告

## 時間戳
${timestamp}

## 任務概要
${reportData.task || '未指定'}

## 執行結果
${reportData.result || '執行完成'}

## 發現問題
${reportData.issues ? reportData.issues.map(i => `- ${i}`).join('\n') : '- 無'}

## 建議行動
${reportData.recommendations ? reportData.recommendations.map(r => `- ${r}`).join('\n') : '- 無'}

## 技術細節
\`\`\`
${reportData.technical || '無技術詳情'}
\`\`\`

---
Generated by TaskMaster Hub
`;
    }

    formatDecisionRecord(title, decision) {
        const timestamp = new Date().toISOString();
        return `# ADR: ${title}

## 狀態
已決議

## 決策日期
${timestamp.split('T')[0]}

## 背景
${decision.background || '決策背景'}

## 決策
${decision.decision || '決策內容'}

## 理由
${decision.rationale || '決策理由'}

## 後果
${decision.consequences || '預期後果'}

## 相關人員
- TaskMaster Hub
- 人類駕駛員

---
Generated by TaskMaster Hub
`;
    }
}

module.exports = TaskMaster;

// Hook 觸發處理器
class HookHandler {
    constructor() {
        this.taskmaster = new TaskMaster();
        this.fs = require('fs').promises;
    }

    async handleHook(hookType, args = {}) {
        console.log(`🪝 Hook 觸發: ${hookType}`);

        try {
            switch (hookType) {
                case 'session-start':
                    return await this.handleSessionStart();

                case 'detect-claude-template':
                    return await this.handleClaudeTemplateDetection();

                case 'user-prompt':
                    return await this.handleUserPrompt(args.message);

                case 'document-generated':
                    return await this.handleDocumentGenerated(args.file);

                default:
                    console.log(`⚠️ 未知的 Hook 類型: ${hookType}`);
                    return false;
            }
        } catch (error) {
            console.error(`❌ Hook 處理失敗: ${error.message}`);
            return false;
        }
    }

    async handleSessionStart() {
        console.log('🎯 TaskMaster 會話開始檢查...');

        // 檢查是否存在 CLAUDE_TEMPLATE.md
        try {
            await this.fs.access('CLAUDE_TEMPLATE.md');
            console.log('📄 偵測到 CLAUDE_TEMPLATE.md，準備自動初始化 TaskMaster');
            return await this.handleClaudeTemplateDetection();
        } catch (error) {
            console.log('ℹ️ 未偵測到 CLAUDE_TEMPLATE.md，TaskMaster 待命中');
            return false;
        }
    }

    async handleClaudeTemplateDetection() {
        console.log('🔍 CLAUDE_TEMPLATE.md 觸發檢查...');

        try {
            // 檢查是否已經初始化過
            const dataDir = '.claude/taskmaster-data';
            try {
                await this.fs.access(`${dataDir}/project.json`);
                console.log('ℹ️ TaskMaster 已初始化，跳過自動觸發');
                return false;
            } catch (error) {
                // 尚未初始化，由 shell 腳本負責 UI 輸出
                console.log('🚀 自動觸發 TaskMaster 初始化...');
                return true;
            }
        } catch (error) {
            console.error(`❌ CLAUDE_TEMPLATE 檢查失敗: ${error.message}`);
            return false;
        }
    }

    async handleUserPrompt(message) {
        // 檢查用戶輸入是否包含 /task-init
        if (message && message.includes('/task-init')) {
            console.log('🎯 偵測到 /task-init 命令，準備執行初始化');
            return true;
        }
        return false;
    }

    async handleDocumentGenerated(filePath) {
        console.log(`📄 文檔生成完成: ${filePath}`);
        console.log('🔍 通知駕駛員進行文檔審查');

        // 在此處可以加入更多的文檔後處理邏輯
        // 例如：品質檢查、範本合規檢查等

        return true;
    }
}

// 命令行介面處理
async function main() {
    const args = process.argv.slice(2);

    if (args.length > 0 && args[0].startsWith('--hook-trigger=')) {
        // Hook 觸發模式
        const hookType = args[0].split('=')[1];
        const hookArgs = {};

        // 解析其他參數
        for (let i = 1; i < args.length; i++) {
            if (args[i].startsWith('--')) {
                const [key, value] = args[i].substring(2).split('=');
                hookArgs[key] = value;
            }
        }

        const hookHandler = new HookHandler();
        const result = await hookHandler.handleHook(hookType, hookArgs);
        process.exit(result ? 0 : 1);
    } else {
        // 一般模式
        const taskmaster = new TaskMaster();
        console.log('🚀 TaskMaster & Claude Code Collective - 啟動完成');
        console.log('📋 使用 /task-init [project] 開始新專案');
    }
}

// 如果直接執行，運行主程式
if (require.main === module) {
    main().catch(error => {
        console.error(`❌ TaskMaster 啟動失敗: ${error.message}`);
        process.exit(1);
    });
}