import { z } from "zod";

export const quizResponseSchema = z.object({
  id: z.number(),
  city: z.string(),
  weapon: z.string(),
  motivation: z.string(),
  email: z.string().email(),
  userAgent: z.string().nullable(),
  submittedAt: z.date(),
});

export const insertQuizResponseSchema = quizResponseSchema.omit({
  id: true,
  submittedAt: true,
});

export type QuizResponse = z.infer<typeof quizResponseSchema>;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;