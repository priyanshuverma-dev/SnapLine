import React, { FC } from "react";
import { toast } from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

interface PromptBodyProps {
  service?: string;
  prompt: string;
}
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const PromptBody: FC<PromptBodyProps> = ({ prompt, service }) => {
  return (
    <div className="bg-gray-100 rounded-sm p-2 dark:bg-neutral-800 ">
      <div className="flex flex-1 justify-between">
        <p className="font-semibold">{service} Prompt:</p>
        <button
          className="p-2 rounded-full transition-colors hover:bg-neutral-700"
          onClick={() => copyToClipboard(prompt)}
        >
          <FiCopy />
        </button>
      </div>
      <p className="text-gray-800 md:text-md sm:text-sm font-mono dark:text-[#E7EAE9] ">
        {prompt}
      </p>
    </div>
  );
};

export default PromptBody;
