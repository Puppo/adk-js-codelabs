import { LlmAgent, FunctionTool } from "@google/adk";
import { z } from "zod";

// TODO 1: Create an exit_loop FunctionTool
//
// This tool lets the reviewer signal that the schedule is approved.
// When called, it sets context.actions.escalate = true, which breaks the LoopAgent.
//
// Configuration:
// - name: "exit_loop"
// - description: Call when the schedule meets ALL quality criteria
// - parameters: z.object({})  (no parameters needed)
// - execute: Set context.actions.escalate = true and return a status message
//
// The execute function receives two arguments:
//   (input, context) => { context.actions.escalate = true; return { status: "approved" }; }
const exitLoop = new FunctionTool({
  name: "exit_loop",
  description:
    "Call this ONLY when the schedule meets ALL quality criteria. This will approve the schedule and end the review loop.",
  parameters: z.object({}),
  execute: async () => {
    // TODO: Accept a second `context` parameter and set context.actions.escalate = true
    return { status: "approved" };
  },
});

// TODO 2: Create the scheduleReviewer agent
//
// This agent reads the draft schedule from state ({{draftSchedule}}) and evaluates it.
//
// Configuration:
// - name: "scheduleReviewer"
// - model: "gemini-3.0-flash"
// - tools: [exitLoop]
// - outputKey: "reviewerFeedback"
//
// The instruction should tell the agent to evaluate:
// 1. No time conflicts
// 2. Preference match
// 3. Topic balance (variety across tracks)
// 4. Breaks included
// 5. Difficulty variety
//
// If ALL pass → call exit_loop
// If ANY fail → provide specific feedback

export const scheduleReviewer = new LlmAgent({
  name: "scheduleReviewer",
  model: "gemini-3.0-flash",
  description:
    "Reviews a schedule against quality criteria and either approves it or provides improvement feedback.",
  instruction: `You are a schedule reviewer for DevFest Pisa 2026 (April 18, 2026).

Review this schedule:
{{draftSchedule}}

TODO: Add evaluation criteria and decision logic.
- If ALL criteria pass: Call the exit_loop tool
- If ANY criteria fail: Provide specific feedback`,
  tools: [exitLoop],
  // TODO: Add outputKey: "reviewerFeedback"
});
