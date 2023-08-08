"use client";

import { Prompt } from "@/utils/prompt";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { IoShareSocialOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-modal-store";
import PromptHeader from "./prompt-card/Header";
import PromptBody from "./prompt-card/Body";
import { AiTwotoneHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/utils/user";
import { nFormatter } from "@/utils/utils";
import ShareButton from "./ShareButton";

const FeedCard = ({ prompt }: { prompt: Prompt }) => {
  const router = useRouter();
  const modalStore = useStoreModal();
  const [likeLoading, setLikeLoading] = useState(false);

  const {
    data: currentUser,
    isLoading,
  }: {
    data: User;
    isLoading: boolean;
  } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const likePrompt = async () => {
    setLikeLoading(true);
    try {
      const res = await fetch(`/api/prompt/like/${prompt.id}`, {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const isLiked = await res.json();

      if (isLiked) {
        toast.success("Liked", {
          icon: "👍",
        });
      } else {
        toast.success("Disliked", {
          icon: "👎",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div key={prompt.id} className="bg-white rounded p-4 dark:bg-neutral-900">
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
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <Button
                  disabled={likeLoading}
                  variant={"ghost"}
                  className="w-full mt-2"
                  size={"default"}
                  onClick={likePrompt}
                >
                  <AiTwotoneHeart
                    className={`${
                      currentUser.likedPrompts.includes(prompt.id)
                        ? "text-red-500"
                        : ""
                    } text-xl`}
                  />
                  {likeLoading ? ".." : " "}
                  <span className="ml-1">
                    {nFormatter({ num: prompt.likes.length, digits: 1 })}
                  </span>
                </Button>
                <Button
                  disabled={likeLoading}
                  variant={"ghost"}
                  className="w-full mt-2"
                  size={"default"}
                  onClick={() => {
                    toast.success("Commented");
                  }}
                >
                  <FaRegCommentDots className="text-xl" />
                </Button>
                <ShareButton
                  title={`${prompt.title} - ${prompt.prompt}`}
                  url={`${process.env.NEXT_PUBLIC_URL}/prompt/${prompt.id}`}
                  likeLoading={likeLoading}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  disabled={likeLoading}
                  variant={"secondary"}
                  className="w-full mt-2"
                  size={"default"}
                  onClick={() => {
                    router.push(`/prompt/${prompt.id}`);
                    modalStore.onOpen();
                  }}
                  key={prompt.id}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
