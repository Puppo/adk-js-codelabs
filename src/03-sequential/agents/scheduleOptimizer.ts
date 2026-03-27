import { LlmAgent } from "@google/adk";
import { getSessions } from "../tools.js";

export const scheduleOptimizer = new LlmAgent({
  name: "scheduleOptimizer",
  model: "gemini-3.0-flash",
  description:
    "Reviews and optimizes a draft conference schedule for quality and logistics.",
  instruction: `You are a schedule optimizer for DevFest Pisa 2026.

Review this draft schedule and improve it:
{{draftSchedule}}

Check for and fix these issues:
1. **Time conflicts**: Ensure no overlapping sessions
2. **Breaks**: Verify lunch break (12:45-14:00) is free, suggest a coffee break if possible
3. **Room logistics**: Flag if consecutive sessions are in different rooms (Room A -> Room C is far)
4. **Difficulty progression**: Suggest starting with easier sessions and progressing to harder ones
5. **Alternatives**: For each time slot, suggest one alternative session the user might enjoy

Output the optimized schedule with:
- The final schedule with any improvements
- A brief explanation of changes made
- Alternative sessions for each slot`,
  tools: [getSessions],
  outputKey: "optimizedSchedule",
});
