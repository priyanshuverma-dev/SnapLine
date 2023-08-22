import { AIService } from "./ai-service";
import { Prompt } from "./prompt";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
  VERIFIED = "VERIFIED",
  GUEST = "GUEST",
}

export type User = {
  id: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  role: Role;
  image: string;
  following: string[];
  followers: string[];
  likedPrompts: string[];
  social: string[];
  preferences: [];
  lastUsernameUpdate: Date;
  createdAt: Date;
  updatedAt: Date;
  prompt: Prompt[];
  aiService: AIService[];
  message?: string;
};
