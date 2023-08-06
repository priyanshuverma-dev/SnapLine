export type User = {
  id: string;
  name: string;
  image: string;
  username: string;
  following: string[];
  follower: string[];
  bio: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
