import { z } from "zod";

export const getUsersParamsSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  startAdmission: z.string().optional(),
  endAdmission: z.string().optional(),
});

export const getUserParamsSchema = z.object({
  id: z.number(),
});

export type GetUsersParamsSchema = z.infer<typeof getUsersParamsSchema>;
export type GetUserParamsSchema = z.infer<typeof getUserParamsSchema>;
