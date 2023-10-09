"use client";

import LoadingModal from "@/components/core/LoadingView";
import AiModelCard from "@/components/search/AiModelCard";
import useAI from "@/hooks/use-ai";
import { AIService } from "@/utils/ai-service";
import React from "react";

const AIOnePage = ({
  params: { name: name },
}: {
  params: { name: string };
}) => {
  const {
    data: ai,
    error,
    isLoading,
  }: {
    data: AIService;
    error: any;
    isLoading: boolean;
  } = useAI(name);

  if (error) {
    return <p>Something is wrong see this: {error.message}</p>;
  }
  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div>
      {name}
      <AiModelCard ai={ai} />
    </div>
  );
};

export default AIOnePage;
