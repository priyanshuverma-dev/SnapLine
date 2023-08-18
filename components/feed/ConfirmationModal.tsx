import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useConfirmationModal } from "@/hooks/use-cm-store";

const ConfirmationModal = () => {
  const modal = useConfirmationModal();

  return (
    <div>
      <Dialog
        open={modal.isOpen}
        onOpenChange={() => {
          modal.onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h2>Are you sure?</h2>
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-end">
            <button className="btn btn-primary">Yes</button>
            <button className="btn btn-primary">No</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
