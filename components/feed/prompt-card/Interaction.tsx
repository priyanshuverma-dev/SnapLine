import React, { FC, useState } from "react";
import ShareButton from "../ShareButton";
import { FaRegCommentDots } from "react-icons/fa";
import { SiClickup } from "react-icons/si";
import { Button } from "../../ui/button";
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

// const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline:
//           "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-8",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

interface PromptInteractionProps {
  prompt: Prompt;
  currentUser: User;
}

const PromptInteraction: FC<PromptInteractionProps> = ({
  prompt,
  currentUser,
}) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const router = useRouter();
  const [likesCount, setLikesCount] = useState(prompt.likes.length);
  const [isLiked, setIsLiked] = useState(
    currentUser.likedPrompts.includes(prompt.id)
  );

  const modal = useExternalLinkModal();

  const likePrompt = async () => {
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={likeLoading}
                  variant={"outline"}
                  className="w-full mt-2"
                  size={"default"}
                  // onClick={() => {
                  //   router.push(`/prompt/${prompt.id}`);
                  // }}
                  key={prompt.id}
                >
                  <Link href={`/prompt/${prompt.id}`}>
                    <SiClickup />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Full view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default PromptInteraction;
