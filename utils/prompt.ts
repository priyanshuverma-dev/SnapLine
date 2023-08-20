import { AIService } from "./ai-service";
import { User } from "./user";

enum PromptStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
  DELETED = "DELETED",
  SUSPENDED = "SUSPENDED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export type Media = {
  id: String;
  promptId: String;
  url: String;
  secure_url: String;
  public_id: String;
  format: String;
  signature: String;
  width: Number;
  height: Number;
  resource_type: String;
  createdAt: Date;
  updatedAt: Date;
};

export type Prompt = {
  id: string;
  userId: string;
  title: string;
  prompt: string;
  description: string;
  service: string;
  medias: Media[];
  tags: string[];
  likes: string[];
  status: PromptStatus;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  clicks: number;
  user: User;

  aiService: AIService;
};
