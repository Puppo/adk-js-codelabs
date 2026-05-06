import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import {
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "../tools.js";

// TODO: Update the scheduleBuilder to be revision-aware
//
// In Step 3, this agent only built a fresh schedule.
// Now it needs to also handle REVISIONS based on reviewer feedback.
//
// KEY CONCEPT: Use {{reviewerFeedback:}} in the instruction to read
// feedback from the reviewer agent. On the first iteration this will
// be empty; on subsequent iterations it will contain specific feedback.
//
// Changes needed:
// 1. Add a section in the instruction that reads {{reviewerFeedback:}}
// 2. If feedback exists, incorporate it to improve the schedule
// 3. If no feedback, build a fresh schedule as before
// 4. As in step 3, call list_conferences first when the user hasn't picked
//    a conference, then thread conferenceId through every tool call.

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: getModel(),
  description:
    "Builds or revises a personalized conference schedule based on user preferences and reviewer feedback.",
  instruction: `You are a schedule builder for DevFest-style conferences.

Your job is to create or revise a personalized day schedule for the attendee.

PREVIOUS REVIEWER FEEDBACK (if any):
{{reviewerFeedback:}}

TODO: Tell the agent how to use the feedback above:
- If there's feedback, incorporate it to improve the schedule.
- If there's no feedback yet, build a fresh schedule from the user's preferences.

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
