import { z } from "zod";

export const speakerSchema = z.object({
  name: z.string(),
  heading: z.string(),
  bio: z.string(),
});

export const speakersSchema = z.array(speakerSchema);

export type Speaker = z.infer<typeof speakerSchema>;
export type Speakers = z.infer<typeof speakersSchema>;
