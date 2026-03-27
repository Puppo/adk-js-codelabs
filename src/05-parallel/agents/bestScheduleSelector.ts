import { LlmAgent } from "@google/adk";

// TODO: Create and export a bestScheduleSelector agent
//
// This agent reads ALL THREE strategy schedules from state and picks the best.
//
// Configuration:
// - name: "bestScheduleSelector"
// - model: "gemini-3.0-flash"
// - outputKey: "finalSchedule"
//
// KEY CONCEPT: Use {{topicSchedule}}, {{speakerSchedule}}, {{diversitySchedule}}
// in the instruction to read each strategy's output from shared state.
//
// The instruction should tell the agent to:
// 1. Compare all three schedules
// 2. Evaluate each against the user's preferences
// 3. Select the best one OR create a hybrid
// 4. Explain the trade-offs

export const bestScheduleSelector = new LlmAgent({
  name: "bestScheduleSelector",
  model: "gemini-3.0-flash",
  description:
    "Compares multiple schedule proposals and selects or synthesizes the best one.",
  instruction: `You are a schedule advisor for DevFest Pisa 2026.

Three different strategies have produced schedule proposals:

**Strategy 1 — Topic Match:**
{{topicSchedule}}

**Strategy 2 — Speaker Quality:**
{{speakerSchedule}}

**Strategy 3 — Diversity:**
{{diversitySchedule}}

TODO: Add instructions for comparing, selecting, and explaining the best schedule.`,
  // TODO: Add outputKey: "finalSchedule"
});
