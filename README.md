# ADK-JS Codelabs

> Build a Conference Schedule Agent with Google ADK for JavaScript

Welcome to the **ADK-JS Codelabs**! In this hands-on workshop, you'll build an intelligent conference assistant agent that helps attendees plan their perfect day at a conference.

You'll progress from creating a simple conversational agent to deploying a full-featured, multi-agent system with database-backed tools and advanced orchestration flows.

## Prerequisites

Before the workshop, make sure you have the following installed:

| Tool              | Version | Link                                                             |
| ----------------- | ------- | ---------------------------------------------------------------- |
| Node.js           | 22+     | [nodejs.org](https://nodejs.org/)                                |
| npm               | 10+     | Comes with Node.js                                               |
| Docker            | Latest  | [docker.com](https://www.docker.com/products/docker-desktop/)    |
| Docker Compose    | v2+     | Included in Docker Desktop                                       |
| Git               | Latest  | [git-scm.com](https://git-scm.com/)                              |
| Google AI API Key | -       | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

### Verify Your Setup

Run the setup check script to make sure everything is ready:

```bash
git clone https://github.com/<your-org>/adk-js-codelabs.git
cd adk-js-codelabs
chmod +x scripts/check-setup.sh
./scripts/check-setup.sh
```

**Windows (PowerShell):**

```powershell
git clone https://github.com/<your-org>/adk-js-codelabs.git
cd adk-js-codelabs
.\scripts\check-setup.ps1
```

## Workshop Phases

| Phase                     | Branch (Init)                  | Branch (Solution)               | Description                                           |
| ------------------------- | ------------------------------ | ------------------------------- | ----------------------------------------------------- |
| **1. Intro**              | `01-intro-init`                | `01-intro-final`                | Create your first ADK agent with a system instruction |
| **2. Tools & Sub-Agents** | `02-tools-and-sub-agents-init` | `02-tools-and-sub-agents-final` | Add database-backed tools and compose agents          |
| **3. Flows**              | `03-flows-init`                | `03-flows-final`                | Build Sequential, Parallel, and Loop workflows        |
| **4. Deploy**             | `04-deploy-init`               | `04-deploy-final`               | Containerize with Docker and deploy to Cloud Run      |

## How to Navigate

Each phase has two branches:

- **`*-init`**: The starter code with TODO comments where you'll write your solution
- **`*-final`**: The complete solution for reference

```bash
# Start Phase 1
git checkout 01-intro-init

# Check the solution if you get stuck
git checkout 01-intro-final

# Move to Phase 2
git checkout 02-tools-and-sub-agents-init
```

Each branch has its own README with detailed instructions for that phase.

## What You'll Build

A **Conference Schedule Agent** that can:

- Answer questions about a Conference's sessions, speakers, and tracks
- Search a database of sessions and speakers using tools
- Recommend personalized schedules based on user interests
- Build optimized schedules using sequential, parallel, and loop workflows
- Run in a Docker container and deploy to the cloud

## AI-Assisted Development (Optional)

You can supercharge your development experience with ADK dev skills:

### ADK Dev Skills

```bash
npx skills add google/adk-docs/skills -y -g
```

### ADK Docs MCP Server (for Claude Code)

```bash
claude mcp add adk-docs -- npx -y -p @anthropic-ai/claude-code @anthropic-ai/claude-mcp-fetch https://google.github.io/adk-docs/llms.txt
```

Learn more: [Coding with AI - ADK Docs](https://google.github.io/adk-docs/tutorials/coding-with-ai/)

## About

This workshop was created for learning ADK-js, targeting newbie and experienced developers alike. No prior AI/ML experience is required — just bring your curiosity and your laptop!

## License

MIT
