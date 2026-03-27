import "dotenv/config";
// TODO: Import SequentialAgent from "@google/adk"
import { SequentialAgent } from "@google/adk";
import { scheduleBuilder } from "./agents/scheduleBuilder.js";
import { scheduleOptimizer } from "./agents/scheduleOptimizer.js";

// TODO: Create a SequentialAgent named "schedulePipeline" and export it as rootAgent
//
// A SequentialAgent runs its sub-agents in order:
//   1. scheduleBuilder runs first — creates a draft and saves it to state
//   2. scheduleOptimizer runs second — reads the draft from state and improves it
//
// Configuration:
// - name: "schedulePipeline"
// - description: Builds a personalized schedule, then optimizes it
// - subAgents: [scheduleBuilder, scheduleOptimizer]

export const rootAgent = new SequentialAgent({
  name: "schedulePipeline",
  description:
    "Builds a personalized conference schedule, then optimizes it for quality and logistics.",
  // TODO: Add subAgents array with the two agents in the correct order
  subAgents: [],
});
