import { pgTable, text, serial, integer, jsonb, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table - matches actual database structure
export const users = pgTable("users", {
  id: integer("id").primaryKey(),
  username: text("username"),
  password: text("password"),
  email: text("email"),
  created_at: text("created_at")
});

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Assessment results table
export const assessmentResults = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  personalityType: text("personality_type").notNull(),
  influence: text("influence").notNull(),
  stateDistribution: jsonb("state_distribution").notNull(), // Stores 5 states
  subtypeDistribution: jsonb("subtype_distribution").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas for user management
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  username: true,
  password: true,
  email: true,
});

export const insertAssessmentResultSchema = createInsertSchema(assessmentResults).pick({
  userId: true,
  personalityType: true,
  influence: true,
  stateDistribution: true,
  subtypeDistribution: true,
});

// Types
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;
export type AssessmentResult = typeof assessmentResults.$inferSelect;
