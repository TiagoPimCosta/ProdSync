import { z } from "zod";

export const newUserSchema = z.object({
  idNumber: z.coerce.number().min(0).gte(1000),
  name: z.string().min(10),
  role: z.string(),
  username: z.string().min(6).max(50),
  password: z.string().min(4).max(10),
  cc: z.string().length(8),
  nif: z.string().length(9),
  phone: z.string().length(9),
  email: z.string().email(),
});
