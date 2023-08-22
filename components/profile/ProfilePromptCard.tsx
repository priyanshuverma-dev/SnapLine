import React from "react";
import { useRouter } from "next/navigation";
import { Prompt } from "@/utils/prompt";

import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import { useConfirmationModal } from "@/hooks/use-cm-store";
import PromptInteraction from "../feed/prompt-card/Interaction";
import { User } from "@/utils/user";
import PromptBody from "../feed/prompt-card/Body";

const ProfilePromptCard = ({
  prompt,
  currentUser,
  isCurrentUser,
}: {
  prompt: Prompt;
  currentUser: User;
  isCurrentUser: boolean;
}) => {
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
              {currentUser.username === prompt.user.username && (
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
