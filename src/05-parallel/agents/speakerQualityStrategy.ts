import { LlmAgent } from "@google/adk";
import { MODEL } from "../../common/models.js";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const speakerQualityStrategy = new LlmAgent({
  name: "speakerQualityStrategy",
  model: MODEL,
  description:
    "Builds a schedule that prioritizes the most renowned speakers and expert-level content.",
  instruction: `You are a schedule strategist for DevFest Pisa 2026.
Your optimization goal: MAXIMIZE SPEAKER QUALITY.

1. Use get_user_preferences to understand the user's interests (as secondary criteria)
2. Use get_speakers to learn about ALL speakers
3. Use get_sessions to find sessions by the top speakers
4. Build a full day schedule that prioritizes the best speakers

Strategy:
- Prioritize keynote speakers and recognized experts based on their heading/bio
- Favor sessions by speakers with the most relevant expertise
- Use topic relevance only as a tiebreaker between equally qualified speakers

For each session include: title, speaker, room, start and end time.
End with a brief explanation of why this schedule maximizes speaker quality.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "speakerSchedule",
});
