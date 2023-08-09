import React, { FC, useState } from "react";
import ShareButton from "../ShareButton";
import { FaRegCommentDots } from "react-icons/fa";
import { Button } from "../ui/button";
import { AiTwotoneHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { nFormatter } from "@/utils/utils";
import { Prompt } from "@/utils/prompt";
import { User } from "@/utils/user";
import { useRouter } from "next/navigation";

interface PromptInteractionProps {
  prompt: Prompt;
  currentUser: User;
  isModal?: boolean;
}

const PromptInteraction: FC<PromptInteractionProps> = ({
  prompt,
  currentUser,
  isModal,
}) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const router = useRouter();

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
            }}
            key={prompt.id}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptInteraction;
