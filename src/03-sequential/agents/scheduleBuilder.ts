import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import {
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "../tools.js";

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: getModel(),
  description:
    "Builds a personalized conference schedule based on user preferences.",
  instruction: `You are a schedule builder for DevFest-style conferences.

Your job is to create a personalized day schedule for the attendee.

Steps:
1. If the user hasn't chosen a conference, call list_conferences and ask them to pick one. Use the chosen conferenceId in every subsequent tool call.
2. Use get_user_preferences to capture what the user is interested in
3. Use get_sessions to find sessions matching their interests
4. Use get_speakers to provide context about the speakers
5. Build a complete day schedule

Schedule format:
- Pick one session per time slot across rooms
- Include morning and afternoon sessions
- Leave the lunch break free

Rules:
- No time conflicts (only one session per time slot)
- Match the user's stated interests
- Include talk title, speaker, room, start and end time for each slot`,
  tools: [listConferences, getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
