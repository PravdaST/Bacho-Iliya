import { users, quizResponses, type User, type InsertUser, type QuizResponse, type InsertQuizResponse } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getAllQuizResponses(): Promise<QuizResponse[]>;
  getQuizResponsesByCity(city: string): Promise<QuizResponse[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizResponses: Map<number, QuizResponse>;
  private currentUserId: number;
  private currentQuizId: number;

  constructor() {
    this.users = new Map();
    this.quizResponses = new Map();
    this.currentUserId = 1;
    this.currentQuizId = 1;
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
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = this.currentQuizId++;
    const response: QuizResponse = { 
      ...insertResponse, 
      id,
      submittedAt: new Date()
    };
    this.quizResponses.set(id, response);
    return response;
  }

  async getAllQuizResponses(): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values());
  }

  async getQuizResponsesByCity(city: string): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values()).filter(
      (response) => response.city === city
    );
  }
}

export const storage = new MemStorage();
