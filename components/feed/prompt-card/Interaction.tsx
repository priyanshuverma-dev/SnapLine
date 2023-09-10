import React, { FC, useState } from "react";
import ShareButton from "../ShareButton";
import { FaRegCommentDots } from "react-icons/fa";
import { SiClickup } from "react-icons/si";
import { Button, buttonVariants } from "../../ui/button";
import { AiTwotoneHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { nFormatter } from "@/utils/utils";
import { Prompt } from "@/utils/prompt";
import { User } from "@/utils/user";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/base";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiExternalLink } from "react-icons/fi";
import { useExternalLinkModal } from "@/hooks/modals/use-external-modal";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PromptInteractionProps {
  prompt: Prompt;
  currentUser: User;
  isPage?: boolean;
}

const PromptInteraction: FC<PromptInteractionProps> = ({
  prompt,
  currentUser,
  isPage,
}) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(prompt.likes.length);
  const [isLiked, setIsLiked] = useState(
    currentUser?.likedPrompts.includes(prompt.id)
  );

  const modal = useExternalLinkModal();

  const likePrompt = async () => {
    if (currentUser.username === "guest" || currentUser.id === "guest") {
      return toast.error("Please login to do this action");
    }

    setLikeLoading(true);
    try {
      const res = await fetch(`/api/prompt/like/${prompt.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const isLiked = await res.json();

      if (isLiked) {
        setLikesCount((prevCount) => prevCount + 1);
        setIsLiked(true);
        toast.success("Liked", {
          icon: "👍",
        });
      } else {
        setLikesCount((prevCount) => prevCount - 1);
        setIsLiked(false);
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
              className={`${isLiked ? "text-red-500" : ""} text-xl`}
            />
            {likeLoading ? ".." : " "}
            <span className="ml-1">
              {nFormatter({ num: likesCount, digits: 1 })}
            </span>
          </Button>

          <ShareButton
            title={`${prompt.title} - ${prompt.prompt}`}
            url={`${API_URL}/prompt/${prompt.id}`}
            likeLoading={likeLoading}
          />
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={likeLoading}
                  variant={"link"}
                  className="w-full mt-2"
                  size={"default"}
                  onClick={() => {
                    modal.setLink(prompt.aiService.website);
                    modal.onOpen();
                  }}
                  key={prompt.id}
                >
                  <FiExternalLink />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vist Website</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {!isPage && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/prompt/${prompt.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full mt-2"
                    )}
                  >
                    {/* <Button
                      disabled={likeLoading}
                      variant={"outline"}
                      className="w-full mt-2"
                      size={"default"}
                      key={prompt.id}
                    > */}
                    <SiClickup />
                    {/* </Button> */}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Full view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptInteraction;
