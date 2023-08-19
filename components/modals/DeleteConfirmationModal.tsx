import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
    <div>
      <Dialog
        open={modal.isOpen}
        onOpenChange={() => {
          modal.onClose();
        }}
      >
        <DialogContent className=" dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>
              <h2>Are you sure?</h2>
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 dark:text-gray-400">
            Do you really want to delete these prompt? This process cannot be
            undone.
          </p>

          <div className="flex justify-end space-x-2">
            <Button onClick={() => modal.onClose()} variant={"outline"}>
              Cancel
            </Button>
            <Button
              onClick={() => deletePrompt(modal.promptId)}
              variant={"destructive"}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
