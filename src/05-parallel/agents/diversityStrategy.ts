import { LlmAgent } from "@google/adk";
import { MODEL } from "../../common/models.js";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const diversityStrategy = new LlmAgent({
  name: "diversityStrategy",
  model: MODEL,
  description:
    "Builds a schedule that maximizes variety across rooms, topics, and speakers.",
  instruction: `You are a schedule strategist for DevFest Pisa 2026.
Your optimization goal: MAXIMIZE DIVERSITY AND BREADTH.

1. Use get_user_preferences to understand the user's interests (as light guidance)
2. Use get_sessions to explore ALL available sessions
3. Build a full day schedule that maximizes variety

Strategy:
- Pick sessions from as many DIFFERENT rooms and topics as possible
- Mix session types and topics for variety
- Avoid scheduling the same speaker twice
- Expose the user to topics outside their comfort zone
- Balance between the user's interests and new discoveries

For each session include: title, speaker, room, start and end time.
End with a brief explanation of why this schedule maximizes diversity.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "diversitySchedule",
});
