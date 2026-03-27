import "dotenv/config";
// TODO: Import LoopAgent and SequentialAgent from "@google/adk"
import { LoopAgent, SequentialAgent } from "@google/adk";
import { scheduleBuilder } from "./agents/scheduleBuilder.js";
import { scheduleReviewer } from "./agents/scheduleReviewer.js";

// TODO: Create a LoopAgent named "scheduleLoop" and export it as rootAgent
//
// The LoopAgent wraps a SequentialAgent that runs:
//   1. scheduleBuilder — creates/revises the schedule
//   2. scheduleReviewer — evaluates and either approves (escalate) or gives feedback
//
// The loop repeats until either:
//   - The reviewer calls exit_loop (which sets escalate = true)
//   - maxIterations is reached (set to 3 as a safety limit)
//
// Configuration:
// - name: "scheduleLoop"
// - subAgents: [SequentialAgent with builder + reviewer]
// - maxIterations: 3

export const rootAgent = new LoopAgent({
  name: "scheduleLoop",
  description:
    "Iteratively builds and reviews a conference schedule until quality criteria are met.",
  // TODO: Add subAgents with a SequentialAgent wrapping builder + reviewer
  subAgents: [],
  // TODO: Add maxIterations: 3
});
