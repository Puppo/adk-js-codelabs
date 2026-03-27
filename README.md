# ADK-JS Codelabs

> Build a Conference Schedule Agent with Google ADK for JavaScript

Welcome to the **ADK-JS Codelabs**! In this hands-on workshop, you'll build an intelligent conference assistant agent that helps attendees plan their perfect day at a conference.

You'll progress from creating a simple conversational agent to building a full-featured, multi-agent system with tools and advanced orchestration flows.

## Prerequisites

Before the workshop, make sure you have the following installed:

| Tool              | Version | Link                                                             |
| ----------------- | ------- | ---------------------------------------------------------------- |
| Node.js           | 24+     | [nodejs.org](https://nodejs.org/)                                |
| npm               | 10+     | Comes with Node.js                                               |
| Git               | Latest  | [git-scm.com](https://git-scm.com/)                              |
| Google AI API Key | -       | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

### Configure Your API Key

Copy the example environment file and add your Google AI API key:

```bash
cp .env.example .env
```

Then open `.env` and replace `YOUR_API_KEY_HERE` with your actual key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

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

## Workshop Steps

| Step                   | Branch (Init)        | Branch (Solution)     | Concept           |
| ---------------------- | -------------------- | --------------------- | ----------------- |
| **1. Intro**           | `01-intro-init`      | `01-intro-final`      | `LlmAgent`        |
| **2. Tools**           | `02-tools-init`      | `02-tools-final`      | `FunctionTool`    |
| **3. Sequential Flow** | `03-sequential-init` | `03-sequential-final` | `SequentialAgent` |
| **4. Loop Flow**       | `04-loop-init`       | `04-loop-final`       | `LoopAgent`       |
| **5. Parallel Flow**   | `05-parallel-init`   | `05-parallel-final`   | `ParallelAgent`   |

## How to Navigate

Each step has two branches:

- **`*-init`**: The starter code with TODO comments where you'll write your solution
- **`*-final`**: The complete solution for reference

```bash
# Start Step 1
git checkout 01-intro-init

# Check the solution if you get stuck
git checkout 01-intro-final

# Move to Step 2
git checkout 02-tools-init
```

Follow the [WORKSHOP.md](WORKSHOP.md) guide for detailed step-by-step instructions.

## What You'll Build

A **Conference Schedule Agent** that can:

- Answer questions about DevFest Pisa 2026 sessions, speakers, and tracks
- Fetch session and speaker data dynamically using tools
- Build personalized schedules based on user interests
- Refine schedules using a two-agent sequential pipeline
- Self-improve schedules through iterative review loops
- Generate multiple schedule strategies in parallel and pick the best one

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

This workshop was created for learning ADK-JS, targeting newbie and experienced developers alike. No prior AI/ML experience is required — just bring your curiosity and your laptop!

## License

MIT
