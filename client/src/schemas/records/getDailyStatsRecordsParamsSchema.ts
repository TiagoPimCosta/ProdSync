import { z } from "zod";

export const getDailyStatsRecordsParamsSchema = z.object({
  userId: z.string().optional(),
  lineId: z.string().optional(),
  machineId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type GetDailyStatsRecordsParamsSchema = z.infer<typeof getDailyStatsRecordsParamsSchema>;
