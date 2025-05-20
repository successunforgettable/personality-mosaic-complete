import { pgTable, text, serial, integer, jsonb, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

// Schemas for Replit Auth
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
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
