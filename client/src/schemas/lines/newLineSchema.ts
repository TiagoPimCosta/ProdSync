import { z } from "zod";

export const newLineSchema = z.object({
  name: z.string().min(5),
});

export type NewLineSchema = z.infer<typeof newLineSchema>;
