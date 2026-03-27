import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { conferenceSchema } from "./conferenceSchema.js";
import { scheduleSchema } from "./scheduleSchema.js";
import { speakersSchema } from "./speakersSchema.js";

const dataDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../data");

export const conference = conferenceSchema.parse(
  JSON.parse(readFileSync(resolve(dataDir, "conference.json"), "utf-8")),
);

export const speakers = speakersSchema.parse(
  JSON.parse(readFileSync(resolve(dataDir, "speakers.json"), "utf-8")),
);

export const schedule = scheduleSchema.parse(
  JSON.parse(readFileSync(resolve(dataDir, "schedule.json"), "utf-8")),
);
