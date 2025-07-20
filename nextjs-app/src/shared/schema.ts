
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

// Table definition for quiz responses
export const quizResponses = pgTable('quiz_responses', {
  id: serial('id').primaryKey(),
  city: varchar('city', { length: 255 }).notNull(),
  weapon: varchar('weapon', { length: 255 }).notNull(),
  motivation: varchar('motivation', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  userAgent: text('user_agent'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

// Zod schema for validation
export const insertQuizResponseSchema = z.object({
  city: z.string().min(1, "Моля изберете град"),
  weapon: z.string().min(1, "Моля изберете оръжие"),
  motivation: z.string().min(1, "Моля изберете мотивация"),
  email: z.string().email("Моля въведете валиден имейл адрес"),
  userAgent: z.string().nullable().optional(),
});

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
