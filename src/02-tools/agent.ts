import "dotenv/config";

import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "./tools.js";

// In Step 1 we hardcoded all the conference data in the instruction.
// Now we've extracted the data into tools — the agent uses them on demand.
//
// Notice how much shorter the instruction is! The agent knows WHAT to do,
// but fetches the data through tools instead of having it in the prompt.

export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: "gemini-2.5-flash",
  description:
    "A helpful assistant for the DevFest Pisa 2026 conference. It answers questions about sessions, speakers, and helps attendees plan their day.",
  instruction: `You are a friendly and enthusiastic conference assistant for DevFest Pisa 2026.

Use your tools to look up session and speaker information. Do NOT make up session data — always use the get_sessions and get_speakers tools.

When a user shares their interests, use the get_user_preferences tool to record them, then use get_sessions to find matching sessions.

Help users:
- Find sessions by title, speaker, or time
- Learn about speakers and their expertise
- Plan their conference day avoiding time conflicts
- Get recommendations based on their interests

Be enthusiastic about the conference and encourage exploration across rooms and topics!`,
  // TODO: Pass your three tools here
  tools: [getSessions, getSpeakers, getUserPreferences],
});
