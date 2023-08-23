import { nFormatter } from "@/utils/utils";
import React, { FC } from "react";
import { toast } from "react-hot-toast";
import { HiCheckCircle } from "react-icons/hi";
import { FiCopy } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsFillPatchCheckFill } from "react-icons/bs";

interface PromptBodyProps {
  service: string;
  prompt: string;
  id: string;
  clicks: number;
  serviceName?: string;
}
const copyToClipboard = async ({ text, id }: { text: string; id: string }) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/prompt/copy/${id}`
  );

  if (res.status !== 200) {
    toast.error("Error in count update");
    return;
  }
};

const PromptBody: FC<PromptBodyProps> = ({
  serviceName,
  prompt,
  service,
  id,
  clicks,
}) => {
  return (
    <div className="bg-muted rounded-sm p-2">
      <div className="flex flex-1 justify-between">
        <div className="flex flex-row items-center justify-center font-semibold">
          <Avatar className="w-8 h-8">
            <AvatarImage alt={serviceName} src={service} />
            <AvatarFallback>{service.at(0)}</AvatarFallback>
          </Avatar>
          <BsFillPatchCheckFill className="rounded-full relative -left-3 -bottom-3 text-green-500" />
        </div>
        <button
          className="p-2 rounded-full transition-colors hover:bg-secondary-foreground/10 flex flex-row justify-center items-center"
          onClick={() =>
            copyToClipboard({
              id: id,
              text: prompt,
            })
          }
        >
          <FiCopy />
          <span className="pl-1">{nFormatter({ num: clicks, digits: 1 })}</span>
        </button>
      </div>
      <p className="text-gray-800 pt-2 md:text-md sm:text-sm font-mono dark:text-[#E7EAE9] ">
        {prompt}
      </p>
    </div>
  );
};

export default PromptBody;
