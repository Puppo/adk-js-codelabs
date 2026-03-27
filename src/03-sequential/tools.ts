import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { sessions, speakers } from "./data/conferenceData.js";

export const getSessions = new FunctionTool({
  name: "get_sessions",
  description:
    "Get conference sessions, optionally filtered by track, time slot, or difficulty level.",
  parameters: z.object({
    track: z
      .string()
      .optional()
      .describe("Filter by track: AI/ML, Web, Cloud, Mobile, or DevOps"),
    timeSlot: z
      .string()
      .optional()
      .describe(
        "Filter by time slot, e.g. '10:30-11:30' or 'morning' or 'afternoon'"
      ),
    difficulty: z
      .string()
      .optional()
      .describe("Filter by difficulty: Beginner, Intermediate, or Advanced"),
  }),
  execute: async ({
    track,
    timeSlot,
    difficulty,
  }: {
    track?: string;
    timeSlot?: string;
    difficulty?: string;
  }) => {
    let result = sessions;

    if (track) {
      result = result.filter(
        (s) => s.track.toLowerCase() === track.toLowerCase()
      );
    }

    if (difficulty) {
      result = result.filter(
        (s) => s.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (timeSlot) {
      const slot = timeSlot.toLowerCase();
      if (slot === "morning") {
        result = result.filter((s) => {
          const hour = parseInt(s.time.split(":")[0]);
          return hour < 13;
        });
      } else if (slot === "afternoon") {
        result = result.filter((s) => {
          const hour = parseInt(s.time.split(":")[0]);
          return hour >= 13;
        });
      } else {
        result = result.filter((s) => s.time === timeSlot);
      }
    }

    if (result.length === 0) {
      return "No sessions found matching the given filters.";
    }

    return result
      .map(
        (s) =>
          `${s.time} | ${s.title} by ${s.speaker} | ${s.room} | ${s.track} | ${s.difficulty}\n  ${s.description}`
      )
      .join("\n\n");
  },
});

export const getSpeakers = new FunctionTool({
  name: "get_speakers",
  description:
    "Get information about conference speakers, optionally filtered by name or company.",
  parameters: z.object({
    name: z
      .string()
      .optional()
      .describe("Filter by speaker name (partial match)"),
    company: z
      .string()
      .optional()
      .describe("Filter by company name (partial match)"),
  }),
  execute: async ({ name, company }: { name?: string; company?: string }) => {
    let result = speakers;

    if (name) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (company) {
      result = result.filter((s) =>
        s.company.toLowerCase().includes(company.toLowerCase())
      );
    }

    if (result.length === 0) {
      return "No speakers found matching the given filters.";
    }

    return result
      .map((s) => `${s.name} — ${s.role} at ${s.company}\n  ${s.bio}`)
      .join("\n\n");
  },
});

export const getUserPreferences = new FunctionTool({
  name: "get_user_preferences",
  description:
    "Record and return structured user preferences for schedule building. Call this when the user shares their interests.",
  parameters: z.object({
    interests: z
      .array(z.string())
      .describe(
        "List of tracks or topics the user is interested in, e.g. ['AI/ML', 'Cloud']"
      ),
    skillLevel: z
      .string()
      .optional()
      .describe("User's skill level: Beginner, Intermediate, or Advanced"),
    mustSeeSpeakers: z
      .array(z.string())
      .optional()
      .describe("Speakers the user specifically wants to see"),
  }),
  execute: async ({
    interests,
    skillLevel,
    mustSeeSpeakers,
  }: {
    interests: string[];
    skillLevel?: string;
    mustSeeSpeakers?: string[];
  }) => {
    return JSON.stringify(
      {
        interests,
        skillLevel: skillLevel ?? "any",
        mustSeeSpeakers: mustSeeSpeakers ?? [],
        availableTracks: ["AI/ML", "Web", "Cloud", "Mobile", "DevOps"],
      },
      null,
      2
    );
  },
});
