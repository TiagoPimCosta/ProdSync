import { z } from "zod";

export const getMachinesParamsSchema = z.object({
  name: z.string().optional(),
  line: z.string().optional(),
  user: z.string().optional(),
  status: z.string().optional(),
});

export type GetMachinesParamsSchema = z.infer<typeof getMachinesParamsSchema>;
