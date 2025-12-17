---
description: ARCHIVE MODE - Documentation, cleanup, and knowledge preservation
---

# 📚 ARCHIVE MODE - Documentation

## Prerequisites Check

Before entering ARCHIVE MODE, verify:
- ✅ Memory Bank exists
- ✅ `tasks.md` shows completed work
- ✅ `progress.md` documents implementation
- ✅ Reflection completed (from REFLECT MODE)

If prerequisites are not met:
```
⚠️ Required files not in expected state
Please return to /reflect mode to complete retrospective
```

## Core Responsibilities

1. **Documentation Finalization**
   - Create/update README
   - Write API documentation
   - Document configuration
   - Create user guides
   - Update changelog

2. **Knowledge Preservation**
   - Archive design decisions
   - Preserve implementation notes
   - Document workarounds and gotchas
   - Create troubleshooting guides

3. **Cleanup & Organization**
   - Organize Memory Bank files
   - Archive completed work
   - Clean up temporary files
   - Organize code comments

4. **Handoff Preparation**
   - Prepare onboarding docs
   - Document deployment process
   - Create maintenance runbook
   - List known issues and limitations

## Documentation Structure

### 1. README.md
```markdown
# Project Name

## Overview
Brief description of the project

## Features
- Feature 1: Description
- Feature 2: Description

## Installation
```bash
# Installation steps
```

## Usage
```bash
# Usage examples
```

## Configuration
Environment variables and configuration options

## Architecture
High-level architecture overview

## Contributing
Guidelines for contributors

## License
License information
```

### 2. API Documentation
```markdown
# API Documentation

## Endpoints

### GET /api/resource
**Description**: Get resource by ID

**Parameters**:
- `id` (string, required): Resource identifier

**Response**:
```json
{
  "id": "123",
  "data": "..."
}
```

**Error Codes**:
- 404: Resource not found
- 500: Internal server error
```

### 3. Architecture Documentation
```markdown
# Architecture

## System Overview
[High-level diagram]

## Components
- Component A: Responsibility and interaction
- Component B: Responsibility and interaction

## Data Flow
[Sequence diagrams]

## Design Decisions
References to creative-*.md files

## Technology Stack
- Frontend: [Technologies]
- Backend: [Technologies]
- Database: [Technologies]
- Infrastructure: [Technologies]
```

### 4. Deployment Guide
```markdown
# Deployment Guide

## Prerequisites
- Software X version Y
- Service A credentials
- Environment variables

## Steps
1. Step 1: Description
2. Step 2: Description

## Verification
How to verify successful deployment

## Rollback
How to rollback if needed

## Troubleshooting
Common issues and solutions
```

## Archive Structure

Create organized archive:
```
docs/
├── architecture/
│   ├── design-decisions/
│   │   ├── creative-001-database.md
│   │   └── creative-002-api.md
│   ├── diagrams/
│   └── adr/  # Architecture Decision Records
├── api/
│   ├── endpoints.md
│   └── examples/
├── guides/
│   ├── user-guide.md
│   ├── developer-guide.md
│   └── deployment-guide.md
└── runbooks/
    ├── maintenance.md
    ├── troubleshooting.md
    └── oncall.md
```

## Archive Checklist

### Documentation
- [ ] README complete and up-to-date
- [ ] API documentation written
- [ ] Architecture documented
- [ ] Configuration documented
- [ ] Deployment guide created
- [ ] User guide created
- [ ] Developer guide created

### Code Quality
- [ ] Code comments are clear
- [ ] Complex logic explained
- [ ] TODOs documented
- [ ] Technical debt tracked

### Knowledge Transfer
- [ ] Design decisions archived
- [ ] Implementation notes preserved
- [ ] Lessons learned documented
- [ ] Known issues listed
- [ ] Workarounds documented

### Cleanup
- [ ] Temporary files removed
- [ ] Debug code removed
- [ ] Unused dependencies removed
- [ ] Memory Bank organized

## Memory Bank Archival

### Files to Archive
```
archive/
└── [project-name]-[date]/
    ├── tasks.md
    ├── activeContext.md
    ├── progress.md
    ├── creative-*.md
    ├── reflection-*.md
    └── README.md
```

### Archival Script
```bash
# Create archive directory
mkdir -p archive/[project-name]-$(date +%Y%m%d)

# Copy Memory Bank files
cp memory-bank/*.md archive/[project-name]-$(date +%Y%m%d)/

# Create archive summary
echo "Archive created: $(date)" > archive/[project-name]-$(date +%Y%m%d)/ARCHIVE_INFO.txt
```

## Rules Loaded

This mode loads:
- `.cursor/rules/isolation_rules/main.mdc`
- `.cursor/rules/isolation_rules/Core/archiving-guide.md` (if exists)

## File Operations

### Read
- `memory-bank/tasks.md` - Completed tasks
- `memory-bank/progress.md` - Implementation details
- `memory-bank/creative-*.md` - Design decisions
- `memory-bank/reflection-*.md` - Retrospective

### Create
- `docs/` - Documentation directory
- `README.md` - Project documentation
- `CHANGELOG.md` - Version history
- `archive/` - Archived Memory Bank

### Archive
- Move completed Memory Bank to `archive/`
- Preserve all creative and reflection documents

## Exit Criteria

Before completing ARCHIVE MODE:
- ✅ All documentation written and reviewed
- ✅ Memory Bank files organized and archived
- ✅ Knowledge successfully transferred
- ✅ Cleanup completed
- ✅ Project ready for handoff or next phase
- ✅ Archive directory created with all artifacts

## Cycle Complete

After completing ARCHIVE MODE:
```
✅ Full workflow cycle complete!

You can now:
- Start a new cycle with /van for next phase
- Continue maintaining with existing documentation
- Hand off to another team with complete knowledge base
```

---

**📚 ARCHIVE MODE activated. Beginning documentation and knowledge preservation...**

