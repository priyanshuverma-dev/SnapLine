"use client";

import React, { Suspense } from "react";
import FeedCard from "./FeedCard";
import { Prompt } from "@/Utils/prompt";
import usePromptsStore from "@/store/promptsStore";
import usePrompts from "@/hooks/use-prompt-list";
import PromptSkeletion from "./PromptSkeletion";

const FeedView = () => {
  // const usePromptStore = usePromptsStore();

  const {
    data,
    isLoading,
  }: {
    data: Prompt[];
    isLoading: boolean;
  } = usePrompts();

  if (isLoading) {
    return <PromptSkeletion />;
  }

  // usePromptStore.fetchPrompts(currentUser.id);

  // fetchPrompts().then((data) => usePrompts.setState({ prompt: data }));

  // const prompts = usePromptStore.prompt;

  // if (data === undefined) {
  //   return <p>No Post</p>;
  // }
  // if (data === "No Post") {
  //   return <p>No Post</p>;
  // }

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
