import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

// Assessment results table
export const assessmentResults = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  personalityType: text("personality_type").notNull(),
  influence: text("influence").notNull(),
  stateDistribution: jsonb("state_distribution").notNull(),
  subtypeDistribution: jsonb("subtype_distribution").notNull(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
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
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;
export type AssessmentResult = typeof assessmentResults.$inferSelect;
