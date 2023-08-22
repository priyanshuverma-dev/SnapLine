import React from "react";
import { useRouter } from "next/navigation";
import { Prompt } from "@/utils/prompt";

import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import { useConfirmationModal } from "@/hooks/use-cm-store";
import PromptInteraction from "../feed/prompt-card/Interaction";
import { User } from "@/utils/user";
import PromptBody from "../feed/prompt-card/Body";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

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
    <Card className="dark:border-gray-800">
      <CardHeader>
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
      </CardHeader>
      <CardContent>
        <div key={prompt.id}>
          <div className="flex items-start">
            <div className="w-full">
              <PromptBody
                clicks={prompt.clicks}
                prompt={prompt.prompt}
                service={prompt.aiService.name}
                id={prompt.id}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PromptInteraction
          prompt={prompt}
          currentUser={currentUser}
          isPage={false}
        />
      </CardFooter>
    </Card>
  );
};

export default ProfilePromptCard;
