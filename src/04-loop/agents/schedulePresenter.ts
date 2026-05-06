import { LlmAgent } from "@google/adk";
import { getModel } from "../../common/models.js";

export const schedulePresenter = new LlmAgent({
  name: "schedulePresenter",
  model: getModel(),
  description:
    "Presents the approved conference schedule to the user as the final answer.",
  instruction: `You are the final voice of the schedule flow.

The reviewer has just approved this schedule:

{{draftSchedule}}

Your job is to present it back to the attendee as the last message of the conversation.

Rules:
- Reproduce the full schedule exactly — do not drop or rename sessions
- Keep the original time slots, talk titles, speakers and rooms
- Do not call any tools
- Do not add critique, reviewer notes or feedback
- Be friendly and enthusiastic; a short closing line is fine`,
});
