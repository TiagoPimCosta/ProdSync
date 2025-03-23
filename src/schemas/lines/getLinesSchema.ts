import { z } from "zod";

export const getLinesParamsSchema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
});

export type GetLinesParamsSchema = z.infer<typeof getLinesParamsSchema>;
