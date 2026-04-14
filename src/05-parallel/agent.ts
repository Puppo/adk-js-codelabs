// TODO: Import SequentialAgent and ParallelAgent from "@google/adk"
import { SequentialAgent, ParallelAgent } from "@google/adk";
import { topicMatchStrategy } from "./agents/topicMatchStrategy.js";
import { speakerQualityStrategy } from "./agents/speakerQualityStrategy.js";
import { diversityStrategy } from "./agents/diversityStrategy.js";
import { bestScheduleSelector } from "./agents/bestScheduleSelector.js";

// TODO: Compose the final multi-agent system
//
// Architecture:
//   rootAgent (SequentialAgent)
//     ├── strategyRunner (ParallelAgent)
//     │     ├── topicMatchStrategy    → writes to "topicSchedule"
//     │     ├── speakerQualityStrategy → writes to "speakerSchedule"
//     │     └── diversityStrategy      → writes to "diversitySchedule"
//     └── bestScheduleSelector        → reads all three, writes "finalSchedule"
//
// Step 1: Create a ParallelAgent named "strategyRunner" with the 3 strategy agents
// Step 2: Create a SequentialAgent named "scheduleGenerator" that runs
//         strategyRunner first, then bestScheduleSelector
// Step 3: Export it as rootAgent

export const rootAgent = new SequentialAgent({
  name: "scheduleGenerator",
  description:
    "Generates three schedule strategies in parallel, then selects the best one.",
  // TODO: Create a ParallelAgent and wire it with the selector
  subAgents: [],
});
