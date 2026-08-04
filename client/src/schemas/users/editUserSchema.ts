import { z } from "zod";

export const editUserSchema = z.object({
  idNumber: z.coerce.number().min(0).gte(1000),
  name: z.string().min(10),
  role: z.string(),
  username: z.string().min(6).max(50),
  cc: z.string().length(8),
  nif: z.string().length(9),
  phone: z.string().length(9),
  email: z.string().email(),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
