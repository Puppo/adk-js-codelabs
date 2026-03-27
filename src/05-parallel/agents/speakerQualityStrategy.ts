import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const speakerQualityStrategy = new LlmAgent({
  name: "speakerQualityStrategy",
  model: "gemini-3.0-flash",
  description:
    "Builds a schedule that prioritizes the most renowned speakers and expert-level content.",
  instruction: `You are a schedule strategist for DevFest Pisa 2026 (March 21, 2026).
Your optimization goal: MAXIMIZE SPEAKER QUALITY.

1. Use get_user_preferences to understand the user's interests (as secondary criteria)
2. Use get_speakers to learn about ALL speakers
3. Use get_sessions to find sessions by the top speakers
4. Build a full day schedule (9:00-17:30) that prioritizes the best speakers

Strategy:
- Prioritize keynote speakers and Google Developer Experts (GDEs)
- Favor Advanced and Intermediate sessions over Beginner ones
- Prefer speakers who are recognized experts (leads, GDEs, specialists)
- Use topic relevance only as a tiebreaker between equally qualified speakers

Schedule format:
- 9:00-10:00: Keynote
- 10:30-11:30: [session]
- 11:45-12:45: [session]
- 12:45-14:00: Lunch
- 14:00-15:00/15:30: [session]
- 15:15-16:30: [session]
- 16:30-17:30: Closing

For each session include: title, speaker, room, track, difficulty.
End with a brief explanation of why this schedule maximizes speaker quality.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "speakerSchedule",
});
