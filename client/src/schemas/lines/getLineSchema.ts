import { z } from "zod";

export const getLineParamsSchema = z.object({
  lineId: z.string().optional(),
});

export type GetLineParamsSchema = z.infer<typeof getLineParamsSchema>;
