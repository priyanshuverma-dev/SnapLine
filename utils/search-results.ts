import { AIService } from "./ai-service";
import { Prompt } from "./prompt";
import { User } from "./user";

export type SearchResults = {
  prompts: Prompt[];
  users: User[];
  ai: AIService[];
};
