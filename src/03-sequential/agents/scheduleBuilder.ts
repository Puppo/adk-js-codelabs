import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import {
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "../tools.js";

// TODO: Create and export a scheduleBuilder agent
//
// This agent's job is to build a personalized day schedule.
//
// Configuration:
// - name: "scheduleBuilder"
// - model: getModel() (imported from "../../common/models.js")
// - description: Builds a personalized conference schedule based on user preferences
// - tools: [listConferences, getSessions, getSpeakers, getUserPreferences]
// - outputKey: "draftSchedule"  <-- This saves the agent's response to shared state
//
// The instruction should tell the agent to:
// 1. If the user hasn't chosen a conference, call list_conferences and ask
//    them to pick one. Pass the chosen conferenceId to every other tool call.
// 2. Use get_user_preferences to capture interests (with conferenceId).
// 3. Use get_sessions / get_speakers to find matching sessions and context.
// 4. Build a complete day schedule:
//    - Morning, afternoon, evening time slots
//    - Pick one session per time slot across rooms
//    - Leave the lunch break free
// 5. No time conflicts; match the user's stated interests.
// 6. For each slot, include talk title, speaker, room, and start/end time.

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: getModel(),
  description:
    "Builds a personalized conference schedule based on user preferences.",
  instruction: `TODO: Write the instruction for the schedule builder agent.
See the comments above for guidance.`,
  tools: [listConferences, getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey: "draftSchedule" to save the result to shared state
});
