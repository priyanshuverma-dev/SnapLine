"use client";

import { Prompt } from "@/utils/prompt";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import React from "react";
import { toast } from "react-hot-toast";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-modal-store";
import Link from "next/link";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const FeedCard = ({ prompt }: { prompt: Prompt }) => {
  const router = useRouter();
  const modalStore = useStoreModal();

  return (
    <div key={prompt.id} className="bg-white rounded p-4 dark:bg-neutral-900">
      <div className="flex items-start">
        <div className="w-full">
          <div className="flex items-center mb-2 space-x-1 flex-row">
            <div>
              <Avatar className="w-10 h-10 rounded-full mr-3 max-[321px]:w-6 max-[321px]:h-6 shadow">
                <AvatarImage src={prompt.user.image} />
                <AvatarFallback>{prompt.user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <span className="font-bold text-gray-900 max-[321px]:text-xs text-clip dark:text-[#E7EAE9]">
                  {prompt.user.name}
                </span>
                {prompt.user.role === "VERIFIED" && (
                  <BsFillPatchCheckFill className="ml-1 text-blue-500" />
                )}
              </div>

              <Link href={`/u/${prompt.user.username}`}>
                <span className="cursor-pointer hover:underline text-gray-600 max-[321px]:text-xs dark:text-[#71767C]">
                  @{prompt.user.username}
                </span>
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-sm p-2 dark:bg-neutral-800 ">
            <div className="flex flex-1 justify-between">
              <p className="font-semibold">{prompt.service} Prompt:</p>
              <button
                className="p-2 rounded-full transition-colors hover:bg-neutral-700"
                onClick={() => copyToClipboard(prompt.prompt)}
              >
                <FiCopy />
              </button>
            </div>
            <p className="text-gray-800 md:text-md sm:text-sm font-mono dark:text-[#E7EAE9] ">
              {prompt.prompt}
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
              className="w-full mt-2"
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
