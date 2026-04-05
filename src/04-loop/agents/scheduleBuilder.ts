import { LlmAgent } from "@google/adk";
import { MODEL } from "../../common/models.js";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

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

export const scheduleBuilder = new LlmAgent({
  name: "scheduleBuilder",
  model: MODEL,
  description:
    "Builds or revises a personalized conference schedule based on user preferences and reviewer feedback.",
  instruction: `You are a schedule builder for DevFest Pisa 2026 (April 18, 2026).

Your job is to create or revise a personalized day schedule for the attendee.

TODO: Add a section to read and incorporate reviewer feedback using {{reviewerFeedback:}}

Steps:
1. Use get_user_preferences to capture what the user is interested in
2. Use get_sessions to find sessions matching their interests
3. Use get_speakers to provide context about the speakers
4. Build a complete day schedule from 10:00 to 18:40

Schedule format:
- Morning sessions (10:00-12:40): Pick one session per time slot
- Afternoon sessions (14:00-16:30): Pick one session per time slot
- Evening sessions (17:00-18:40): Pick one session per time slot

Rooms: Sala Fibonacci, Sala Ricci, Sala Pacinotti, Sala Gentili Build with AI

Rules:
- No time conflicts (only one session per time slot)
- Match the user's stated interests
- Include talk title, speaker, room, start and end time for each slot`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "draftSchedule",
});
