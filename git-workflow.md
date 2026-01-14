# 🔄 Git Workflow & Command Guide

## 📖 Overview

This template supports **Dual-Mode Workflows** to adapt to your project stage. Whether you are a solo founder building an MVP or a scaling team with strict reviews, the AI commands adapt to your needs.

---

## 🌳 Branching Strategy (The Foundation)

We use a flexible branching model. **Choose one** strategy for your project:

| Strategy | **Solo Mode** (GitHub Flow) | **Team Mode** (Git Flow Lite) |
| :--- | :--- | :--- |
| **Main Branch** | `main` (Production) | `main` (Production) |
| **Dev Branch** | *(Not used)* | `develop` (Staging/Integration) |
| **Feature Base** | `main` | `develop` |
| **Release Path** | Feature → Main | Feature → Develop → Main |

---

## 🎮 Workflow Modes

### 🚀 Mode 1: Solo Speed Run
**Best for**: Solo Founders, Prototyping, MVP.
**Philosophy**: "Speed is life. Main is truth."

1.  **Start** (`/task-start`): Create branch from `main`.
2.  **Commit** (`/commit`): Save often locally.
3.  **Ship** (`/ship`): Squash merge to `main` & push.

### 🤝 Mode 2: Team Collaboration
**Best for**: Teams, Production Systems, Open Source.
**Philosophy**: "Review first. Protect main."

#### ⚠️ Setup Requirement
**Before starting Team Mode**, you must initialize the development branch once:
```bash
git checkout main
git checkout -b develop
git push -u origin develop
```
*The AI commands detect the existence of `develop` to automatically switch to Team Mode.*

#### The Cycle
1.  **Start** (`/task-start`): Create branch from `develop`.
2.  **Commit** (`/commit`): Save often locally.
3.  **PR** (`/pr`): Rebase & push, then **Copy-Paste the AI-generated PR Description**.

---

## ⚡ Workflow Combos (The Daily Grind)

### Scenario A: Daily Feature Development (The 90%)

| Step | Solo Mode Command | Team Mode Command | Action Taken |
| :--- | :--- | :--- | :--- |
| **1. Start** | `/start id=101 desc=login` | `/start id=101 desc=login` | Creates `feat/101-login` from **Base** (`main` vs `develop`). |
| **2. Work** | (Code...) | (Code...) | Write code. |
| **3. Save** | `/commit` | `/commit` | Local checkpoint. (Repeat as needed). |
| **4. Finish** | **`/ship`** | **`/pr`** | **Solo**: Squash merge to `main` & delete branch.<br>**Team**: Push + **Generate PR Description**. |

### Scenario B: Hotfix (Emergency Fix)

*System Down! Production bug needs immediate fix.*

| Step | Solo Mode | Team Mode | Action Taken |
| :--- | :--- | :--- | :--- |
| **1. Start** | `/starttype=hotfix id=fix-1` | `/starttype=hotfix id=fix-1` | **Both** modes branch from `main`. |
| **2. Work** | (Fix bug...) | (Fix bug...) | Fix the critical issue. |
| **3. Save** | `/commit` | `/commit` | Local checkpoint. |
| **4. Finish** | **`/ship`** | **`/pr`** | **Solo**: Merge to `main` immediately.<br>**Team**: Push for **Urgent** PR Review. |

---

## 🛠️ Command Reference

### `/task-start`
**Intelligent Context Switching**
- **Solo Mode**: Checks out `main` -> pulls -> creates feature branch.
- **Team Mode**: Checks out `develop` -> pulls -> creates feature branch.
- **Hotfix**: Always checks out `main`.

### `/commit`
**Universal Local Save**
- Safety guard: **NEVER PUSHES**.
- Generates Conventional Commits message.
- "Save game" point.

### `/ship` (Solo Only)
**The "One-Click" Delivery**
- **AI Review**: Summarizes your mess of commits.
- **Squash**: `git merge --squash` (1 feature = 1 commit on main).
- **Push**: Updates remote `main`.
- **Cleanup**: Deletes local feature branch.

### `/pr` (Team Only)
**The Hand-off**
- **Rebase**: `git rebase origin/develop` (Keeps history linear).
- **Push**: Pushes feature branch to remote.
- **Generator**: **Creates a structured PR description** for you to copy.

---

## ❓ FAQ

**Q: Can I switch modes?**
A: Yes. If you hire a teammate, simply start using `/pr` instead of `/ship`, and ensure you have a `develop` branch created.

**Q: Where is my `develop` branch in Solo Mode?**
A: You don't need one. We follow **GitHub Flow** for simplicity. If you really want one, you are effectively in **Team Mode** (even if you are a team of one).

**Q: What if `/ship` encounters a merge conflict?**
A: The AI will stop and ask you to resolve conflicts manually, then you can run `/ship` again or finish manually.

**Q: What's the correct PR workflow?**
A: The standard workflow is:
1. Create feature branch from `main`
2. Develop and commit changes on feature branch
3. Push feature branch to remote
4. Create PR from feature branch to `main`
5. Review and merge PR into `main`

**Q: How do I merge a PR using GitHub CLI?**
A: After creating a PR, you can merge it using:
```bash
gh pr merge <pr-number> --squash    # Recommended: squash commits
gh pr merge <pr-number> --merge     # Keep all commits
gh pr merge <pr-number> --rebase    # Rebase commits
```
