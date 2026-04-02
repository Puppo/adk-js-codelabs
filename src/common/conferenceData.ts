import { conferenceSchema } from "./conferenceSchema.js";
import { scheduleSchema } from "./scheduleSchema.js";
import { speakersSchema } from "./speakersSchema.js";

import conferenceJSON from "../../data/conference.json" with { type: "json" };
import scheduleJSON from "../../data/schedule.json" with { type: "json" };
import speakersJSON from "../../data/speakers.json" with { type: "json" };

export const conference = conferenceSchema.parse(conferenceJSON);

export const speakers = speakersSchema.parse(speakersJSON);

export const schedule = scheduleSchema.parse(scheduleJSON);
