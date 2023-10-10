"use client";

import LoadingModal from "@/components/core/LoadingView";
import AiModelCard from "@/components/search/AiModelCard";
import useAIList from "@/hooks/use-ai-list";
import { AIService } from "@/utils/ai-service";
import React from "react";

const AIExplore = () => {
  const {
    data: ais,
    error,
    isLoading,
  }: {
    data: AIService[];
    error: any;
    isLoading: boolean;
  } = useAIList();

  if (error) {
    return <p>Something is wrong see this: {error.message}</p>;
  }
  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex flex-row flex-wrap">
      {ais.map((ai) => {
        return <AiModelCard ai={ai} />;
      })}
    </div>
  );
};

export default AIExplore;
