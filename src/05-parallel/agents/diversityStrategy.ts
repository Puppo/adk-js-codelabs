import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import {
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "../tools.js";

// TODO: Create and export a diversityStrategy agent
//
// This agent builds a schedule that MAXIMIZES VARIETY AND BREADTH.
//
// Configuration:
// - name: "diversityStrategy"
// - model: getModel() (imported from "../../common/models.js")
// - tools: [listConferences, getSessions, getSpeakers, getUserPreferences]
// - outputKey: "diversitySchedule"
//
// The instruction should tell the agent to:
// 1. If the user hasn't chosen a conference, call list_conferences first and
//    thread the chosen conferenceId through every other tool call.
// 2. Pick sessions from as many DIFFERENT rooms and topics as possible
// 3. Mix session types and topics for variety
// 4. Avoid scheduling the same speaker twice
// 5. Expose the user to topics outside their comfort zone
// 6. End with a brief explanation of why this schedule maximizes diversity

export const diversityStrategy = new LlmAgent({
  name: "diversityStrategy",
  model: getModel(),
  description:
    "Builds a schedule that maximizes variety across rooms, topics, and speakers.",
  instruction: `TODO: Write the instruction for the diversity strategy.
See the comments above for guidance.`,
  tools: [listConferences, getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey: "diversitySchedule"
});
