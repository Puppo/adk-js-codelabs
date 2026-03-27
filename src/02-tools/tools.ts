import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { sessions, speakers } from "./data/conferenceData.js";

// ============================================================
// TODO 1: Create the getSessions tool
// ============================================================
// This tool lets the agent search for conference sessions.
//
// Parameters (all optional):
//   - track: string — filter by track (AI/ML, Web, Cloud, Mobile, DevOps)
//   - timeSlot: string — "morning", "afternoon", or exact time like "10:30-11:30"
//   - difficulty: string — Beginner, Intermediate, or Advanced
//
// The execute function should:
//   1. Start with all sessions from the imported `sessions` array
//   2. Filter by track if provided (case-insensitive comparison)
//   3. Filter by difficulty if provided (case-insensitive comparison)
//   4. Filter by timeSlot if provided:
//      - "morning" = sessions before 13:00
//      - "afternoon" = sessions at 13:00 or later
//      - otherwise exact match on the time field
//   5. Return a formatted string with session details
export const getSessions = new FunctionTool({
  name: "get_sessions",
  description:
    "Get conference sessions, optionally filtered by track, time slot, or difficulty level.",
  parameters: z.object({
    // TODO: Add Zod schema for track, timeSlot, difficulty (all optional strings)
  }),
  execute: async () => {
    // TODO: Implement the filtering logic described above
    // Hint: use sessions.filter() and return a formatted string
    return "Not implemented yet";
  },
});

// ============================================================
// TODO 2: Create the getSpeakers tool
// ============================================================
// This tool lets the agent look up speaker information.
//
// Parameters (all optional):
//   - name: string — partial match on speaker name
//   - company: string — partial match on company name
//
// The execute function should:
//   1. Start with all speakers from the imported `speakers` array
//   2. Filter by name if provided (case-insensitive, partial match with .includes())
//   3. Filter by company if provided (case-insensitive, partial match)
//   4. Return a formatted string with speaker details
export const getSpeakers = new FunctionTool({
  name: "get_speakers",
  description:
    "Get information about conference speakers, optionally filtered by name or company.",
  parameters: z.object({
    // TODO: Add Zod schema for name and company (both optional strings)
  }),
  execute: async () => {
    // TODO: Implement the filtering logic described above
    return "Not implemented yet";
  },
});

// ============================================================
// TODO 3: Create the getUserPreferences tool
// ============================================================
// This tool captures user preferences in a structured format.
//
// Parameters:
//   - interests: array of strings (required) — tracks/topics the user likes
//   - skillLevel: string (optional) — Beginner, Intermediate, or Advanced
//   - mustSeeSpeakers: array of strings (optional) — specific speakers to prioritize
//
// The execute function should:
//   Return a JSON string with the preferences plus the available tracks list
export const getUserPreferences = new FunctionTool({
  name: "get_user_preferences",
  description:
    "Record and return structured user preferences for schedule building. Call this when the user shares their interests.",
  parameters: z.object({
    // TODO: Add Zod schema for interests (required array), skillLevel, mustSeeSpeakers
  }),
  execute: async () => {
    // TODO: Return JSON.stringify({ interests, skillLevel, mustSeeSpeakers, availableTracks })
    return "Not implemented yet";
  },
});
