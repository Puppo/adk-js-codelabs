# Workshop Guide: Build a Conference Schedule Agent

Welcome to the ADK-JS workshop! You'll build a Conference Schedule Agent for **DevFest Pisa 2026** — step by step, from a simple chatbot to a multi-agent system with parallel execution.

## Overview

```
Step 1: LlmAgent          -> Simple agent with hardcoded schedule
Step 2: FunctionTool       -> Extract data into tools
Step 3: SequentialAgent    -> Two-agent refinement pipeline
Step 4: LoopAgent          -> Iterative self-improvement with a critic
Step 5: ParallelAgent      -> Multi-strategy generation + selector
```

## Prerequisites

Make sure you've completed the setup from the [README](README.md):

- Node.js 24+, npm 10+, Git
- Google AI API Key ([get one here](https://aistudio.google.com/apikey))
- Run `./scripts/check-setup.sh` to verify

---

## Step 1: Your First Agent

**Concept:** `LlmAgent` — the building block of ADK

**Branch:** `01-intro-init` -> `01-intro-final`

### What you'll learn

An `LlmAgent` wraps a large language model with a name, description, and instruction (system prompt). The instruction defines the agent's personality and knowledge. In this step, we embed the entire conference schedule directly in the prompt.

### Get started

```bash
git checkout 01-intro-init
npm install
```

### Your task

Open `src/agent.ts` and complete the TODOs:

1. Create an `LlmAgent` with the name `conferenceAgent`
2. Set the model to `gemini-3.0-flash`
3. Write an instruction that includes the full DevFest Pisa 2026 schedule (sessions, speakers, times, rooms, tracks)
4. Export it as `rootAgent`

**Key code:**

```typescript
import "dotenv/config";
import { LlmAgent } from "@google/adk";

export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: "gemini-3.0-flash",
  description: "A helpful assistant for DevFest Pisa 2026",
  instruction: `You are a friendly conference assistant...
    // Add the full schedule here
  `,
});
```

### Try it

```bash
npm run dev
```

This launches the ADK DevTools web UI. Open your browser and try:

- _"What AI sessions are available?"_
- _"Tell me about Dr. Elena Rossi"_
- _"Plan my day — I love Cloud and DevOps, intermediate level"_

### Check the solution

```bash
git checkout 01-intro-final
```

### Reflection

The agent works, but the instruction is **huge**. All the conference data is hardcoded in the prompt. What if the schedule changes? What if you want to pull data from a real API? This motivates **Step 2**.

---

## Step 2: Adding Tools

**Concept:** `FunctionTool` — give your agent superpowers

**Branch:** `02-tools-init` -> `02-tools-final`

### What you'll learn

Tools are functions that the LLM can call to retrieve data or perform actions. Instead of stuffing everything in the prompt, we define tools with typed parameters (using Zod schemas) and let the agent decide when to call them.

### Get started

```bash
git checkout 02-tools-init
npm install
```

### Your task

You'll find three files to work on:

**1. `src/data/conferenceData.ts`** — Already provided! Contains typed arrays of sessions and speakers.

**2. `src/tools.ts`** — Create three FunctionTools:

```typescript
import { FunctionTool } from "@google/adk";
import { z } from "zod/v3";
import { sessions, speakers } from "./data/conferenceData.js";

export const getSessions = new FunctionTool({
  name: "get_sessions",
  description:
    "Get conference sessions, optionally filtered by track, time slot, or difficulty.",
  parameters: z.object({
    track: z
      .string()
      .optional()
      .describe("Filter by track: AI/ML, Web, Cloud, Mobile, or DevOps"),
    timeSlot: z
      .string()
      .optional()
      .describe("Filter by time slot, e.g. 'morning' or 'afternoon'"),
    difficulty: z
      .string()
      .optional()
      .describe("Filter by difficulty: Beginner, Intermediate, or Advanced"),
  }),
  execute: async ({ track, timeSlot, difficulty }) => {
    // Filter sessions based on parameters and return formatted results
  },
});
```

**3. `src/agent.ts`** — Slim down the instruction and add tools:

```typescript
export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: "gemini-3.0-flash",
  description: "A helpful assistant for DevFest Pisa 2026",
  instruction: `You are a friendly conference assistant...
    Use your tools to look up session and speaker information.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
});
```

### Try it

```bash
npm run dev
```

Ask the same questions as Step 1. Open the **trace view** in DevTools — you'll see the agent calling tools instead of relying on hardcoded data.

- _"What advanced sessions are there?"_
- _"Who works at Google?"_
- _"I'm interested in AI and Cloud, intermediate level"_

### Check the solution

```bash
git checkout 02-tools-final
```

### Reflection

Now data is separated from logic, but the agent does everything in one shot. For complex tasks like schedule building, it would be better to have **specialized agents** working together. That's **Step 3**.

---

## Step 3: Sequential Flow

**Concept:** `SequentialAgent` — a pipeline of agents

**Branch:** `03-sequential-init` -> `03-sequential-final`

### What you'll learn

A `SequentialAgent` executes sub-agents in a fixed order. Each agent focuses on one job and stores its output in shared state using `outputKey`. The next agent reads that state via `{{templateVariables}}` in its instruction.

### Get started

```bash
git checkout 03-sequential-init
npm install
```

### Your task

**1. `src/agents/scheduleBuilder.ts`** — Builds an initial schedule:

```typescript
import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: "gemini-3.0-flash",
  description: "Builds a draft conference schedule based on user preferences",
  instruction: `You are a schedule builder for DevFest Pisa 2026...`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
```

**2. `src/agents/scheduleOptimizer.ts`** — Refines the schedule:

```typescript
export const scheduleOptimizer = new LlmAgent({
  name: "scheduleOptimizer",
  model: "gemini-3.0-flash",
  description: "Optimizes a draft schedule for conflicts and logistics",
  instruction: `You are a schedule optimizer. Review this draft schedule:
{{draftSchedule}}

Check for: time conflicts, missing breaks, room-hopping, and suggest alternatives.`,
  outputKey: "optimizedSchedule",
});
```

**3. `src/agent.ts`** — Compose them:

```typescript
import { SequentialAgent } from "@google/adk";

export const rootAgent = new SequentialAgent({
  name: "schedulePipeline",
  subAgents: [scheduleBuilder, scheduleOptimizer],
});
```

### Try it

```bash
npm run dev
```

- _"Build me a schedule. I love AI and DevOps, intermediate level."_

Watch the trace: `scheduleBuilder` runs first, then `scheduleOptimizer` refines the result.

### Check the solution

```bash
git checkout 03-sequential-final
```

### Reflection

The pipeline works in one pass. But what if the optimizer finds issues the builder should fix? Currently there's no feedback loop. **Step 4** introduces iteration.

---

## Step 4: Loop Flow

**Concept:** `LoopAgent` — iterative refinement

**Branch:** `04-loop-init` -> `04-loop-final`

### What you'll learn

A `LoopAgent` repeats its sub-agents until a condition is met (or max iterations is reached). This enables the **generator/critic pattern**: one agent builds, another reviews, and the loop continues until the critic is satisfied and calls `escalate` to exit.

### Get started

```bash
git checkout 04-loop-init
npm install
```

### Your task

**1. `src/agents/scheduleBuilder.ts`** — Update to be revision-aware:

```typescript
export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: "gemini-3.0-flash",
  instruction: `You are a schedule builder for DevFest Pisa 2026.

If there is reviewer feedback, incorporate it:
{{reviewerFeedback}}

Build or revise the schedule based on user preferences.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
```

**2. `src/agents/scheduleReviewer.ts`** — The critic agent with an exit tool:

```typescript
const exitLoop = new FunctionTool({
  name: "exit_loop",
  description: "Call this when the schedule meets all quality criteria.",
  parameters: z.object({}),
  execute: async (_, context) => {
    context.actions.escalate = true;
    return { status: "approved" };
  },
});

export const scheduleReviewer = new LlmAgent({
  name: "scheduleReviewer",
  instruction: `Review this schedule: {{draftSchedule}}
Evaluate: time conflicts, preference match, topic balance, breaks, difficulty variety.
If ALL criteria pass, call exit_loop. Otherwise provide feedback.`,
  tools: [exitLoop],
  outputKey: "reviewerFeedback",
});
```

**3. `src/agent.ts`** — Wire them into a loop:

```typescript
import { LoopAgent, SequentialAgent } from "@google/adk";

export const rootAgent = new LoopAgent({
  name: "scheduleLoop",
  subAgents: [
    new SequentialAgent({
      name: "buildAndReview",
      subAgents: [scheduleBuilder, scheduleReviewer],
    }),
  ],
  maxIterations: 3,
});
```

### Try it

```bash
npm run dev
```

- _"Build me a schedule. I'm interested in everything but especially AI."_

Watch the trace show multiple iterations — the schedule improves each round until the reviewer is satisfied.

### Check the solution

```bash
git checkout 04-loop-final
```

### Reflection

The loop produces a high-quality single schedule. But what if you want to explore **different strategies**? Running them one by one would be slow. **Step 5** runs them in parallel.

---

## Step 5: Parallel Flow

**Concept:** `ParallelAgent` — concurrent execution

**Branch:** `05-parallel-init` -> `05-parallel-final`

### What you'll learn

A `ParallelAgent` runs multiple sub-agents simultaneously. Think of it as asking three friends to each plan your day with different priorities, then picking the best plan.

### Get started

```bash
git checkout 05-parallel-init
npm install
```

### Your task

Create three strategy agents, a selector, and compose them:

**1. `src/agents/topicMatchStrategy.ts`** — Optimize for topic relevance:

```typescript
export const topicMatchStrategy = new LlmAgent({
  name: "topicMatchStrategy",
  instruction: `Build a schedule that maximizes relevance to the user's stated interests.
Prioritize sessions from their preferred tracks.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "topicSchedule",
});
```

**2. `src/agents/speakerQualityStrategy.ts`** — Optimize for top speakers.

**3. `src/agents/diversityStrategy.ts`** — Optimize for breadth and variety.

**4. `src/agents/bestScheduleSelector.ts`** — Compare and pick the best:

```typescript
export const bestScheduleSelector = new LlmAgent({
  name: "bestScheduleSelector",
  instruction: `Compare these three schedule proposals:

Topic-optimized: {{topicSchedule}}
Speaker-optimized: {{speakerSchedule}}
Diversity-optimized: {{diversitySchedule}}

Select the best one (or create a hybrid). Explain the trade-offs.`,
  outputKey: "finalSchedule",
});
```

**5. `src/agent.ts`** — Compose everything:

```typescript
import { SequentialAgent, ParallelAgent } from "@google/adk";

const strategyRunner = new ParallelAgent({
  name: "strategyRunner",
  subAgents: [topicMatchStrategy, speakerQualityStrategy, diversityStrategy],
});

export const rootAgent = new SequentialAgent({
  name: "scheduleGenerator",
  subAgents: [strategyRunner, bestScheduleSelector],
});
```

### Try it

```bash
npm run dev
```

- _"Build me a schedule. I'm a backend developer interested in Cloud and DevOps but also curious about AI."_

Watch the trace: three strategy agents light up simultaneously, then the selector picks the best.

### Check the solution

```bash
git checkout 05-parallel-final
```

---

## Recap

| Step | Concept           | What you built                                  |
| ---- | ----------------- | ----------------------------------------------- |
| 1    | `LlmAgent`        | Single agent with hardcoded conference data     |
| 2    | `FunctionTool`    | Agent with tools for dynamic data retrieval     |
| 3    | `SequentialAgent` | Builder -> Optimizer pipeline                   |
| 4    | `LoopAgent`       | Builder <-> Reviewer iterative refinement       |
| 5    | `ParallelAgent`   | 3 strategies in parallel -> Selector picks best |

You've gone from a simple chatbot to a sophisticated multi-agent system! Each ADK concept builds on the previous, giving you a toolkit for building real-world AI agent applications.

## Next Steps

- Explore the [ADK documentation](https://google.github.io/adk-docs/)
- Try adding your own tools (e.g., fetch real conference data from an API)
- Experiment with different agent compositions
- Deploy your agent using Docker and Cloud Run
