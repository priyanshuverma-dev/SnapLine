"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePrompt from "@/hooks/use-prompt";
import { Prompt } from "@/utils/prompt";
import { useStoreModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/LoadingView";
import FeedCard from "@/components/FeedCard";

const ModalPage = ({
  params: { id: promptId },
}: {
  params: { id: string };
}) => {
  const router = useRouter();

  const {
    data: prompt,
    isLoading,
  }: {
    data: Prompt;
    isLoading: boolean;
  } = usePrompt(promptId);

  const modalStore = useStoreModal();

  return (
    <div>
      <Dialog
        open={modalStore.isOpen}
        onOpenChange={() => {
          modalStore.onClose();
          router.back();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isLoading ? "" : `Service: ${prompt.service}`}
            </DialogTitle>
          </DialogHeader>
          {isLoading ? <LoadingModal /> : <FeedCard prompt={prompt} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalPage;
