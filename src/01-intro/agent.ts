import { LlmAgent } from "@google/adk";
import "dotenv/config";
import { MODEL } from "../common/models.js";

// TODO: Import conference data and markdown utilities
//
// 1. import { conference, speakers, schedule } from "../common/conferenceData.js"
// 2. import { conferenceToMarkdown, speakersToMarkdown, scheduleToMarkdown } from "../common/toMarkdown.js"
//
// TODO: Create a rootAgent using LlmAgent and export it
//
// Your agent should have:
// - name: "conferenceAgent"
// - model: MODEL (imported from "../common/models.js")
// - description: A helpful assistant for the DevFest Pisa 2026 conference
// - instruction: A system prompt that includes:
//   1. The agent's personality (friendly, enthusiastic conference assistant)
//   2. Conference info using conferenceToMarkdown(conference)
//   3. The full schedule using scheduleToMarkdown(schedule)
//   4. Speaker bios using speakersToMarkdown(speakers)
//   5. What the agent should help users with
//
// Hint: Use template literals to compose the instruction:
//   instruction: `Your personality prompt...
//
//   ${conferenceToMarkdown(conference)}
//
//   ${scheduleToMarkdown(schedule)}
//
//   ${speakersToMarkdown(speakers)}
//
//   ## How you help attendees
//   - ...`

export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: MODEL,
  description:
    "A helpful assistant for the DevFest Pisa 2026 conference. It answers questions about sessions, speakers, and helps attendees plan their day.",
  instruction: `You are a friendly and enthusiastic conference assistant for DevFest Pisa 2026.

TODO: Use the markdown utility functions to inject conference data here.
1. conferenceToMarkdown(conference) — for venue, dates, organizers, sponsors
2. scheduleToMarkdown(schedule) — for the full session timetable
3. speakersToMarkdown(speakers) — for speaker bios
4. Add a section describing how the agent should help attendees`,
});
