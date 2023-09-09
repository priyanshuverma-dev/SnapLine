"use client";

import ConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import EntryModal from "@/components/modals/EntryModal";
import ExternalLinkModal from "@/components/modals/ExternalLinkModal";
import LogoutConfirmationModal from "@/components/modals/LogoutConfirmationModal";
import React, { useEffect, useState } from "react";

const ModalContext = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ExternalLinkModal />
      <ConfirmationModal />
      <LogoutConfirmationModal />
      <EntryModal />
    </>
  );
};

export default ModalContext;
