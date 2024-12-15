import { z } from "zod";

export const getUsersParamsSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
});

export type GetUsersParamsSchema = z.infer<typeof getUsersParamsSchema>;
