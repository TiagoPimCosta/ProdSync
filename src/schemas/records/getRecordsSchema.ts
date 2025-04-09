import { z } from "zod";

export const getRecordsParamsSchema = z.object({
  user: z.string().optional(),
  machine: z.string().optional(),
  startPeriod: z.string().optional(),
  endPeriod: z.string().optional(),
});

export type GetRecordsParamsSchema = z.infer<typeof getRecordsParamsSchema>;
