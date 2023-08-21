import { User } from "@/utils/user";
import { create } from "zustand";

interface useCurrentUserState {
  user?: User;
  setUser: (user: User) => void;
  removeUser: () => void;
  isLogged: boolean;
  setLogged: (loggedIn: boolean) => void;
}

export const useCurrentUserStore = create<useCurrentUserState>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
  removeUser: () => set({ user: undefined }),
  isLogged: false,
  setLogged: (loggedIn) => set({ isLogged: loggedIn }),
}));
