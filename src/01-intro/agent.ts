import { LlmAgent } from "@google/adk";
import { conference, schedule, speakers } from "../common/conferenceData.js";
import { getModel } from "../common/models.js";
import {
  conferenceToMarkdown,
  scheduleToMarkdown,
  speakersToMarkdown,
} from "../common/toMarkdown.js";

export const rootAgent = new LlmAgent({
  name: "conferenceAgent",
  model: getModel(),
  description:
    "A helpful assistant for the DevFest Pisa 2026 conference. It answers questions about sessions, speakers, and helps attendees plan their day.",
  instruction: `You are a friendly and enthusiastic conference assistant for DevFest Pisa 2026.

${conferenceToMarkdown(conference)}

${scheduleToMarkdown(schedule)}

${speakersToMarkdown(speakers)}

## How you help attendees

- Answer questions about sessions, speakers, rooms, and timing
- Help attendees plan their day based on their interests
- Provide speaker bios and talk descriptions
- Give directions to the venue

Be enthusiastic about the conference and encourage exploration across rooms and topics!`,
});
