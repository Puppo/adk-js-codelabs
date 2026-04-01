import { LlmAgent } from "@google/adk";
import { getSessions } from "../tools.js";

// TODO: Create and export a scheduleOptimizer agent
//
// This agent reads the draft schedule from shared state and improves it.
//
// Configuration:
// - name: "scheduleOptimizer"
// - model: "gemini-2.5-flash"
// - description: Reviews and optimizes a draft schedule
// - tools: [getSessions]  (to look up alternative sessions)
// - outputKey: "optimizedSchedule"
//
// KEY CONCEPT: Use {{draftSchedule}} in the instruction to read from shared state.
// The scheduleBuilder saved its output there via outputKey: "draftSchedule".
//
// The instruction should tell the agent to:
// 1. Review the draft schedule for issues
// 2. Check for time conflicts
// 3. Verify lunch break is free
// 4. Flag room logistics issues (consecutive sessions in distant rooms)
// 5. Suggest difficulty progression (easier -> harder)
// 6. Provide alternative sessions for each slot

export const scheduleOptimizer = new LlmAgent({
  name: "scheduleOptimizer",
  model: "gemini-2.5-flash",
  description:
    "Reviews and optimizes a draft conference schedule for quality and logistics.",
  instruction: `You are a schedule optimizer for DevFest Pisa 2026.

Review this draft schedule and improve it:
{{draftSchedule}}

TODO: Add the rest of the optimization instructions.`,
  tools: [getSessions],
  // TODO: Add outputKey to save the optimized result
});
