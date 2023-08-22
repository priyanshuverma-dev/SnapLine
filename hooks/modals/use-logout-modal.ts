import { create } from "zustand";

interface useLogoutModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useLogoutModal = create<useLogoutModalState>((set) => ({
  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
