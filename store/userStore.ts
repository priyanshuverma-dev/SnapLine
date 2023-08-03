import { create } from "zustand";

const useUser = create((set) => ({
  user: 0,
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
