import { z } from "zod";

export const getUserParamsSchema = z.object({
  id: z.string(),
});

export type GetUserParamsSchema = z.infer<typeof getUserParamsSchema>;
