import { LlmAgent, FunctionTool } from "@google/adk";
import { z } from "zod";
import { MODEL } from "../../common/models.js";

// This tool allows the reviewer to signal that the schedule is good enough.
// When called, it sets escalate = true, which breaks the LoopAgent.
const exitLoop = new FunctionTool({
  name: "exit_loop",
  description:
    "Call this ONLY when the schedule meets ALL quality criteria. This will approve the schedule and end the review loop.",
  parameters: z.object({}),
  execute: async (_, context) => {
    context!.actions.escalate = true;
    return { status: "approved", message: "Schedule meets all quality criteria." };
  },
});

export const scheduleReviewer = new LlmAgent({
  name: "scheduleReviewer",
  model: MODEL,
  description:
    "Reviews a schedule against quality criteria and either approves it or provides improvement feedback.",
  instruction: `You are a schedule reviewer for DevFest Pisa 2026.

Review this schedule:
{{draftSchedule}}

Evaluate against these criteria:
1. **No time conflicts** — Only one session per time slot
2. **Preference match** — Sessions align with the user's stated interests
3. **Topic balance** — Not all sessions from a single topic area (aim for variety)
4. **Breaks included** — Lunch break is free
5. **Variety** — Mix of different topics and speakers

DECISION:
- If ALL criteria pass: Call the exit_loop tool to approve the schedule
- If ANY criteria fail: Provide specific, actionable feedback explaining what needs to change

When providing feedback, be specific. For example:
- "The morning slots are both in the same room — consider varying rooms"
- "All sessions are from the same speaker — add variety"`,
  tools: [exitLoop],
  outputKey: "reviewerFeedback",
});
