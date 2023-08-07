type Role = "USER" | "ADMIN" | "SUPERADMIN" | "VERIFIED";

export type User = {
  id: string;
  name: string;
  image: string;
  username: string;
  following: string[];
  followers: string[];
  likedPrompts: string[];
  bio: string;
  role: Role;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
