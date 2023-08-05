"use client";

import React from "react";
import FeedCard from "./FeedCard";
import { Prompt } from "@/Utils/prompt";
import usePrompts from "@/hooks/use-prompt-list";
import LoadingOverlay from "./LoadingOverlay";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

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
    return (
      <div className="bg-gray-100 rounded p-2 space-y-2 dark:bg-neutral-900">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>
    );
  }
  if (error) {
    console.log(error?.response);
    return (
      <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50 dark:bg-gray-950">
        <p>No Post Yet</p>
        <Link className="text-black underline" href={"/create-one"}>
          <p>Create One</p>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 ">
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
