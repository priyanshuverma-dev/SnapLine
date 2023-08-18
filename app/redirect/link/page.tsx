"use client";
import Lottie from "react-lottie";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import animationData from "@/utils/lotties/redircting.json";
const ExternalRedirect = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("redirectUrl") : null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    if (searchQuery) {
      window.location.replace(searchQuery);
    }
  }, []);

  if (!searchQuery) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <span className="text-xl text-center">Redirecting...</span>
    </div>
  );
};

export default ExternalRedirect;
