import "dotenv/config";
import { SequentialAgent } from "@google/adk";
import { scheduleBuilder } from "./agents/scheduleBuilder.js";
import { scheduleOptimizer } from "./agents/scheduleOptimizer.js";

// A SequentialAgent runs its sub-agents in order.
// First the scheduleBuilder creates a draft, then the scheduleOptimizer refines it.
// State is shared: the builder writes to "draftSchedule" via outputKey,
// and the optimizer reads it via {{draftSchedule}} in its instruction.

export const rootAgent = new SequentialAgent({
  name: "schedulePipeline",
  description:
    "Builds a personalized conference schedule, then optimizes it for quality and logistics.",
  subAgents: [scheduleBuilder, scheduleOptimizer],
});
