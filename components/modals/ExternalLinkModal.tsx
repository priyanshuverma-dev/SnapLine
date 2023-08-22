"use client";

import React from "react";

import { useExternalLinkModal } from "@/hooks/modals/use-external-modal";

import { AiOutlineLink } from "react-icons/ai";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    <AlertDialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
      }}
    >
      <AlertDialogContent className=" dark:border-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex space-x-1 flex-row">
              <AiOutlineLink /> <span>External Redirect</span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>Your Are Going To Redirect:</span>
            <span className="px-1 text-blue-400 hover:underline cursor-pointer">
              {link}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit" onClick={handleButton}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExternalLinkModal;
