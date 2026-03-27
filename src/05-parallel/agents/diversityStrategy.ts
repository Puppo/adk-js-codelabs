import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

// TODO: Create and export a diversityStrategy agent
//
// This agent builds a schedule that MAXIMIZES VARIETY AND BREADTH.
//
// Configuration:
// - name: "diversityStrategy"
// - model: "gemini-3.0-flash"
// - tools: [getSessions, getSpeakers, getUserPreferences]
// - outputKey: "diversitySchedule"
//
// The instruction should tell the agent to:
// 1. Pick sessions from as many DIFFERENT tracks as possible
// 2. Mix difficulty levels (Beginner, Intermediate, Advanced)
// 3. Avoid scheduling the same speaker twice
// 4. Expose the user to topics outside their comfort zone
// 5. Explain why this schedule maximizes diversity

export const diversityStrategy = new LlmAgent({
  name: "diversityStrategy",
  model: "gemini-3.0-flash",
  description:
    "Builds a schedule that maximizes variety across tracks, difficulty levels, and speakers.",
  instruction: `TODO: Write the instruction for the diversity strategy.
See the comments above for guidance.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey: "diversitySchedule"
});
