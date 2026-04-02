import { z } from "zod";

const directionsSchema = z.object({
  by_train: z.string(),
  by_plane: z.string(),
  by_car: z.string(),
});

const venueSchema = z.object({
  name: z.string(),
  address: z.string(),
  description: z.string(),
  directions: directionsSchema,
});

const sponsorsSchema = z.object({
  main: z.array(z.string()),
  diamond: z.array(z.string()),
  silver: z.array(z.string()),
});

export const conferenceSchema = z.object({
  conference_name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  theme: z.string(),
  venue: venueSchema,
  organizers: z.array(z.string()),
  sponsors: sponsorsSchema,
});

export type Conference = z.infer<typeof conferenceSchema>;
