import { z } from "zod";

export const getRecordsHistoryParamsSchema = z.object({
  userId: z.string().optional(),
});

export type GetRecordsHistoryParamsSchema = z.infer<typeof getRecordsHistoryParamsSchema>;
