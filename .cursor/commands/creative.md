---
description: CREATIVE MODE - Design decisions, architecture planning, and technical choices
---

# 🎨 CREATIVE MODE - Design Decisions

## Prerequisites Check

Before entering CREATIVE MODE, verify:
- ✅ Memory Bank exists
- ✅ `tasks.md` has planned tasks (from PLAN MODE)
- ✅ `activeContext.md` is current

If prerequisites are not met:
```
⚠️ Required files not in expected state
Please return to /plan mode to complete task planning
```

## Core Responsibilities

1. **Read Task Requirements**
   - Review planned tasks from `tasks.md`
   - Identify tasks requiring design decisions
   - Understand technical constraints

2. **Design & Architecture**
   - Make technical stack decisions
   - Design system architecture
   - Choose design patterns
   - Plan data structures
   - Define APIs and interfaces

3. **Document Decisions**
   - Create `creative-[topic].md` files in Memory Bank
   - Document rationale for each decision
   - Include alternatives considered
   - Reference Architecture Decision Records (ADR)

## Design Decision Framework

### 1. Problem Definition
- What problem are we solving?
- What are the constraints?
- What are the requirements?

### 2. Options Analysis
- Option A: Description, Pros, Cons
- Option B: Description, Pros, Cons
- Option C: Description, Pros, Cons

### 3. Decision & Rationale
- **Chosen**: Option X
- **Rationale**: Why this option was selected
- **Trade-offs**: What we're giving up
- **Validation**: How we'll know it's working

## Creative Decision Template

```markdown
# Creative Decision: [Topic]

**Date**: YYYY-MM-DD
**Status**: Proposed/Accepted/Superseded

## Context
What is the issue we're facing?

## Decision
What design/architecture approach are we taking?

## Alternatives Considered
1. **Alternative A**: Description, pros, cons
2. **Alternative B**: Description, pros, cons

## Consequences
- **Positive**: Benefits of this decision
- **Negative**: Drawbacks or limitations
- **Risks**: Potential risks and mitigation

## Implementation Notes
Technical details for implementation

## References
- Links to relevant documentation
- Related decisions
```

## Common Design Decisions

### Architecture
- Monolithic vs Microservices
- Client-Server vs P2P
- Layered vs Event-Driven
- RESTful vs GraphQL vs gRPC

### Data
- SQL vs NoSQL
- Schema design
- Caching strategy
- Data consistency model

### UI/UX
- Design system
- Component structure
- State management
- Responsive approach

### Security
- Authentication method
- Authorization model
- Data encryption
- API security

## Rules Loaded

This mode loads:
- `.cursor/rules/isolation_rules/main.mdc`
- `.cursor/rules/isolation_rules/Core/creative-phase.md` (if exists)
- `.cursor/rules/isolation_rules/Core/design-patterns.md` (if exists)

## File Operations

### Read
- `memory-bank/tasks.md` - Tasks requiring design decisions
- `memory-bank/activeContext.md` - Current focus

### Create
- `memory-bank/creative-[topic].md` - Design decision documents

### Update
- `memory-bank/tasks.md` - Update tasks with design references
- `memory-bank/activeContext.md` - Update phase to CREATIVE MODE

## Exit Criteria

Before completing CREATIVE MODE:
- ✅ All major design decisions documented
- ✅ Architecture clearly defined
- ✅ Technical stack chosen with rationale
- ✅ Design files created in Memory Bank
- ✅ Tasks updated with design references

## Next Mode

After completing design decisions:
```
Phase complete. NEXT MODE: /implement
```

---

**🎨 CREATIVE MODE activated. Beginning design and architecture planning...**

