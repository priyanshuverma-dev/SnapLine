"use client";

import React, { Suspense } from "react";

import { Prompt } from "@/utils/prompt";
import usePrompt from "@/hooks/use-prompt";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/utils/user";
import PromptHeader from "@/components/feed/prompt-card/Header";
import PromptBody from "@/components/feed/prompt-card/Body";
import PromptInteraction from "@/components/feed/prompt-card/Interaction";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { imageUrlCloudinary } from "@/lib/functions";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

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
    return <LoadingSkeleton />;
  }
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2,
      spacing: 2,
    },
  });
  return (
    <div>
      <div className="p-4 ">
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
                <div ref={ref} className="keen-slider">
                  {prompt.medias?.map((image, idx) => {
                    return (
                      <div className={`keen-slider__slide number-slide${idx}`}>
                        <Image
                          key={idx}
                          src={imageUrlCloudinary(image)}
                          alt={`${prompt.title} preview ${idx}`}
                          priority={idx === 0}
                          className="rounded-lg shadow-lg p-2 object-cover"
                          placeholder="empty"
                          height={300}
                          width={350}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <PromptInteraction
                isPage={true}
                prompt={prompt}
                currentUser={currentUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;

const LoadingSkeleton = () => {
  return (
    <div className="p-4 m-2">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <div className="p-2">
        <Skeleton className="h-10 w-[250px]" />
      </div>
      <Skeleton className="h-60 w-60 rounded-lg" />
      <div className="p-2 flex flex-row space-x-2">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
      </div>
    </div>
  );
};
