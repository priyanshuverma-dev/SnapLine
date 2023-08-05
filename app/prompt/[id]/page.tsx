"use client";

import React from "react";

import { Prompt } from "@/utils/prompt";
import usePrompt from "@/hooks/use-prompt";
import LoadingModal from "@/components/LoadingView";
import FeedCard from "@/components/FeedCard";

const PromptPage = ({
  params: { id: promptId },
}: {
  params: { id: string };
}) => {
  const {
    data: prompt,
    isLoading,
    error,
  }: {
    data: Prompt;
    isLoading: boolean;
    error: any;
  } = usePrompt(promptId);

  if (error?.response?.status === 404) {
    // no post found in style

    return (
      <div>
        <p className=" ">No Prompt Found</p>
      </div>
    );
  }

  return (
    <div>{isLoading ? <LoadingModal /> : <FeedCard prompt={prompt} />}</div>
  );
};

export default PromptPage;
