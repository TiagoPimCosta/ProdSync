import { z } from "zod";

export const newMachineSchema = z.object({
  name: z.string().min(5),
  line: z.string().optional(),
  cadence: z.coerce.number().min(1),
});

export type NewMachineSchema = z.infer<typeof newMachineSchema>;
