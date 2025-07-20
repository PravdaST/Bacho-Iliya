
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

// Table definition for quiz responses
export const quizResponses = pgTable('quiz_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  city: text('city').notNull(),
  weapon: text('weapon').notNull(),
  motivation: text('motivation').notNull(),
  email: text('email').notNull(),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
  motivation: z.string().min(1, "Моля изберете мотивация"),
  email: z.string().email("Моля въведете валиден имейл адрес"),
  userAgent: z.string().nullable().optional(),
});

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
