import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

// TODO: Create and export a scheduleBuilder agent
//
// This agent's job is to build a personalized day schedule.
//
// Configuration:
// - name: "scheduleBuilder"
// - model: "gemini-2.5-flash"
// - description: Builds a personalized conference schedule based on user preferences
// - tools: [getSessions, getSpeakers, getUserPreferences]
// - outputKey: "draftSchedule"  <-- This saves the agent's response to shared state
//
// The instruction should tell the agent to:
// 1. Use get_user_preferences to capture interests
// 2. Use get_sessions to find matching sessions
// 3. Build a complete day schedule (10:00-18:40)
// 4. Follow the time slot structure:
//    - Morning sessions (10:00-12:40)
//    - Afternoon sessions (14:00-16:30)
//    - Evening sessions (17:00-18:40)
//    - Pick one session per time slot across rooms
// 5. No time conflicts, match interests

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: "gemini-2.5-flash",
  description:
    "Builds a personalized conference schedule based on user preferences.",
  instruction: `TODO: Write the instruction for the schedule builder agent.
See the comments above for guidance.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey to save the result to shared state
});
