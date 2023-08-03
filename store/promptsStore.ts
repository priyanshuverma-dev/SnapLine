import { create } from "zustand";
import { Prompt } from "@/Utils/prompt";

interface PromptsState {
  prompt?: Prompt[] | string;
  fetchPrompts: () => void;
}

const fetchPrompt = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/prompt/get`, {
    method: "POST",
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({
      userId,
    }),
  });

  if (res.status == 200) {
    const rs: Prompt[] = await res.json();

    return rs;
  } else {
    return "No Post";
  }
};

const usePromptsStore = create<PromptsState>()((set) => ({
  prompts: [],
  fetchPrompts: () => {
    set((state) => ({ prompt: state.prompt }));
  },
}));

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

export default usePromptsStore;
