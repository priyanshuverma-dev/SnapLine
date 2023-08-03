"use client";

import { Prompt } from "@/Utils/prompt";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import React from "react";
import { toast } from "react-hot-toast";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import PromptSkeletion from "./PromptSkeletion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-modal-store";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const FeedCard = ({ prompt }: { prompt: Prompt }) => {
  const router = useRouter();
  const modalStore = useStoreModal();

  return (
    <div key={prompt.id} className="bg-white rounded p-2">
      <div className="flex items-start">
        <div className="">
          <div className="flex items-center mb-2 space-x-1">
            <Avatar className="w-10 h-10 rounded-full mr-3 max-[321px]:w-6 max-[321px]:h-6 ">
              <AvatarImage src={prompt.user.image} />
              <AvatarFallback>{prompt.user.name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-gray-900 max-[321px]:text-xs text-clip">
              {prompt.user.name}
            </h3>
            <BsFillPatchCheckFill className="text-blue-500" />

            <span className="ml-2 text-gray-600 max-[321px]:text-xs">
              @{prompt.user.username}
            </span>
          </div>
          <div className="bg-gray-100 rounded p-2">
            <div className="flex flex-1 justify-between">
              <p className="font-semibold">{prompt.service} Prompt:</p>
              <button
                className="p-2"
                onClick={() => copyToClipboard(prompt.text)}
              >
                <FiCopy />
              </button>
            </div>
            <p className="text-gray-800 md:text-md sm:text-sm font-mono">
              {prompt.text}
            </p>
          </div>
          {prompt.tags.map((tag) => {
            return (
              <Badge key={tag} variant={"outline"} className="m-2">
                {tag}
              </Badge>
            );
          })}
          <div>
            <Button
              variant={"outline"}
              className="w-full"
              size={"sm"}
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
  );
};

export default FeedCard;
