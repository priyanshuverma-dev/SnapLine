import { create } from "zustand";

interface useNavbarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNavbarStore = create<useNavbarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
