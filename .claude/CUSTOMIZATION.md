# 🎨 TaskMaster Customization & Extension Guide

This guide helps you customize TaskMaster for your specific needs, integrate with your workflow, and troubleshoot issues.

## 🎨 Customization Guide

### Creating Custom VibeCoding Templates

#### Template Structure
```markdown
# Template Name
## Purpose
[Clear description of when to use this template]

## Required Information
- [ ] Key requirement 1
- [ ] Key requirement 2

## Deliverables
1. Document/artifact to produce
2. Expected format and content

## Template Content
[Actual template content with placeholders]
```

#### Adding Your Template
1. Create file in `VibeCoding_Workflow_Templates/`
2. Follow naming convention: `NN_template_name.md`
3. Update `INDEX.md` with your template
4. TaskMaster will auto-detect on next init

### Custom Agent Configuration

#### Creating a New Agent
```markdown
# agent-name
Specialized for [specific domain]

## Tools
- Tool 1
- Tool 2

## Capabilities
- What this agent can do
- What it specializes in

## Constraints
- What it should NOT do
- Limitations to enforce
```

Place in `.claude/agents/` directory.

### Hook System Customization

#### Available Hook Points
- `session-start.sh` - When Claude Code starts
- `user-prompt-submit.sh` - Before processing user input
- `post-write.sh` - After file writes
- `pre-tool-use.sh` - Before tool execution

#### Creating Custom Hooks
```bash
#!/bin/bash
source "$(dirname "$0")/hook-utils.sh"

# Your custom logic
if check_taskmaster_initialized; then
    log "TaskMaster is active"
    # Custom actions
fi
```

## 🔧 Integration Patterns

### Git Integration

#### Pre-commit Hook
```bash
#!/bin/bash
# .git/hooks/pre-commit
claude code -c "/check-quality" || exit 1
```

#### CI/CD Integration
```yaml
# .github/workflows/taskmaster.yml
name: TaskMaster Checks
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run TaskMaster Quality Checks
        run: |
          claude code -c "/check-quality"
          claude code -c "/template-check api-design"
```

### IDE Integration

#### VS Code Tasks
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "TaskMaster Status",
      "type": "shell",
      "command": "claude code -c '/task-status'",
      "problemMatcher": []
    }
  ]
}
```

## 🐛 Troubleshooting Guide

### Common Issues and Solutions

| Issue | Symptom | Solution |
|-------|---------|----------|
| TaskMaster not starting | No welcome message | Check `CLAUDE_TEMPLATE.md` exists |
| Commands not recognized | "Unknown command" error | Verify `.claude/taskmaster.js` is present |
| WBS not saving | Progress lost between sessions | Check `.claude/taskmaster-data/` permissions |
| Agents not responding | Delegation fails | Verify `.claude/agents/` directory |
| Hooks not triggering | No auto-detection | Check hook file permissions (`chmod +x`) |

### Debug Mode

Enable verbose logging:
```bash
export TASKMASTER_DEBUG=true
export TASKMASTER_LOG_LEVEL=verbose
claude code
```

Check logs:
```bash
tail -f ~/.claude/logs/taskmaster.log
```

### Manual Reset

Complete reset:
```bash
# Backup current state
cp -r .claude/taskmaster-data/ .claude/taskmaster-data.backup

# Reset TaskMaster
rm -rf .claude/taskmaster-data/
rm -f .claude/.taskmaster-init

# Restart
claude code
/task-init my-project
```

## 📊 Performance Optimization

### Parallel vs Sequential Execution

#### Parallel Mode (Default)
Best for:
- Independent tasks
- Multiple developers
- CI/CD pipelines

```bash
/task-init project --mode=parallel
```

#### Sequential Mode
Best for:
- Dependent tasks
- Single developer
- Learning/debugging

```bash
/task-init project --mode=sequential
```

### Memory Management

For large projects:
```bash
# Increase Node.js memory
export NODE_OPTIONS="--max-old-space-size=4096"
claude code
```

### Cache Management

Clear TaskMaster cache:
```bash
rm -rf .claude/.cache/
rm -rf ~/.claude/taskmaster-cache/
```

## 🔌 API & Extensions

### TaskMaster JavaScript API

```javascript
// Custom taskmaster extension
const TaskMaster = require('./.claude/taskmaster.js');

// Initialize
const tm = new TaskMaster();

// Custom task addition
tm.addTask({
  id: 'custom-001',
  title: 'Custom Task',
  type: 'custom',
  priority: 'high'
});

// Hook into events
tm.on('task-complete', (task) => {
  console.log(`Task ${task.id} completed`);
});
```

### Event System

Available events:
- `init` - Project initialized
- `task-start` - Task execution started
- `task-complete` - Task finished
- `agent-delegate` - Agent delegation
- `review-required` - Human review needed

### Custom Command Creation

```javascript
// .claude/commands/my-command.js
module.exports = {
  name: 'my-command',
  description: 'Custom command',
  execute: async (args, context) => {
    // Command logic
    return { success: true, message: 'Done' };
  }
};
```

## 🔒 Security Considerations

### Sensitive Data Protection

Never store in TaskMaster:
- API keys
- Passwords
- Private keys
- Personal data

Use environment variables:
```bash
export API_KEY="your-key"
claude code
```

### Permission Management

Recommended permissions:
```bash
# TaskMaster files
chmod 755 .claude/hooks/*.sh
chmod 644 .claude/taskmaster-data/*.json
chmod 600 .claude/settings.local.json
```

## 📈 Metrics & Analytics

### Task Performance Metrics

View metrics:
```bash
/task-status --metrics
```

Output includes:
- Average task completion time
- Success/failure rates
- Agent utilization
- Bottleneck identification

### Custom Metrics

Add to `taskmaster.js`:
```javascript
metrics.track('custom-metric', {
  value: 123,
  tags: ['performance', 'custom']
});
```

## 🌐 Multi-Project Management

### Workspace Configuration

```json
{
  "workspaces": [
    {
      "name": "frontend",
      "path": "./frontend",
      "template": "react"
    },
    {
      "name": "backend",
      "path": "./backend",
      "template": "api"
    }
  ]
}
```

### Cross-Project Dependencies

```bash
/task-init workspace --multi-project
```

## 📚 Further Resources

### Documentation
- [TaskMaster Core Documentation](.claude/TASKMASTER_README.md) - Core system reference
- [Architecture Guide](.claude/ARCHITECTURE.md) - System design details
- [Getting Started](.claude/GETTING_STARTED.md) - Basic usage

### Community
- GitHub Issues: Report bugs and request features
- Discussions: Share tips and patterns
- Wiki: Community-contributed guides

### Updates
Check for updates:
```bash
claude code --version
```

---

**Note**: This guide focuses on customization and extension. For basic usage, see:
- [README](README.md) - Quick overview
- [Getting Started Guide](.claude/GETTING_STARTED.md) - Step-by-step tutorial
- [TaskMaster Documentation](.claude/TASKMASTER_README.md) - Core features