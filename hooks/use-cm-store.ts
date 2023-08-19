import { create } from "zustand";

interface useConfirmationModalState {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  promptId?: string;
}

export const useConfirmationModal = create<useConfirmationModalState>(
  (set) => ({
    isOpen: false,
    promptId: "",
    onOpen: (id) => set({ isOpen: true, promptId: id }),
    onClose: () => set({ isOpen: false, promptId: "" }),
  })
);
