"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import usePrompt from "@/hooks/use-prompt";
import { Prompt } from "@/Utils/prompt";
import FeedCard from "@/app/(components)/FeedCard";
import PromptSkeletion from "@/app/(components)/PromptSkeletion";
import { useStoreModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import PromptSkeletionModal from "@/app/(components)/Modal";

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
          router.back();
          modalStore.onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isLoading ? "Wait for request" : `Service: ${prompt.service}`}
            </DialogTitle>
          </DialogHeader>
          {isLoading ? <PromptSkeletionModal /> : <FeedCard prompt={prompt} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalPage;
