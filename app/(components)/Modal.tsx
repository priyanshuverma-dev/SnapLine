import React from "react";
import LoadingOverlay from "./LoadingOverlay";

const LoaingModal = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="w-12 h-12">
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default LoaingModal;
