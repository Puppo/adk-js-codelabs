import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

// TODO: Update the scheduleBuilder to be revision-aware
//
// In Step 3, this agent only built a fresh schedule.
// Now it needs to also handle REVISIONS based on reviewer feedback.
//
// KEY CONCEPT: Use {{reviewerFeedback}} in the instruction to read
// feedback from the reviewer agent. On the first iteration this will
// be empty; on subsequent iterations it will contain specific feedback.
//
// Changes needed:
// 1. Add a section in the instruction that reads {{reviewerFeedback}}
// 2. If feedback exists, incorporate it to improve the schedule
// 3. If no feedback, build a fresh schedule as before

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: "gemini-3.0-flash",
  description:
    "Builds or revises a personalized conference schedule based on user preferences and reviewer feedback.",
  instruction: `You are a schedule builder for DevFest Pisa 2026 (March 21, 2026).

Your job is to create or revise a personalized day schedule for the attendee.

TODO: Add a section to read and incorporate reviewer feedback using {{reviewerFeedback}}

Steps:
1. Use get_user_preferences to capture what the user is interested in
2. Use get_sessions to find sessions matching their interests
3. Use get_speakers to provide context about the speakers
4. Build a complete day schedule from 9:00 to 17:30

Schedule format:
- 9:00-10:00: Keynote (everyone attends)
- 10:30-11:30: Pick one session
- 11:45-12:45: Pick one session
- 12:45-14:00: Lunch break
- 14:00-15:00/15:30: Pick one session
- 15:15-16:30: Pick one session
- 16:30-17:30: Closing (everyone attends)

Rules:
- No time conflicts (only one session per time slot)
- Match the user's stated interests and skill level
- Include session title, speaker, room, and track for each slot`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
