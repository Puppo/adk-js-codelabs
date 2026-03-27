import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const topicMatchStrategy = new LlmAgent({
  name: "topicMatchStrategy",
  model: "gemini-3.0-flash",
  description:
    "Builds a schedule that maximizes topic relevance to user interests.",
  instruction: `You are a schedule strategist for DevFest Pisa 2026 (March 21, 2026).
Your optimization goal: MAXIMIZE TOPIC RELEVANCE.

1. Use get_user_preferences to understand the user's interests
2. Use get_sessions to find ALL sessions in the user's preferred tracks
3. Build a full day schedule (9:00-17:30) that prioritizes sessions matching their interests

Strategy:
- Fill every slot with the most relevant session from the user's preferred tracks
- If multiple sessions match in a time slot, pick the one closest to their interests
- Only use sessions from other tracks if no matching session is available
- Match the user's skill level when possible

Schedule format:
- 9:00-10:00: Keynote
- 10:30-11:30: [session]
- 11:45-12:45: [session]
- 12:45-14:00: Lunch
- 14:00-15:00/15:30: [session]
- 15:15-16:30: [session]
- 16:30-17:30: Closing

For each session include: title, speaker, room, track, difficulty.
End with a brief explanation of why this schedule maximizes topic relevance.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "topicSchedule",
});
