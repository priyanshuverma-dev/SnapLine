import { create } from "zustand";

interface useExternalLinkModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setLink: (link: string) => void;
  link?: string;
}

export const useExternalLinkModal = create<useExternalLinkModalState>(
  (set) => ({
    isOpen: false,
    link: "",
    onOpen: () => set({ isOpen: true }),
    setLink: (link: string) => set({ link }),
    onClose: () => set({ isOpen: false }),
  })
);
