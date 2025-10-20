import { pgTable, serial, integer, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { z } from "zod";

// ============================================
// GIVEAWAY ENTRIES TABLE
// ============================================
export const giveawayEntries = pgTable('giveaway_entries', {
  id: serial('id').primaryKey(),
  entryId: varchar('entry_id', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  selectedProducts: text('selected_products').notNull(), // JSON array of product IDs
  taskFacebook: boolean('task_facebook').default(false).notNull(),
  taskInstagram: boolean('task_instagram').default(false).notNull(),
  taskShare: boolean('task_share').default(false).notNull(),
  shareCount: integer('share_count').default(0).notNull(),
  referredBy: varchar('referred_by', { length: 50 }),
  referralCount: integer('referral_count').default(0).notNull(),
  referralEntries: integer('referral_entries').default(0).notNull(),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }), // IPv4 or IPv6
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

// Zod schema for validation
export const insertGiveawayEntrySchema = z.object({
  entryId: z.string().min(1, "Entry ID е задължителен"),
  name: z.string().min(1, "Името е задължително"),
  email: z.string().email("Невалиден имейл адрес"),
  phone: z.string().regex(/^[0-9]{10}$/, "Телефонът трябва да е 10 цифри"),
  selectedProducts: z.array(z.string()).min(1, "Трябва да изберете поне един продукт"),
  taskFacebook: z.boolean().optional(),
  taskInstagram: z.boolean().optional(),
  taskShare: z.boolean().optional(),
  referredBy: z.string().optional(), // Entry ID of referrer
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
});

export type InsertGiveawayEntry = z.infer<typeof insertGiveawayEntrySchema>;

// ============================================
// QUIZ RESPONSES TABLE
// ============================================
export const quizResponses = pgTable('quiz_responses', {
  id: serial('id').primaryKey(),
  city: varchar('city', { length: 255 }).notNull(),
  weapon: varchar('weapon', { length: 255 }).notNull(),
  motivation: varchar('motivation', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

// Zod schema for validation
export const insertQuizResponseSchema = z.object({
  city: z.string().min(1, "Моля изберете град"),
  weapon: z.string().min(1, "Моля изберете оръжие"),
  motivation: z.string().min(1, "Моля изберете мотивация"),
  email: z.string().email("Моля въведете валиден имейл адрес"),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
});

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
