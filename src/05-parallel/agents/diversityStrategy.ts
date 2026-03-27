import { LlmAgent } from "@google/adk";
import { getSessions, getSpeakers, getUserPreferences } from "../tools.js";

export const diversityStrategy = new LlmAgent({
  name: "diversityStrategy",
  model: "gemini-3.0-flash",
  description:
    "Builds a schedule that maximizes variety across tracks, difficulty levels, and speakers.",
  instruction: `You are a schedule strategist for DevFest Pisa 2026 (March 21, 2026).
Your optimization goal: MAXIMIZE DIVERSITY AND BREADTH.

1. Use get_user_preferences to understand the user's interests (as light guidance)
2. Use get_sessions to explore ALL tracks
3. Build a full day schedule (9:00-17:30) that maximizes variety

Strategy:
- Pick sessions from as many DIFFERENT tracks as possible (ideally one per track)
- Mix difficulty levels (at least one Beginner, one Intermediate, one Advanced)
- Avoid scheduling the same speaker twice
- Expose the user to topics outside their comfort zone
- Balance between the user's interests and new discoveries

Schedule format:
- 9:00-10:00: Keynote
- 10:30-11:30: [session]
- 11:45-12:45: [session]
- 12:45-14:00: Lunch
- 14:00-15:00/15:30: [session]
- 15:15-16:30: [session]
- 16:30-17:30: Closing

For each session include: title, speaker, room, track, difficulty.
End with a brief explanation of why this schedule maximizes diversity.`,
  tools: [getSessions, getSpeakers, getUserPreferences],
  outputKey: "diversitySchedule",
});
