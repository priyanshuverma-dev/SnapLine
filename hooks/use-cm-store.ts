import { create } from "zustand";

interface useConfirmationModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useConfirmationModal = create<useConfirmationModalState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
