export type Prompt = {
  id: string;
  userId: string;
  prompt: string;
  description: string;
  service?: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  clicks: number;
  user: {
    name: string;
    image: string;
    username: string;
    bio: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
