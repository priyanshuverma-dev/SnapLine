import { create } from "zustand";

interface useEntryModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEntryModal = create<useEntryModalState>((set) => ({
  isOpen: true,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
