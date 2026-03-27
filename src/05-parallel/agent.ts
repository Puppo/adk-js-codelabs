import "dotenv/config";
import { SequentialAgent, ParallelAgent } from "@google/adk";
import { topicMatchStrategy } from "./agents/topicMatchStrategy.js";
import { speakerQualityStrategy } from "./agents/speakerQualityStrategy.js";
import { diversityStrategy } from "./agents/diversityStrategy.js";
import { bestScheduleSelector } from "./agents/bestScheduleSelector.js";

// Three strategy agents run in parallel — each builds a complete schedule
// with a different optimization goal. Then a selector agent compares all
// three and picks the best (or creates a hybrid).
//
// Architecture:
//   rootAgent (SequentialAgent)
//     ├── strategyRunner (ParallelAgent)
//     │     ├── topicMatchStrategy    → writes to "topicSchedule"
//     │     ├── speakerQualityStrategy → writes to "speakerSchedule"
//     │     └── diversityStrategy      → writes to "diversitySchedule"
//     └── bestScheduleSelector        → reads all three, writes "finalSchedule"

const strategyRunner = new ParallelAgent({
  name: "strategyRunner",
  description:
    "Runs three schedule optimization strategies in parallel.",
  subAgents: [topicMatchStrategy, speakerQualityStrategy, diversityStrategy],
});

export const rootAgent = new SequentialAgent({
  name: "scheduleGenerator",
  description:
    "Generates three schedule strategies in parallel, then selects the best one.",
  subAgents: [strategyRunner, bestScheduleSelector],
});
