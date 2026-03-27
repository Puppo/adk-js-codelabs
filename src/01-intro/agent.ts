import "dotenv/config";
import { LlmAgent } from "@google/adk";

// TODO: Create a rootAgent using LlmAgent and export it
//
// Your agent should have:
// - name: "conferenceAgent"
// - model: "gemini-3.0-flash"
// - description: A helpful assistant for the DevFest Pisa 2026 conference
// - instruction: A system prompt that includes:
//   1. The agent's personality (friendly, enthusiastic conference assistant)
//   2. Conference info: March 21, 2026, University of Pisa
//   3. The full conference schedule with:
//      - Tracks: AI/ML, Web, Cloud, Mobile, DevOps
//      - Keynote (9:00-10:00, Main Hall)
//      - Morning sessions (10:30-12:45, Rooms A/B/C)
//      - Lunch break (12:45-14:00)
//      - Afternoon sessions (14:00-16:30, Rooms A/B/C)
//      - Closing (16:30-17:30, Main Hall)
//      - For each session: title, speaker, time, room, track, difficulty
//   4. Speaker bios (name, company, role, expertise)
//   5. What the agent should help users with

export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: "gemini-3.0-flash",
  description:
    "A helpful assistant for the DevFest Pisa 2026 conference. It answers questions about sessions, speakers, and helps attendees plan their day.",
  instruction: `You are a friendly and enthusiastic conference assistant for DevFest Pisa 2026.
The conference takes place on March 21, 2026 at the University of Pisa, Department of Computer Science.

Here is the full conference schedule:

TODO: Add the conference schedule here.
Include all tracks, sessions (with title, speaker, time, room, track, difficulty),
speaker bios, and guidance on how to help users.

Hint: Check the WORKSHOP.md guide for the full schedule data,
or look at the 01-intro-final branch for the complete solution.`,
});
