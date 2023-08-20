import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useConfirmationModal } from "@/hooks/use-cm-store";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";

const ConfirmationModal = () => {
  const modal = useConfirmationModal();

  const deletePrompt = async (id?: string) => {
    if (!id) {
      modal.onClose();

      toast.error("Invalid request");
      return;
    }

    try {
      const res = await fetch(`/api/prompt/delete`, {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        toast.success("Prompt deleted");
        modal.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
      }}
    >
      <AlertDialogContent className=" dark:border-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete your pormpt and
            remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePrompt(modal.promptId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
