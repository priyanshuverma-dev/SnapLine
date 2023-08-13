"use client";

import React from "react";
import FeedCard from "./FeedCard";
import { Prompt } from "@/utils/prompt";
import usePrompts from "@/hooks/use-prompt-list";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/utils/user";
import useCurrentUser from "@/hooks/useCurrentUser";
import { KeyedMutator } from "swr";

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

  const {
    data: currentUser,
    isLoading: isUserLoading,
  }: {
    data: User;
    isLoading: boolean;
  } = useCurrentUser();

  if (isLoading || isUserLoading) {
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
      <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50 dark:bg-black">
        <p>No Post Yet</p>
        <Link
          className="text-black dark:text-white underline"
          href={"/create-one"}
        >
          <p>Create One</p>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 ">
      {data.map((prompt) => {
        return (
          <FeedCard currentUser={currentUser} key={prompt.id} prompt={prompt} />
        );
      })}
    </div>
  );
};

export default FeedView;
