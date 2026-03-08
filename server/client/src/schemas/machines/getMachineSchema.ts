import { z } from "zod";

export const getMachineParamsSchema = z.object({
  machineId: z.string().optional(),
});

export type GetMachineParamsSchema = z.infer<typeof getMachineParamsSchema>;
