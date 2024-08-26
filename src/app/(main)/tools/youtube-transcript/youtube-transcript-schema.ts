import { z } from "zod";

export const ytTranscriptSchema = z.object({
  url: z
    .string()
    .regex(/https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9_-]{11}/, {
      message: "Invalid youtube video URL",
    }),
});
export type YtTranscript = z.infer<typeof ytTranscriptSchema>;
