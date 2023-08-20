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
  id: string;
  promptId: string;
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  signature: string;
  width: number;
  height: number;
  resource_type: string;
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
