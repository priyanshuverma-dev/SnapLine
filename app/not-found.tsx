"use client";

import animation_404 from "@/utils/lotties/404.json";
import Lottie from "lottie-react";
import React from "react";

const NotFound = () => {
  const animationData = animation_404;

  return (
    <div className="flex justify-center items-center flex-col min-h-screen ">
      <div className="mb-8 ">
        <Lottie
          className="blur-sm"
          animationData={animationData}
          loop={true}
          height={400}
          width={400}
        />
      </div>
      <div className="p-8 text-white text-center rounded-lg shadow-lg">
        <p className="text-3xl font-bold mb-4">
          🚀 Oops, you've entered a galaxy far, far away – the land of lost
          links! 🌌
        </p>
        <p className="text-lg">
          Fear not, our digital explorers are on a mission to rescue you and
          bring you back to the digital realm.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
