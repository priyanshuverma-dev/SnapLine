"use client";

import React from "react";

import FeedCard from "@/app/(components)/FeedCard";
import { Prompt } from "@/Utils/prompt";
import usePrompt from "@/hooks/use-prompt";
import PromptSkeletionModal from "@/app/(components)/Modal";

const fetchPrompt = async ({
  userId,
  promptId,
}: {
  userId: string;
  promptId: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/prompt/byuid`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      promptId,
    }),
  });

  if (res.status == 200) {
    const rs: Prompt = await res.json();

    return rs;
  } else {
    return "No Post";
  }
};

const PromptPage = ({
  params: { id: promptId },
}: {
  params: { id: string };
}) => {
  const {
    data: prompt,
    isLoading,
  }: {
    data: Prompt;
    isLoading: boolean;
  } = usePrompt(promptId);

  return (
    <div>
      {isLoading ? <PromptSkeletionModal /> : <FeedCard prompt={prompt} />}
    </div>
  );
};

export default PromptPage;
