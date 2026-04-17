# 🎓 ADK-JS Codelabs

> 🤖 Build a Conference Schedule Agent with Google ADK for JavaScript

Welcome to the **ADK-JS Codelabs**! 👋 In this hands-on workshop, you'll build an intelligent conference assistant agent that helps attendees plan their perfect day at a conference. 🗓️

You'll progress from creating a simple conversational agent to building a full-featured, multi-agent system with tools and advanced orchestration flows. 🚀

## 📋 Prerequisites

Before the workshop, make sure you have the following installed: 🛠️

| Tool              | Version | Link                                                             |
| ----------------- | ------- | ---------------------------------------------------------------- |
| Node.js           | 24+     | [nodejs.org](https://nodejs.org/)                                |
| npm               | 10+     | Comes with Node.js                                               |
| Git               | Latest  | [git-scm.com](https://git-scm.com/)                              |
| Google AI API Key | -       | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

### 🔑 Configure Your API Key

Copy the example environment file and add your Google AI API key: 📝

```bash
cp .env.example .env
```

Then open `.env` and replace `YOUR_API_KEY_HERE` with your actual key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

### ✅ Verify Your Setup

Run the setup check script to make sure everything is ready: 🔍

```bash
git clone https://github.com/<your-org>/adk-js-codelabs.git
cd adk-js-codelabs
npm install
chmod +x scripts/check-setup.sh
./scripts/check-setup.sh
```

**🪟 Windows (PowerShell):**

```powershell
git clone https://github.com/<your-org>/adk-js-codelabs.git
cd adk-js-codelabs
npm install
.\scripts\check-setup.ps1
```

## 📁 Project Structure

Each step lives in its own folder under `src/`: 🗂️

```text
src/
  01-intro/          Step 1: LlmAgent
  02-tools/          Step 2: FunctionTool
  03-sequential/     Step 3: SequentialAgent
  04-loop/           Step 4: LoopAgent
  05-parallel/       Step 5: ParallelAgent
```

The `main` branch has the starter code with TODOs. 📝 The `final` branch has the complete solutions. ✨

## 🎯 Workshop Steps

| Step                   | Folder               | Concept           | Run command      |
| ---------------------- | -------------------- | ----------------- | ---------------- |
| **1. Intro**           | `src/01-intro/`      | `LlmAgent`        | `npm run dev:01` |
| **2. Tools**           | `src/02-tools/`      | `FunctionTool`    | `npm run dev:02` |
| **3. Sequential Flow** | `src/03-sequential/` | `SequentialAgent` | `npm run dev:03` |
| **4. Loop Flow**       | `src/04-loop/`       | `LoopAgent`       | `npm run dev:04` |
| **5. Parallel Flow**   | `src/05-parallel/`   | `ParallelAgent`   | `npm run dev:05` |

## 🧭 How to Navigate

1. 📂 Open the step folder and complete the TODOs in the code
2. ▶️ Run the step with the corresponding `npm run dev:XX` command
3. 💡 If you get stuck, check the solution on the `final` branch

```bash
# Run Step 1
npm run dev:01

# Check the solution for any step
git checkout final
# Then switch back to main to continue working
git checkout main
```

📖 Follow the [WORKSHOP.md](WORKSHOP.md) guide for detailed step-by-step instructions.

## 🏗️ What You'll Build

A **Conference Schedule Agent** 🎤 that can:

- 💬 Answer questions about DevFest Pisa 2026 sessions, speakers, and tracks
- 🔧 Fetch session and speaker data dynamically using tools
- 🎯 Build personalized schedules based on user interests
- 🔄 Refine schedules using a two-agent sequential pipeline
- ♻️ Self-improve schedules through iterative review loops
- ⚡ Generate multiple schedule strategies in parallel and pick the best one

## 🤖 AI-Assisted Development (Optional)

You can supercharge your development experience with ADK dev skills: ⚡

### 🛠️ ADK Dev Skills

```bash
npx skills add google/adk-docs/skills -y -g
```

📚 Learn more: [Coding with AI - ADK Docs](https://google.github.io/adk-docs/tutorials/coding-with-ai/)

## ℹ️ About

This workshop was created for learning ADK-JS, targeting newbie and experienced developers alike. 👨‍💻👩‍💻 No prior AI/ML experience is required — just bring your curiosity 🧠 and your laptop! 💻

## 📄 License

MIT
