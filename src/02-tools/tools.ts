import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { schedule, speakers } from "./data/conferenceData.js";

// ============================================================
// TODO 1: Create the getSessions tool
// ============================================================
// This tool lets the agent search for conference sessions.
//
// Parameters (all optional):
//   - speaker: string — filter by speaker name (partial match)
//   - room: string — filter by room name (partial match)
//   - timeSlot: string — "morning", "afternoon", or exact time like "10:00"
//
// The execute function should:
//   1. Start with all entries from the imported `schedule` array
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
    // TODO: Add Zod schema for speaker, room, timeSlot (all optional strings)
  }),
  execute: async () => {
    // TODO: Implement the filtering logic described above
    // Hint: use schedule.filter() and return a formatted string
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
//   - heading: string — partial match on heading/role
//
// The execute function should:
//   1. Start with all speakers from the imported `speakers` array
//   2. Filter by name if provided (case-insensitive, partial match with .includes())
//   3. Filter by heading if provided (case-insensitive, partial match)
//   4. Return a formatted string with speaker details
export const getSpeakers = new FunctionTool({
  name: "get_speakers",
  description:
    "Get information about conference speakers, optionally filtered by name or heading.",
  parameters: z.object({
    // TODO: Add Zod schema for name and heading (both optional strings)
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
//   - interests: array of strings (required) — topics the user likes
//   - mustSeeSpeakers: array of strings (optional) — specific speakers to prioritize
//
// The execute function should:
//   Return a JSON string with the preferences plus the available rooms list
export const getUserPreferences = new FunctionTool({
  name: "get_user_preferences",
  description:
    "Record and return structured user preferences for schedule building. Call this when the user shares their interests.",
  parameters: z.object({
    // TODO: Add Zod schema for interests (required array), mustSeeSpeakers (optional array)
  }),
  execute: async () => {
    // TODO: Return JSON.stringify({ interests, mustSeeSpeakers, availableRooms })
    return "Not implemented yet";
  },
});
