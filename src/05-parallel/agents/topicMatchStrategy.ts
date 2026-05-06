import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import {
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "../tools.js";

export const topicMatchStrategy = new LlmAgent({
  name: "topicMatchStrategy",
  model: getModel(),
  description:
    "Builds a schedule that maximizes topic relevance to user interests.",
  instruction: `You are a schedule strategist for DevFest-style conferences.
Your optimization goal: MAXIMIZE TOPIC RELEVANCE.

1. If the user hasn't chosen a conference, call list_conferences and ask them to pick one. Use the chosen conferenceId in every subsequent tool call.
2. Use get_user_preferences to understand the user's interests
3. Use get_sessions to find ALL sessions matching the user's preferred topics
4. Build a full day schedule that prioritizes sessions matching their interests

Strategy:
- Fill every slot with the most relevant session based on talk title and speaker expertise
- If multiple sessions match in a time slot, pick the one closest to their interests
- Only use less relevant sessions if no matching session is available
- Match the user's skill level when possible

For each session include: title, speaker, room, start and end time.
End with a brief explanation of why this schedule maximizes topic relevance.`,
  tools: [listConferences, getSessions, getSpeakers, getUserPreferences],
  outputKey: "topicSchedule",
});
