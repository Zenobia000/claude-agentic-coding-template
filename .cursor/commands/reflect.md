---
description: REFLECT MODE - Task review, retrospective, and lessons learned
---

# 🔍 REFLECT MODE - Task Review

## Prerequisites Check

Before entering REFLECT MODE, verify:
- ✅ Memory Bank exists
- ✅ `tasks.md` has completed tasks
- ✅ `progress.md` shows implementation history
- ✅ Implementation phase is complete

If prerequisites are not met:
```
⚠️ Required files not in expected state
Please return to /implement mode to complete implementation
```

## Core Responsibilities

1. **Review Implementation**
   - Read `tasks.md` for completed tasks
   - Read `progress.md` for implementation details
   - Analyze what was accomplished

2. **Retrospective Analysis**
   - What went well?
   - What could be improved?
   - What did we learn?
   - What should we do differently next time?

3. **Update Documentation**
   - Update `tasks.md` with final status
   - Add lessons learned
   - Document technical debt
   - Identify future improvements

## Reflection Framework

### 1. Accomplishment Review
```markdown
## What We Built
- Feature A: Description and impact
- Feature B: Description and impact
- Feature C: Description and impact

## Metrics
- Tasks Completed: X/Y
- Code Coverage: Z%
- Performance: Within/Outside targets
- Technical Debt: Low/Medium/High
```

### 2. Process Reflection
```markdown
## What Went Well 👍
- Effective design phase prevented rework
- Clear task breakdown made implementation smooth
- Good communication on blockers

## What Could Be Improved 🔧
- Better estimation needed for complex tasks
- More frequent testing would catch issues earlier
- Design decisions needed earlier stakeholder input

## Surprises/Learnings 💡
- Technology X was easier to integrate than expected
- Performance bottleneck in unexpected area
- New pattern learned: [pattern name]
```

### 3. Technical Debt Tracking
```markdown
## Technical Debt Identified
1. **Debt Item**: Quick fix in module X
   - **Impact**: Medium
   - **Effort to Fix**: 2 days
   - **Priority**: Should address in next sprint

2. **Debt Item**: Missing test coverage in area Y
   - **Impact**: High
   - **Effort to Fix**: 3 days
   - **Priority**: Must fix before next release
```

### 4. Future Improvements
```markdown
## Recommendations for Next Phase
1. **Process**: Implement daily standups
2. **Technical**: Refactor module X for better maintainability
3. **Testing**: Add integration tests for critical paths
4. **Documentation**: Create API usage examples
```

## Reflection Template

```markdown
# Reflection: [Sprint/Phase Name]

**Date**: YYYY-MM-DD
**Phase**: REFLECT MODE
**Duration**: [Start Date] to [End Date]

## Summary
Brief overview of what was accomplished

## Accomplishments
- [x] Major achievement 1
- [x] Major achievement 2
- [x] Major achievement 3

## Metrics
- **Planned Tasks**: X
- **Completed Tasks**: Y (Z%)
- **Blocked Tasks**: N
- **Average Task Duration**: X hours/days

## Retrospective

### What Went Well
1. Point 1
2. Point 2
3. Point 3

### What Could Be Improved
1. Point 1 - Suggested improvement
2. Point 2 - Suggested improvement
3. Point 3 - Suggested improvement

### Key Learnings
1. Learning 1
2. Learning 2
3. Learning 3

## Technical Debt
- Debt item 1 (Priority: High/Medium/Low)
- Debt item 2 (Priority: High/Medium/Low)

## Action Items for Next Phase
- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

## Notes
Additional observations and context
```

## Quality Assessment

### Code Quality
- [ ] Follows coding standards
- [ ] Well-documented
- [ ] Properly tested
- [ ] Performance optimized
- [ ] Security considerations addressed

### Process Quality
- [ ] Tasks were well-defined
- [ ] Estimates were accurate
- [ ] Communication was effective
- [ ] Blockers were resolved quickly
- [ ] Documentation kept current

## Rules Loaded

This mode loads:
- `.cursor/rules/isolation_rules/main.mdc`
- `.cursor/rules/isolation_rules/Core/reflection-format.md` (if exists)

## File Operations

### Read
- `memory-bank/tasks.md` - Completed tasks
- `memory-bank/progress.md` - Implementation history
- `memory-bank/creative-*.md` - Design decisions

### Update
- `memory-bank/tasks.md` - Final status and lessons
- `memory-bank/activeContext.md` - Update phase to REFLECT MODE

### Create
- `memory-bank/reflection-[date].md` - Retrospective document

## Exit Criteria

Before completing REFLECT MODE:
- ✅ All completed tasks reviewed
- ✅ Retrospective completed
- ✅ Lessons learned documented
- ✅ Technical debt identified and prioritized
- ✅ Recommendations for next phase documented
- ✅ Reflection document created

## Next Mode

After completing reflection:
```
Phase complete. NEXT MODE: /archive
```

---

**🔍 REFLECT MODE activated. Beginning task review and retrospective analysis...**

