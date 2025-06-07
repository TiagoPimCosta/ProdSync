import { z } from "zod";

export const getHourlyStatsRecordsParamsSchema = z.object({
  userId: z.string().optional(),
  lineId: z.string().optional(),
  machineId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type GetHourlyStatsRecordsParamsSchema = z.infer<typeof getHourlyStatsRecordsParamsSchema>;
