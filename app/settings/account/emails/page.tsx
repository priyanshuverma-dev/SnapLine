"use client";

import React from "react";
import animationData from "@/utils/lotties/dev.json";
import Lottie from "lottie-react";

const EmailsPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <div>
        <Lottie
          animationData={animationData}
          loop={true}
          height={400}
          width={400}
        />
      </div>
      <span className="text-xl text-center">
        We are working on this feature..
      </span>
    </div>
  );
};

export default EmailsPage;
