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

interface PromptBodyProps {
  service: string;
  prompt: string;
  id: string;
  clicks: number;
}
const copyToClipboard = async ({ text, id }: { text: string; id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/prompt/copy/${id}`
  );

  if (res.status !== 200) {
    toast.error("Error copying to clipboard");
    return;
  }

  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const PromptBody: FC<PromptBodyProps> = ({ prompt, service, id, clicks }) => {
  return (
    <div className="bg-gray-100 rounded-sm p-2 dark:bg-neutral-800 ">
      <div className="flex flex-1 justify-between">
        <div className="flex flex-row items-center justify-center font-semibold">
          {service}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HiCheckCircle className="ml-1 text-green-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Verified</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <button
          className="p-2 rounded-full transition-colors dark:hover:bg-neutral-700 hover:bg-gray-200 flex flex-row justify-center items-center"
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
      <p className="text-gray-800 md:text-md sm:text-sm font-mono dark:text-[#E7EAE9] ">
        {prompt}
      </p>
    </div>
  );
};

export default PromptBody;
