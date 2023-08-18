"use client";

import React from "react";

import { Prompt } from "@/utils/prompt";
import usePrompt from "@/hooks/use-prompt";
import LoadingModal from "@/components/core/LoadingView";
import FeedCard from "@/components/feed/FeedCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/utils/user";

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

  const {
    data: currentUser,
    isLoading: isUserLoading,
  }: {
    data: User;
    isLoading: boolean;
  } = useCurrentUser();

  if (error?.response?.status === 404) {
    // no post found in style

    return (
      <div>
        <p className=" ">No Prompt Found</p>
      </div>
    );
  }

  if (isLoading || isUserLoading) {
    return <LoadingModal />;
  }

  return (
    <div>
      <FeedCard currentUser={currentUser} prompt={prompt} />
    </div>
  );
};

export default PromptPage;
