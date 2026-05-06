import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { conferenceToMarkdown } from "../common/toMarkdown.js";
import { conferences, getConferenceData } from "./data/conferenceData.js";

const conferenceIdParam = z
  .string()
  .describe(
    "The conference id, e.g. 'pisa-2026'. Call list_conferences to discover available ids.",
  );

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

export const getSessions = new FunctionTool({
  name: "get_sessions",
  description:
    "Get conference sessions, optionally filtered by speaker, room, or time slot.",
  parameters: z.object({
    conferenceId: conferenceIdParam,
    speaker: z
      .string()
      .optional()
      .describe("Filter by speaker name (partial match)"),
    room: z
      .string()
      .optional()
      .describe("Filter by room name (partial match)"),
    timeSlot: z
      .string()
      .optional()
      .describe(
        "Filter by time slot, e.g. '10:00' or 'morning' or 'afternoon'"
      ),
  }),
  execute: async ({
    conferenceId,
    speaker,
    room,
    timeSlot,
  }) => {
    const { schedule } = getConferenceData(conferenceId);
    let result = schedule;

    if (speaker) {
      result = result.filter((s) =>
        s.speaker.toLowerCase().includes(speaker.toLowerCase())
      );
    }

    if (room) {
      result = result.filter((s) =>
        s.room.toLowerCase().includes(room.toLowerCase())
      );
    }

    if (timeSlot) {
      const slot = timeSlot.toLowerCase();
      if (slot === "morning") {
        result = result.filter((s) => {
          const hour = parseInt(s.start_time.split("T")[1].split(":")[0]);
          return hour < 13;
        });
      } else if (slot === "afternoon") {
        result = result.filter((s) => {
          const hour = parseInt(s.start_time.split("T")[1].split(":")[0]);
          return hour >= 13;
        });
      } else {
        result = result.filter((s) => s.start_time.includes(timeSlot));
      }
    }

    if (result.length === 0) {
      return "No sessions found matching the given filters.";
    }

    return result
      .map(
        (s) =>
          `${s.start_time} - ${s.end_time} | ${s["talk title"]} by ${s.speaker} | ${s.room}`
      )
      .join("\n\n");
  },
});

export const getSpeakers = new FunctionTool({
  name: "get_speakers",
  description:
    "Get information about conference speakers, optionally filtered by name or heading.",
  parameters: z.object({
    conferenceId: conferenceIdParam,
    name: z
      .string()
      .optional()
      .describe("Filter by speaker name (partial match)"),
    heading: z
      .string()
      .optional()
      .describe("Filter by heading/role (partial match)"),
  }),
  execute: async ({
    conferenceId,
    name,
    heading,
  }) => {
    const { speakers } = getConferenceData(conferenceId);
    let result = speakers;

    if (name) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (heading) {
      result = result.filter((s) =>
        s.heading.toLowerCase().includes(heading.toLowerCase())
      );
    }

    if (result.length === 0) {
      return "No speakers found matching the given filters.";
    }

    return result
      .map((s) => `${s.name} — ${s.heading}\n  ${s.bio}`)
      .join("\n\n");
  },
});

export const getUserPreferences = new FunctionTool({
  name: "get_user_preferences",
  description:
    "Record and return structured user preferences for schedule building. Call this when the user shares their interests.",
  parameters: z.object({
    conferenceId: conferenceIdParam,
    interests: z
      .array(z.string())
      .describe(
        "List of topics the user is interested in"
      ),
    mustSeeSpeakers: z
      .array(z.string())
      .optional()
      .describe("Speakers the user specifically wants to see"),
  }),
  execute: async ({
    conferenceId,
    interests,
    mustSeeSpeakers,
  }) => {
    const { schedule } = getConferenceData(conferenceId);
    const rooms = [...new Set(schedule.map((s) => s.room))];
    return JSON.stringify(
      {
        conferenceId,
        interests,
        mustSeeSpeakers: mustSeeSpeakers ?? [],
        availableRooms: rooms,
      },
      null,
      2
    );
  },
});
