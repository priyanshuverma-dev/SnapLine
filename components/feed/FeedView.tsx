"use client";

import React, { Suspense } from "react";
import FeedCard from "./FeedCard";
import { Prompt } from "@/utils/prompt";
import usePrompts from "@/hooks/use-prompt-list";
import Link from "next/link";
import { User } from "@/utils/user";
import useCurrentUser from "@/hooks/useCurrentUser";
// import Loading from "@/app/(site)/loading";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

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
    error: any;
  } = useCurrentUser();

  if (isLoading || isUserLoading) {
    return <FeedViewLoading />;
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
    <div className="grid grid-flow-row grid-cols-1 sm:m-2 sm:p-3 space-y-3 p-2">
      {data.map((prompt) => {
        return (
          <FeedCard currentUser={currentUser} key={prompt.id} prompt={prompt} />
        );
      })}
    </div>
  );
};

export default FeedView;

const FeedViewLoading = () => {
  const nums = ["1", "2", "3", "4", "5"];

  return (
    <div className="space-y-4">
      {nums.map((idx) => (
        <Card className="dark:border-gray-800">
          <CardContent>
            <div className="flex items-start p-4">
              <div className="w-full">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2 space-x-1 flex-row">
                    <div>
                      <Skeleton className="rounded-full w-10 h-10" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <Skeleton className=" w-[30vw] h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 ">
                    <Skeleton className="w-full h-20" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-row ">
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                  </div>
                  <div className="flex flex-row ">
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
