import { LlmAgent } from "@google/adk";
import { MODEL } from "../../common/models.js";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const topicMatchStrategy = new LlmAgent({
  name: "topicMatchStrategy",
  model: MODEL,
  description:
    "Builds a schedule that maximizes topic relevance to user interests.",
  instruction: `You are a schedule strategist for DevFest Pisa 2026.
Your optimization goal: MAXIMIZE TOPIC RELEVANCE.

1. Use get_user_preferences to understand the user's interests
2. Use get_sessions to find ALL sessions matching the user's preferred topics
3. Build a full day schedule that prioritizes sessions matching their interests

Strategy:
- Fill every slot with the most relevant session based on talk title and speaker expertise
- If multiple sessions match in a time slot, pick the one closest to their interests
- Only use less relevant sessions if no matching session is available
- Match the user's skill level when possible

For each session include: title, speaker, room, start and end time.
End with a brief explanation of why this schedule maximizes topic relevance.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "topicSchedule",
});
