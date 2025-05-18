import { users, type User, type InsertUser, assessmentResults, type AssessmentResult, type InsertAssessmentResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAssessmentResult(id: number): Promise<AssessmentResult | undefined>;
  getAssessmentResultsByUserId(userId: number): Promise<AssessmentResult[]>;
  createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assessmentResults: Map<number, AssessmentResult>;
  private userIdCounter: number;
  private resultIdCounter: number;

  constructor() {
    this.users = new Map();
    this.assessmentResults = new Map();
    this.userIdCounter = 1;
    this.resultIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date().toISOString();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  async getAssessmentResult(id: number): Promise<AssessmentResult | undefined> {
    return this.assessmentResults.get(id);
  }

  async getAssessmentResultsByUserId(userId: number): Promise<AssessmentResult[]> {
    return Array.from(this.assessmentResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  async createAssessmentResult(insertResult: InsertAssessmentResult): Promise<AssessmentResult> {
    const id = this.resultIdCounter++;
    const createdAt = new Date().toISOString();
    const result: AssessmentResult = { ...insertResult, id, createdAt };
    this.assessmentResults.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
