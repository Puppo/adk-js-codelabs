import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

// TODO: Create and export a topicMatchStrategy agent
//
// This agent builds a schedule that MAXIMIZES TOPIC RELEVANCE.
//
// Configuration:
// - name: "topicMatchStrategy"
// - model: "gemini-2.5-flash"
// - tools: [getSessions, getSpeakers, getUserPreferences]
// - outputKey: "topicSchedule"  <-- The selector reads this from state
//
// The instruction should tell the agent to:
// 1. Capture user preferences
// 2. Fill every slot with the most relevant session based on talk title and speaker expertise
// 3. Only use less relevant sessions if no matching session exists
// 4. Explain why this schedule maximizes topic relevance

export const topicMatchStrategy = new LlmAgent({
  name: "topicMatchStrategy",
  model: "gemini-2.5-flash",
  description:
    "Builds a schedule that maximizes topic relevance to user interests.",
  instruction: `TODO: Write the instruction for the topic match strategy.
See the comments above for guidance.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey: "topicSchedule"
});
