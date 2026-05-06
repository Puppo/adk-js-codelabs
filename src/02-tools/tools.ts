import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { conferenceToMarkdown } from "../common/toMarkdown.js";
import { conferences, getConferenceData } from "./data/conferenceData.js";

// A reusable Zod helper — every data tool below takes a conferenceId,
// so the agent must first discover (or be told) which conference to query.
const conferenceIdParam = z
  .string()
  .describe(
    "The conference id, e.g. 'pisa-2026'. Call list_conferences to discover available ids.",
  );

// ============================================================
// Provided for you: list_conferences
// ============================================================
// Lists every available conference (id, name, start time, theme). The agent
// should call this FIRST when the user hasn't specified which conference they
// mean. Already implemented because it's plumbing — the interesting tools are
// below.
export const listConferences = new FunctionTool({
  name: "list_conferences",
  description:
    "List all available conferences with their id, name, start date and theme. Call this first when the user hasn't specified which conference they want.",
  parameters: z.object({}),
  execute: async () => {
    if (conferences.length === 0) {
      return "No conferences are configured.";
    }
    return conferences
      .map(
        (c) =>
          `${c.id} | ${c.conference_name} | ${c.start_time} | Theme: ${c.theme}`,
      )
      .join("\n");
  },
});

// ============================================================
// Provided for you: get_conference
// ============================================================
// Returns the venue, directions, organizers and sponsors for a given conference.
export const getConference = new FunctionTool({
  name: "get_conference",
  description:
    "Get full details for a conference: venue, directions, organizers and sponsors.",
  parameters: z.object({
    conferenceId: conferenceIdParam,
  }),
  execute: async ({ conferenceId }) => {
    const { conference } = getConferenceData(conferenceId);
    return conferenceToMarkdown(conference);
  },
});

// ============================================================
// TODO 1: Create the getSessions tool
// ============================================================
// This tool lets the agent search for conference sessions.
//
// Parameters:
//   - conferenceId: required — use the shared `conferenceIdParam` Zod helper
//   - speaker: optional string — filter by speaker name (partial match)
//   - room: optional string — filter by room name (partial match)
//   - timeSlot: optional string — "morning", "afternoon", or exact time like "10:00"
//
// The execute function should:
//   1. Load the conference's bundle: `const { schedule } = getConferenceData(conferenceId);`
//   2. Filter by speaker if provided (case-insensitive, partial match with .includes())
//   3. Filter by room if provided (case-insensitive, partial match with .includes())
//   4. Filter by timeSlot if provided:
//      - "morning" = sessions starting before 13:00
//      - "afternoon" = sessions starting at 13:00 or later
//      - otherwise partial match on start_time
//   5. Return a formatted string with session details
export const getSessions = new FunctionTool({
  name: "get_sessions",
  description:
    "Get conference sessions, optionally filtered by speaker, room, or time slot.",
  parameters: z.object({
    // TODO: Add Zod schema. Required: conferenceId (use conferenceIdParam).
    //       Optional: speaker, room, timeSlot (all strings).
  }),
  execute: async () => {
    // TODO: Destructure { conferenceId, speaker, room, timeSlot } from the args,
    // load the bundle via getConferenceData(conferenceId), then filter and format.
    return "Not implemented yet";
  },
});

// ============================================================
// TODO 2: Create the getSpeakers tool
// ============================================================
// This tool lets the agent look up speaker information.
//
// Parameters:
//   - conferenceId: required — use the shared `conferenceIdParam` Zod helper
//   - name: optional string — partial match on speaker name
//   - heading: optional string — partial match on heading/role
//
// The execute function should:
//   1. Load the conference's bundle: `const { speakers } = getConferenceData(conferenceId);`
//   2. Filter by name if provided (case-insensitive, partial match)
//   3. Filter by heading if provided (case-insensitive, partial match)
//   4. Return a formatted string with speaker details
export const getSpeakers = new FunctionTool({
  name: "get_speakers",
  description:
    "Get information about conference speakers, optionally filtered by name or heading.",
  parameters: z.object({
    // TODO: Add Zod schema. Required: conferenceId. Optional: name, heading.
  }),
  execute: async () => {
    // TODO: Destructure { conferenceId, name, heading }, load the bundle,
    // filter the speakers and return a formatted string.
    return "Not implemented yet";
  },
});

// ============================================================
// TODO 3: Create the getUserPreferences tool
// ============================================================
// This tool captures user preferences in a structured format.
//
// Parameters:
//   - conferenceId: required — preferences are scoped to one conference
//   - interests: required array of strings — topics the user likes
//   - mustSeeSpeakers: optional array of strings — specific speakers to prioritize
//
// The execute function should:
//   1. Load the conference's schedule to derive the available rooms list
//   2. Return a JSON string with the preferences plus the conferenceId and
//      availableRooms — the schedule builder will read it back later
export const getUserPreferences = new FunctionTool({
  name: "get_user_preferences",
  description:
    "Record and return structured user preferences for schedule building. Call this when the user shares their interests.",
  parameters: z.object({
    // TODO: Add Zod schema:
    //   conferenceId (required), interests (required array of strings),
    //   mustSeeSpeakers (optional array of strings)
  }),
  execute: async () => {
    // TODO: Destructure args, derive availableRooms from the conference's schedule,
    // return JSON.stringify({ conferenceId, interests, mustSeeSpeakers, availableRooms }).
    return "Not implemented yet";
  },
});
