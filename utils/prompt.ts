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

export type Prompt = {
  id: string;
  userId: string;
  prompt: string;
  description: string;
  service: string;
  images: string[];
  tags: string[];
  likes: string[];
  status: PromptStatus;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  clicks: number;
  user: User;
  serviceData: AIService;
};
