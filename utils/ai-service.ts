import { Prompt } from "./prompt";
import { User } from "./user";

enum AIType {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  OTHER = "OTHER",
}

enum Status {
  VERIFIED = "VERIFIED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export type AIService = {
  id: string;
  name: string;
  description: string;
  website: string;
  price?: number;
  owner?: string;
  aiType: AIType;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  prompt: Prompt[];
};
