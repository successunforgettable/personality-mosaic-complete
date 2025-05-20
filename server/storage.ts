import {
  users,
  type User,
  type UpsertUser,
  assessmentResults,
  type AssessmentResult,
  type InsertAssessmentResult,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Legacy method to maintain compatibility
  getUserByUsername(username: string): Promise<User | undefined>;
  
  // Assessment operations
  getAssessmentResult(id: number): Promise<AssessmentResult | undefined>;
  getAssessmentResultsByUserId(userId: string): Promise<AssessmentResult[]>;
  createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values({
          ...userData,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: users.id,
          set: {
            ...userData,
            updatedAt: new Date(),
          },
        })
        .returning();
      return user;
    } catch (error) {
      console.error("Error upserting user:", error);
      throw error;
    }
  }
  
  // Legacy method for compatibility
  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, username));
      return user;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  // Assessment operations
  async getAssessmentResult(id: number): Promise<AssessmentResult | undefined> {
    try {
      const [result] = await db.select().from(assessmentResults).where(eq(assessmentResults.id, id));
      return result;
    } catch (error) {
      console.error("Error getting assessment result:", error);
      return undefined;
    }
  }

  async getAssessmentResultsByUserId(userId: string): Promise<AssessmentResult[]> {
    try {
      const results = await db.select().from(assessmentResults).where(eq(assessmentResults.userId, userId));
      return results;
    } catch (error) {
      console.error("Error getting assessment results by user ID:", error);
      return [];
    }
  }

  async createAssessmentResult(insertResult: InsertAssessmentResult): Promise<AssessmentResult> {
    try {
      const [result] = await db.insert(assessmentResults).values(insertResult).returning();
      return result;
    } catch (error) {
      console.error("Error creating assessment result:", error);
      throw error;
    }
  }
}

// Export storage instance
export const storage = new DatabaseStorage();
