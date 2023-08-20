import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-modal-store";
import { Prompt } from "@/utils/prompt";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { FiCopy } from "react-icons/fi";
import { Badge } from "../ui/badge";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useConfirmationModal } from "@/hooks/use-cm-store";
import PromptInteraction from "../feed/prompt-card/Interaction";
import { User } from "@/utils/user";
import PromptBody from "../feed/prompt-card/Body";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const deletePrompt = async (id: string) => {
  try {
    const res = await fetch(`/api/prompt/delete`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast.success("Prompt deleted");
    }
  } catch (error) {
    console.log(error);
  }
};

const ProfilePromptCard = ({
  prompt,
  currentUser,
}: {
  prompt: Prompt;
  currentUser: User;
}) => {
  const router = useRouter();
  const deleteModal = useConfirmationModal();

  return (
    <div>
      <div key={prompt.id} className="bg-white rounded p-4 dark:bg-neutral-900">
        <div className="flex items-start">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2  flex-row">
              <div className="space-x-1">
                <span>
                  {moment
                    .utc(prompt.createdAt)
                    .local()
                    .startOf("seconds")
                    .fromNow()}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{prompt.id}</span>
              </div>
              {!!currentUser && (
                <div
                  onClick={() => deleteModal.onOpen(prompt.id)}
                  className="rounded-full transition-colors hover:bg-neutral-700 p-2"
                >
                  <MdOutlineDeleteOutline className=" text-red-500 hover:cursor-pointer " />
                </div>
              )}
            </div>
            <div className="bg-gray-100 rounded-sm p-2 dark:bg-neutral-800 ">
              <PromptBody
                clicks={prompt.clicks}
                prompt={prompt.prompt}
                service={prompt.aiService.name}
                id={prompt.id}
              />
              {/* <div className="flex flex-1 justify-between">
                <p className="font-semibold">Prompt:</p>
                <button
                  className="p-2 rounded-full transition-colors hover:bg-neutral-700"
                  onClick={() => copyToClipboard(prompt.prompt)}
                >
                  <FiCopy />
                </button> */}
              {/* </div> */}
              {/* <p className="text-gray-800 md:text-md sm:text-sm font-mono dark:text-[#E7EAE9] ">
                {prompt.prompt}
              </p> */}
            </div>

            <div>
              <PromptInteraction
                prompt={prompt}
                currentUser={currentUser}
                isPage={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePromptCard;
