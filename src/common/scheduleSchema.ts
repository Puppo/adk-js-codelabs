import { z } from "zod";

export const scheduleEntrySchema = z.object({
  speaker: z.string(),
  "talk title": z.string(),
  start_time: z.string(),
  end_time: z.string(),
  room: z.string(),
});

export const scheduleSchema = z.array(scheduleEntrySchema);

export type ScheduleEntry = z.infer<typeof scheduleEntrySchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
