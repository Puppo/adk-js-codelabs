import { LoopAgent, SequentialAgent } from "@google/adk";
import { scheduleBuilder } from "./agents/scheduleBuilder.js";
import { schedulePresenter } from "./agents/schedulePresenter.js";
import { scheduleReviewer } from "./agents/scheduleReviewer.js";

// In step 4 we wrap a build/review cycle in a LoopAgent, then hand the
// approved schedule off to a presenter that renders it as the final
// user-facing message.
//
// Architecture you'll build below:
//
//   rootAgent (SequentialAgent "scheduleFlow")
//     ├── scheduleLoop (LoopAgent, maxIterations: 3)
//     │     └── SequentialAgent "buildAndReview"
//     │           ├── scheduleBuilder   (writes draftSchedule to state)
//     │           └── scheduleReviewer  (calls exit_loop OR writes feedback)
//     └── schedulePresenter             (renders the approved {{draftSchedule}})
//
// Why a presenter? Without it, the last message the user sees is the
// reviewer's "approved" note rather than the schedule itself.

// TODO: Build the inner LoopAgent
//
// const scheduleLoop = new LoopAgent({
//   name: "scheduleLoop",
//   description: "...",
//   subAgents: [new SequentialAgent({ name: "buildAndReview", subAgents: [scheduleBuilder, scheduleReviewer] })],
//   maxIterations: 3,
// });
const scheduleLoop = new LoopAgent({
  name: "scheduleLoop",
  description:
    "Iteratively builds and reviews a conference schedule until quality criteria are met.",
  // TODO: Add subAgents — one SequentialAgent named "buildAndReview"
  // wrapping [scheduleBuilder, scheduleReviewer].
  subAgents: [],
  // TODO: Add maxIterations: 3
});

// TODO: Wrap the loop and presenter in a SequentialAgent named "scheduleFlow".
// subAgents should be [scheduleLoop, schedulePresenter].
export const rootAgent = new SequentialAgent({
  name: "scheduleFlow",
  description:
    "Iteratively builds and reviews a conference schedule, then presents the approved version to the user.",
  // TODO: subAgents: [scheduleLoop, schedulePresenter]
  subAgents: [],
});
