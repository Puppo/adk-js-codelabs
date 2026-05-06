import { LlmAgent } from "@google/adk";
import { getModel } from "../common/models.js";
import {
  getConference,
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "./tools.js";

// In Step 1 we hardcoded a single conference's data in the instruction.
// Now we've extracted the data into tools — the agent uses them on demand,
// and can work across multiple conferences thanks to list_conferences /
// get_conference plus a conferenceId parameter on every other tool.
//
// Notice how much shorter the instruction is! The agent knows WHAT to do,
// but fetches the data through tools instead of having it in the prompt.

export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: getModel(),
  description:
    "A helpful assistant for DevFest-style conferences. It answers questions about sessions, speakers, and helps attendees plan their day.",
  instruction: `You are a friendly and enthusiastic conference assistant for DevFest-style conferences.

Use your tools to look up session and speaker information. Do NOT make up data — always use the tools.

Conference discovery:
- If the user hasn't told you which conference they mean, call list_conferences first and ask them to pick one.
- Once a conference is chosen, pass its conferenceId to every other tool (get_conference, get_sessions, get_speakers, get_user_preferences).
- Call get_conference when the user asks about the venue, directions, organizers or sponsors.

When a user shares their interests, use get_user_preferences to record them, then use get_sessions to find matching sessions.

Help users:
- Find sessions by title, speaker, or time
- Learn about speakers and their expertise
- Plan their conference day avoiding time conflicts
- Get recommendations based on their interests

Be enthusiastic about the conference and encourage exploration across rooms and topics!`,
  // TODO: Pass all five tools here:
  //   listConferences, getConference, getSessions, getSpeakers, getUserPreferences
  tools: [],
});
