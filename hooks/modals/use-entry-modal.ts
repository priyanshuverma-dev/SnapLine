import { create } from "zustand";

interface useEntryModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

let isNewUser: string;

if (typeof window !== "undefined") {
  isNewUser = localStorage.getItem("DevInviteModel") || "";
}

export const useEntryModal = create<useEntryModalState>((set) => ({
  isOpen: isNewUser == "false" || "" ? false : true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => {
    localStorage.setItem("DevInviteModel", "false");
    set({ isOpen: false });
  },
}));
