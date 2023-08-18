"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useExternalLinkModal } from "@/hooks/modals/use-external-modal";

import { Button } from "../ui/button";
import { AiOutlineLink } from "react-icons/ai";
import { redirect, useRouter } from "next/navigation";

function openInNewTab(url: string) {
  var win = window.open(url, "_blank");
  if (win != null) {
    win.focus();
  }
}

const ExternalLinkModal = () => {
  const modal = useExternalLinkModal();
  const { link } = modal;

  const router = useRouter();

  const handleButton = () => {
    modal.onClose();

    if (link) {
      openInNewTab(`/redirect/link?redirectUrl=${link}`);
    } else {
      return;
    }
  };

  return (
    <div className="outline-none">
      <Dialog
        open={modal.isOpen}
        onOpenChange={() => {
          modal.onClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px] dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>
              <div className="flex space-x-1 flex-row">
                <AiOutlineLink /> <span>External Redirect</span>
              </div>
            </DialogTitle>
            <DialogDescription>
              <span>Your Are Going to redirect:</span>
              <span className="px-1 text-blue-400 hover:underline cursor-pointer">
                {link}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* <h1 className="text-base text-center">Do you want to redirect.</h1> */}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleButton}>
              Redirect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExternalLinkModal;
