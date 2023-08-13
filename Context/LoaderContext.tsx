import React from "react";
import NextTopLoader from "nextjs-toploader";

const LoaderContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))" />
      {children}
    </>
  );
};

export default LoaderContext;
