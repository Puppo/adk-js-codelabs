import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: getModel(),
  description:
    "Builds a personalized conference schedule based on user preferences.",
  instruction: `You are a schedule builder for DevFest Pisa 2026.

Your job is to create a personalized day schedule for the attendee.

Steps:
1. Use get_user_preferences to capture what the user is interested in
2. Use get_sessions to find sessions matching their interests
3. Use get_speakers to provide context about the speakers
4. Build a complete day schedule

Schedule format:
- Pick one session per time slot across rooms
- Include morning and afternoon sessions
- Leave the lunch break free

Rules:
- No time conflicts (only one session per time slot)
- Match the user's stated interests
- Include talk title, speaker, room, start and end time for each slot`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
