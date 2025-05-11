import { z } from "zod";

export const getUserMachinesParamsSchema = z.object({
  id: z.string(),
});

export type GetUserMachinesParamsSchema = z.infer<typeof getUserMachinesParamsSchema>;
