import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

// TODO: Create and export a speakerQualityStrategy agent
//
// This agent builds a schedule that PRIORITIZES THE BEST SPEAKERS.
//
// Configuration:
// - name: "speakerQualityStrategy"
// - model: "gemini-3.0-flash"
// - tools: [getSessions, getSpeakers, getUserPreferences]
// - outputKey: "speakerSchedule"
//
// The instruction should tell the agent to:
// 1. Research all speakers to understand their expertise
// 2. Prioritize well-known speakers and GDEs based on their heading/bio
// 3. Favor sessions by speakers with the most relevant expertise
// 4. Use topic relevance only as a tiebreaker
// 5. Explain why this schedule maximizes speaker quality

export const speakerQualityStrategy = new LlmAgent({
  name: "speakerQualityStrategy",
  model: "gemini-3.0-flash",
  description:
    "Builds a schedule that prioritizes the most renowned speakers and expert-level content.",
  instruction: `TODO: Write the instruction for the speaker quality strategy.
See the comments above for guidance.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey: "speakerSchedule"
});
