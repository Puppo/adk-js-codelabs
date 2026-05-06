import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  conferencesSchema,
  type Conference,
  type Conferences,
} from "./conferenceSchema.js";
import { scheduleSchema, type Schedule } from "./scheduleSchema.js";
import { speakersSchema, type Speakers } from "./speakersSchema.js";

import conferencesJSON from "../../data/conference.json" with { type: "json" };

export type ConferenceBundle = {
  conference: Conference;
  speakers: Speakers;
  schedule: Schedule;
};

export const conferences: Conferences = conferencesSchema.parse(conferencesJSON);

// Anchored to cwd because adk-devtools bundles agents into a temp dir,
// where import.meta.url no longer points at the source tree.
const dataDir = join(process.cwd(), "data");

const bundles = new Map<string, ConferenceBundle>(
  conferences.map((conference) => {
    const speakers = speakersSchema.parse(
      JSON.parse(readFileSync(join(dataDir, conference.id, "speakers.json"), "utf8")),
    );
    const schedule = scheduleSchema.parse(
      JSON.parse(readFileSync(join(dataDir, conference.id, "schedule.json"), "utf8")),
    );
    return [conference.id, { conference, speakers, schedule }];
  }),
);

export function getConferenceData(conferenceId: string): ConferenceBundle {
  const bundle = bundles.get(conferenceId);
  if (!bundle) {
    const known = conferences.map((c) => c.id).join(", ");
    throw new Error(
      `Unknown conferenceId "${conferenceId}". Known ids: ${known}`,
    );
  }
  return bundle;
}
