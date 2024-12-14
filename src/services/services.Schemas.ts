import { z } from "zod";

export const PaginationParamsSchema = z.object({
  page: z.number(),
  size: z.number(),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
