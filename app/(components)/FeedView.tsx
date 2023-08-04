"use client";

import React from "react";
import FeedCard from "./FeedCard";
import { Prompt } from "@/Utils/prompt";
import usePrompts from "@/hooks/use-prompt-list";
import LoadingOverlay from "./LoadingOverlay";
import Link from "next/link";

const FeedView = () => {
  const {
    data,
    isLoading,
    error,
  }: {
    data: Prompt[];
    isLoading: boolean;
    error: any;
  } = usePrompts();

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }
  if (error.response.status === 404) {
    return (
      <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50 ">
        <p>No Post Yet</p>
        <Link className="text-black underline" href={"/create-one"}>
          <p>Create One</p>
        </Link>
      </div>
    );
  } else {
    console.log(error.response);
    return (
      <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50 ">
        <p>Error in Load:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50 ">
      {data.map((prompt) => {
        return (
          <FeedCard key={prompt.id} prompt={prompt} />

          // <Link id={prompt.id} href={`prompt/${prompt.id}`}>
          // </Link>
        );
      })}
    </div>
  );
};

export default FeedView;
