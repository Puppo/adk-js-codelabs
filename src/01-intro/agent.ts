import { LlmAgent } from "@google/adk";
import { getModel } from "../common/models.js";

// TODO: Import the conference data loader and the markdown utilities
//
// 1. import { getConferenceData } from "../common/conferenceData.js"
// 2. import { conferenceToMarkdown, speakersToMarkdown, scheduleToMarkdown } from "../common/toMarkdown.js"
//
// TODO: Pick a default conference id and load its bundle
//
//   const DEFAULT_CONFERENCE_ID = "pisa-2026";
//   const { conference, speakers, schedule } = getConferenceData(DEFAULT_CONFERENCE_ID);
//
// The codebase keeps each conference's data under data/<id>/. The shared loader
// reads every conference at startup and returns a typed bundle on demand. In
// step 1 we have no tools, so we just pick one default id and inject its data
// into the agent's prompt.
//
// TODO: Build a rootAgent using LlmAgent and export it
//
// Your agent should have:
// - name: "conferenceAgent"
// - model: getModel() (imported from "../common/models.js")
// - description: derived from the loaded conference name (use a template literal)
// - instruction: a system prompt that includes:
//   1. The agent's personality (friendly, enthusiastic conference assistant)
//   2. Conference info via conferenceToMarkdown(conference)
//   3. The full schedule via scheduleToMarkdown(schedule)
//   4. Speaker bios via speakersToMarkdown(speakers)
//   5. A short section describing how the agent should help attendees
//
// Hint: Use template literals to compose the instruction:
//   instruction: `You are a friendly assistant for ${conference.conference_name}...
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
  model: getModel(),
  description:
    "A helpful assistant for a DevFest-style conference. It answers questions about sessions, speakers, and helps attendees plan their day.",
  instruction: `You are a friendly and enthusiastic conference assistant.

TODO: Load a conference via getConferenceData(DEFAULT_CONFERENCE_ID) and use the
markdown utility functions to inject its data here.
1. conferenceToMarkdown(conference) — for venue, dates, organizers, sponsors
2. scheduleToMarkdown(schedule) — for the full session timetable
3. speakersToMarkdown(speakers) — for speaker bios
4. Add a section describing how the agent should help attendees`,
});
