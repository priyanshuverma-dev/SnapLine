"use client";

import React from "react";

import { Prompt } from "@/utils/prompt";
import usePrompt from "@/hooks/use-prompt";
import LoadingModal from "@/components/core/LoadingView";
import FeedCard from "@/components/feed/FeedCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/utils/user";
import PromptHeader from "@/components/feed/prompt-card/Header";
import PromptBody from "@/components/feed/prompt-card/Body";
import PromptInteraction from "@/components/feed/prompt-card/Interaction";
import Image from "next/image";

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
      <div key={prompt.id} className="p-4 ">
        <div className="flex items-start">
          <div className="w-full">
            <PromptHeader
              image={prompt.user.image}
              name={prompt.user.name}
              username={prompt.user.username}
              role={prompt.user.role}
              title={prompt.title}
            />

            <PromptBody
              service={prompt.aiService.name}
              prompt={prompt.prompt}
              id={prompt.id}
              clicks={prompt.clicks}
            />

            <div>
              <div className="py-4 flex-col">
                <span className="font-semibold text-neutral-600 text-lg">
                  Description:{" "}
                </span>
                <span className="text-base font-sans text-gray-50 ">
                  {prompt?.description}
                </span>
                <div>
                  {prompt.images?.map((image) => {
                    return (
                      <Image
                        alt={prompt.title}
                        src={image}
                        width={256}
                        height={256}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <PromptInteraction prompt={prompt} currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
