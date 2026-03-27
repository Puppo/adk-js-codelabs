import "dotenv/config";
import { LoopAgent, SequentialAgent } from "@google/adk";
import { scheduleBuilder } from "./agents/scheduleBuilder.js";
import { scheduleReviewer } from "./agents/scheduleReviewer.js";

// A LoopAgent repeats its sub-agents until either:
// 1. maxIterations is reached, OR
// 2. A sub-agent calls escalate (via the exit_loop tool)
//
// Each iteration: scheduleBuilder creates/revises -> scheduleReviewer evaluates
// The reviewer reads {{draftSchedule}} and either approves (escalate) or
// writes feedback to {{reviewerFeedback}} for the builder to read next iteration.

export const rootAgent = new LoopAgent({
  name: "scheduleLoop",
  description:
    "Iteratively builds and reviews a conference schedule until quality criteria are met.",
  subAgents: [
    new SequentialAgent({
      name: "buildAndReview",
      subAgents: [scheduleBuilder, scheduleReviewer],
    }),
  ],
  maxIterations: 3,
});
