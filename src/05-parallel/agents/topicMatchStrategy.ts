import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import {
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "../tools.js";

// TODO: Create and export a topicMatchStrategy agent
//
// This agent builds a schedule that MAXIMIZES TOPIC RELEVANCE.
//
// Configuration:
// - name: "topicMatchStrategy"
// - model: getModel() (imported from "../../common/models.js")
// - tools: [listConferences, getSessions, getSpeakers, getUserPreferences]
// - outputKey: "topicSchedule"  <-- The selector reads this from state
//
// The instruction should tell the agent to:
// 1. If the user hasn't chosen a conference, call list_conferences first and
//    thread the chosen conferenceId through every other tool call.
// 2. Capture user preferences
// 3. Fill every slot with the most relevant session based on talk title and speaker expertise
// 4. Only use less relevant sessions if no matching session exists
// 5. End with a brief explanation of why this schedule maximizes topic relevance

export const topicMatchStrategy = new LlmAgent({
  name: "topicMatchStrategy",
  model: getModel(),
  description:
    "Builds a schedule that maximizes topic relevance to user interests.",
  instruction: `TODO: Write the instruction for the topic match strategy.
See the comments above for guidance.`,
  tools: [listConferences, getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey: "topicSchedule"
});
