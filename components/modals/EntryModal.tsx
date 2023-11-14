"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEntryModal } from "@/hooks/modals/use-entry-modal";
import Link from "next/link";

const EntryModal = () => {
  const modal = useEntryModal();

  return (
    <AlertDialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h1 className="text-2xl">Snapline v1.0.3-dev</h1>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-xl ">
              This website is in development and is developed by Priyanshu.
            </span>
            <p className="py-2 text-base">
              This website is developed using NextJS, TailwindCSS, and
              TypeScript as front-end technologies. In backend it uses mongodb,
              prisma, more. This project is preserved for 2025.
            </p>

            <p className="text-3xl">
              We are looking for developer to join our team. if you are one{" "}
              <Link className={"underline "} href="mailto:ceo@p7u.tech">
                click here
              </Link>
              .
            </p>

            <div className="flex space-y-2 flex-col items-start">
              <Link
                className={"hover:underline text-blue-500 pt-2"}
                target="_blank"
                href="https://github.com/priyanshuverma-dev/SnapLine"
              >
                Github Repository 😄
              </Link>
              <Link
                className={"hover:underline text-blue-500 "}
                href="https://github.com/priyanshuverma-dev/SnapLine/issues"
                target="_blank"
              >
                Github Issues 😮‍💨
              </Link>
              <Link
                className={"hover:underline text-blue-500 pb-1"}
                target="_blank"
                href="mailto:ceo@p7u.tech"
              >
                Contact (Email) 💭
              </Link>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EntryModal;
