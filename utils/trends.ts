import { PromptStatus } from "@prisma/client";
import { User } from "./user";
import { Prompt } from "./prompt";

export type Trends = {
  id: string;
  userId: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  promptIds: string[];
  createdAt: Date;
  updatedAt: Date;
  prompts: Prompt[];
  status: PromptStatus;
  user: User;
};
