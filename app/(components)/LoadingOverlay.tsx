// components/LoadingOverlay.js

import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null; // If not loading, return null to render nothing
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50"
      style={{ pointerEvents: "none" }}
    >
      <ClipLoader size={40} color="#0284c7" />
    </div>
  );
};

export default LoadingOverlay;
