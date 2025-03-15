import { z } from "zod";

export const getUserParamsSchema = z.object({
  id: z.number(),
});

export type GetUserParamsSchema = z.infer<typeof getUserParamsSchema>;
