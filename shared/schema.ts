import { z } from "zod";

export const insertQuizResponseSchema = z.object({
  city: z.string().min(1, "Моля изберете град"),
  weapon: z.string().min(1, "Моля изберете оръжие"),
  motivation: z.string().min(1, "Моля изберете мотивация"),
  email: z.string().email("Моля въведете валиден имейл адрес"),
  userAgent: z.string().nullable().optional(),
});

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
