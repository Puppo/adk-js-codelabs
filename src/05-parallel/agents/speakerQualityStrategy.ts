import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";
import {
  getSessions,
  getSpeakers,
  getUserPreferences,
  listConferences,
} from "../tools.js";

// TODO: Create and export a speakerQualityStrategy agent
//
// This agent builds a schedule that PRIORITIZES THE BEST SPEAKERS.
//
// Configuration:
// - name: "speakerQualityStrategy"
// - model: getModel() (imported from "../../common/models.js")
// - tools: [listConferences, getSessions, getSpeakers, getUserPreferences]
// - outputKey: "speakerSchedule"
//
// The instruction should tell the agent to:
// 1. If the user hasn't chosen a conference, call list_conferences first and
//    thread the chosen conferenceId through every other tool call.
// 2. Research all speakers to understand their expertise
// 3. Prioritize well-known speakers and GDEs based on their heading/bio
// 4. Favor sessions by speakers with the most relevant expertise
// 5. Use topic relevance only as a tiebreaker
// 6. End with a brief explanation of why this schedule maximizes speaker quality

export const speakerQualityStrategy = new LlmAgent({
  name: "speakerQualityStrategy",
  model: getModel(),
  description:
    "Builds a schedule that prioritizes the most renowned speakers and expert-level content.",
  instruction: `TODO: Write the instruction for the speaker quality strategy.
See the comments above for guidance.`,
  tools: [listConferences, getSessions, getSpeakers, getUserPreferences],
  // TODO: Add outputKey: "speakerSchedule"
});
