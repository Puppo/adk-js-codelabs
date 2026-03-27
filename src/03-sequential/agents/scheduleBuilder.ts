import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

// TODO: Create and export a scheduleBuilder agent
//
// This agent's job is to build a personalized day schedule.
//
// Configuration:
// - name: "scheduleBuilder"
// - model: "gemini-3.0-flash"
// - description: Builds a personalized conference schedule based on user preferences
// - tools: [getSessions, getSpeakers, getUserPreferences]
// - outputKey: "draftSchedule"  <-- This saves the agent's response to shared state
//
// The instruction should tell the agent to:
// 1. Use get_user_preferences to capture interests
// 2. Use get_sessions to find matching sessions
// 3. Build a complete day schedule (9:00-17:30)
// 4. Follow the time slot structure:
//    - 9:00-10:00: Keynote
//    - 10:30-11:30: Pick one session
//    - 11:45-12:45: Pick one session
//    - 12:45-14:00: Lunch
//    - 14:00-15:00/15:30: Pick one session
//    - 15:15-16:30: Pick one session
//    - 16:30-17:30: Closing
// 5. No time conflicts, match interests and skill level

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: "gemini-3.0-flash",
  description:
    "Builds a personalized conference schedule based on user preferences.",
  instruction: `TODO: Write the instruction for the schedule builder agent.
See the comments above for guidance.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey to save the result to shared state
});
