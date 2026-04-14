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

## Project Structure

Each step lives in its own folder under `src/`. You work through them in order, and each folder is self-contained:

```
src/
  01-intro/          -> Step 1
  02-tools/          -> Step 2
  03-sequential/     -> Step 3
  04-loop/           -> Step 4
  05-parallel/       -> Step 5
```

The `main` branch contains the starter code with TODOs for you to complete. The `final` branch contains the full solutions for reference.

## Prerequisites

Make sure you've completed the setup from the [README](README.md):

- Node.js 24+, npm 10+, Git
- Google AI API Key ([get one here](https://aistudio.google.com/apikey))
- Run `./scripts/check-setup.sh` to verify

### Install dependencies

```bash
npm install
```

---

## Step 1: Your First Agent

**Concept:** `LlmAgent` — the building block of ADK

**Folder:** `src/01-intro/`

### What you'll learn

An `LlmAgent` wraps a large language model with a name, description, and instruction (system prompt). The instruction defines the agent's personality and knowledge. In this step, we use shared markdown utilities to inject the conference data into the agent's prompt.

The project includes a `src/common/` folder with reusable modules:

- **`conferenceData.ts`** — loads and validates conference, speakers, and schedule data from JSON files using Zod schemas
- **`toMarkdown.ts`** — converts each data type into well-structured markdown, ideal for LLM consumption

### Your task

Open `src/01-intro/agent.ts` and complete the TODOs:

1. Import `{ conference, speakers, schedule }` from `"../common/conferenceData.js"`
2. Import `{ conferenceToMarkdown, speakersToMarkdown, scheduleToMarkdown }` from `"../common/toMarkdown.js"`
3. Use these functions inside a template literal to build the agent's `instruction`
4. Add a section describing how the agent should help attendees

**Key code:**

```typescript
import { LlmAgent } from "@google/adk";
import { conference, speakers, schedule } from "../common/conferenceData.js";
import {
  conferenceToMarkdown,
  speakersToMarkdown,
  scheduleToMarkdown,
} from "../common/toMarkdown.js";
import { getModel } from "../common/models.js";

export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: getModel(),
  description: "A helpful assistant for DevFest Pisa 2026",
  instruction: `You are a friendly and enthusiastic conference assistant...

// Inject conference data as markdown here

## How you help attendees

- Answer questions about sessions, speakers, rooms, and timing
- Help attendees plan their day based on their interests
- Provide speaker bios and talk descriptions
- Give directions to the venue`,
});
```

### Try it

```bash
npm run dev:01
```

This launches the ADK DevTools web UI. Open your browser and try:

- _"What AI sessions are available?"_
- _"Tell me about Dr. Elena Rossi"_
- _"Plan my day — I love Cloud and DevOps, intermediate level"_

### Check the solution

Switch to the `final` branch and look at `src/01-intro/agent.ts`.

### Reflection

The agent works and the data stays in sync with the JSON source files automatically. However, all the data is still loaded into the prompt at once. What if you want the agent to look up data on demand? This motivates **Step 2**.

---

## Step 2: Adding Tools

**Concept:** `FunctionTool` — give your agent superpowers

**Folder:** `src/02-tools/`

### What you'll learn

Tools are functions that the LLM can call to retrieve data or perform actions. Instead of stuffing everything in the prompt, we define tools with typed parameters (using Zod schemas) and let the agent decide when to call them.

### Your task

You'll find three files to work on:

**1. `src/02-tools/data/conferenceData.ts`** — Already provided! Contains typed arrays of sessions and speakers.

**2. `src/02-tools/tools.ts`** — Create three FunctionTools:

```typescript
import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { schedule, speakers } from "./data/conferenceData.js";

export const getSessions = new FunctionTool({
  name: "get_sessions",
  description:
    "Get conference sessions, optionally filtered by speaker, room, or time slot.",
  parameters: z.object({
    speaker: z
      .string()
      .optional()
      .describe("Filter by speaker name (partial match)"),
    room: z.string().optional().describe("Filter by room name (partial match)"),
    timeSlot: z
      .string()
      .optional()
      .describe(
        "Filter by time slot, e.g. '10:00' or 'morning' or 'afternoon'",
      ),
  }),
  execute: async ({ speaker, room, timeSlot }) => {
    // Filter sessions based on parameters and return formatted results
  },
});
```

**3. `src/02-tools/agent.ts`** — Slim down the instruction and add tools:

```typescript
export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: getModel(),
  description: "A helpful assistant for DevFest Pisa 2026",
  instruction: `You are a friendly conference assistant...
    Use your tools to look up session and speaker information.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
});
```

### Try it

```bash
npm run dev:02
```

Ask the same questions as Step 1. Open the **trace view** in DevTools — you'll see the agent calling tools instead of relying on hardcoded data.

- _"What advanced sessions are there?"_
- _"Who works at Google?"_
- _"I'm interested in AI and Cloud, intermediate level"_

### Check the solution

Switch to the `final` branch and look at `src/02-tools/`.

### Reflection

Now data is separated from logic, but the agent does everything in one shot. For complex tasks like schedule building, it would be better to have **specialized agents** working together. That's **Step 3**.

---

## Step 3: Sequential Flow

**Concept:** `SequentialAgent` — a pipeline of agents

**Folder:** `src/03-sequential/`

### What you'll learn

A `SequentialAgent` executes sub-agents in a fixed order. Each agent focuses on one job and stores its output in shared state using `outputKey`. The next agent reads that state via `{{templateVariables}}` in its instruction.

### Your task

**1. `src/03-sequential/agents/scheduleBuilder.ts`** — Builds an initial schedule:

```typescript
import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: getModel(),
  description: "Builds a draft conference schedule based on user preferences",
  instruction: `You are a schedule builder for DevFest Pisa 2026...`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
```

**2. `src/03-sequential/agents/scheduleOptimizer.ts`** — Refines the schedule:

```typescript
export const scheduleOptimizer = new LlmAgent({
  name: "scheduleOptimizer",
  model: getModel(),
  description: "Optimizes a draft schedule for conflicts and logistics",
  instruction: `You are a schedule optimizer. Review this draft schedule:
{{draftSchedule}}

Check for: time conflicts, missing breaks, room-hopping, and suggest alternatives.`,
  outputKey: "optimizedSchedule",
});
```

**3. `src/03-sequential/agent.ts`** — Compose them:

```typescript
import { SequentialAgent } from "@google/adk";

export const rootAgent = new SequentialAgent({
  name: "schedulePipeline",
  subAgents: [scheduleBuilder, scheduleOptimizer],
});
```

### Try it

```bash
npm run dev:03
```

- _"Build me a schedule. I love AI and DevOps, intermediate level."_

Watch the trace: `scheduleBuilder` runs first, then `scheduleOptimizer` refines the result.

### Check the solution

Switch to the `final` branch and look at `src/03-sequential/`.

### Reflection

The pipeline works in one pass. But what if the optimizer finds issues the builder should fix? Currently there's no feedback loop. **Step 4** introduces iteration.

---

## Step 4: Loop Flow

**Concept:** `LoopAgent` — iterative refinement

**Folder:** `src/04-loop/`

### What you'll learn

A `LoopAgent` repeats its sub-agents until a condition is met (or max iterations is reached). This enables the **generator/critic pattern**: one agent builds, another reviews, and the loop continues until the critic is satisfied and calls `escalate` to exit.

### Your task

**1. `src/04-loop/agents/scheduleBuilder.ts`** — Update to be revision-aware:

```typescript
export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: getModel(),
  instruction: `You are a schedule builder for DevFest Pisa 2026.

If there is reviewer feedback, incorporate it:
{{reviewerFeedback:}}

Build or revise the schedule based on user preferences.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
```

**2. `src/04-loop/agents/scheduleReviewer.ts`** — The critic agent with an exit tool:

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
  model: getModel(),
  instruction: `Review this schedule: {{draftSchedule}}
Evaluate: time conflicts, preference match, topic balance, breaks, difficulty variety.
If ALL criteria pass, call exit_loop. Otherwise provide feedback.`,
  tools: [exitLoop],
  outputKey: "reviewerFeedback",
});
```

**3. `src/04-loop/agent.ts`** — Wire them into a loop:

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
npm run dev:04
```

- _"Build me a schedule. I'm interested in everything but especially AI."_

Watch the trace show multiple iterations — the schedule improves each round until the reviewer is satisfied.

### Check the solution

Switch to the `final` branch and look at `src/04-loop/`.

### Reflection

The loop produces a high-quality single schedule. But what if you want to explore **different strategies**? Running them one by one would be slow. **Step 5** runs them in parallel.

---

## Step 5: Parallel Flow

**Concept:** `ParallelAgent` — concurrent execution

**Folder:** `src/05-parallel/`

### What you'll learn

A `ParallelAgent` runs multiple sub-agents simultaneously. Think of it as asking three friends to each plan your day with different priorities, then picking the best plan.

### Your task

Create three strategy agents, a selector, and compose them:

**1. `src/05-parallel/agents/topicMatchStrategy.ts`** — Optimize for topic relevance:

```typescript
import { getModel } from "../common/models.js";

export const topicMatchStrategy = new LlmAgent({
  name: "topicMatchStrategy",
  model: getModel(),
  instruction: `Build a schedule that maximizes relevance to the user's stated interests.
Prioritize sessions from their preferred tracks.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "topicSchedule",
});
```

**2. `src/05-parallel/agents/speakerQualityStrategy.ts`** — Optimize for top speakers.

**3. `src/05-parallel/agents/diversityStrategy.ts`** — Optimize for breadth and variety.

**4. `src/05-parallel/agents/bestScheduleSelector.ts`** — Compare and pick the best:

```typescript
export const bestScheduleSelector = new LlmAgent({
  name: "bestScheduleSelector",
  model: getModel(),
  instruction: `Compare these three schedule proposals:

Topic-optimized: {{topicSchedule}}
Speaker-optimized: {{speakerSchedule}}
Diversity-optimized: {{diversitySchedule}}

Select the best one (or create a hybrid). Explain the trade-offs.`,
  outputKey: "finalSchedule",
});
```

**5. `src/05-parallel/agent.ts`** — Compose everything:

```typescript
import { SequentialAgent, ParallelAgent } from "@google/adk";
import { getModel } from "../common/models.js";

const strategyRunner = new ParallelAgent({
  name: "strategyRunner",
  model: getModel(),
  subAgents: [topicMatchStrategy, speakerQualityStrategy, diversityStrategy],
});

export const rootAgent = new SequentialAgent({
  name: "scheduleGenerator",
  model: getModel(),
  subAgents: [strategyRunner, bestScheduleSelector],
});
```

### Try it

```bash
npm run dev:05
```

- _"Build me a schedule. I'm a backend developer interested in Cloud and DevOps but also curious about AI."_

Watch the trace: three strategy agents light up simultaneously, then the selector picks the best.

### Check the solution

Switch to the `final` branch and look at `src/05-parallel/`.

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
