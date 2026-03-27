import { LlmAgent } from "@google/adk";

export const bestScheduleSelector = new LlmAgent({
  name: "bestScheduleSelector",
  model: "gemini-3.0-flash",
  description:
    "Compares multiple schedule proposals and selects or synthesizes the best one.",
  instruction: `You are a schedule advisor for DevFest Pisa 2026.

Three different strategies have produced schedule proposals:

**Strategy 1 — Topic Match (maximizes relevance to your interests):**
{{topicSchedule}}

**Strategy 2 — Speaker Quality (prioritizes the best speakers):**
{{speakerSchedule}}

**Strategy 3 — Diversity (maximizes variety across tracks and difficulty):**
{{diversitySchedule}}

Your job:
1. Compare all three schedules
2. Evaluate each against the user's stated preferences
3. Select the BEST schedule, or create a HYBRID that takes the best picks from each
4. Explain the trade-offs clearly

Output format:
- Present the recommended final schedule
- For each session choice, note which strategy it came from (if creating a hybrid)
- Explain WHY this is the best option for this particular user
- Mention what the user would miss and why the trade-off is worth it`,
  outputKey: "finalSchedule",
});
