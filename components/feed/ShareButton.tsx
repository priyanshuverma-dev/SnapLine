"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { IoShareSocialOutline } from "react-icons/io5";

import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  RedditShareButton,
  RedditIcon,
} from "next-share";

const ShareButton = ({
  likeLoading,
  url,
  title,
}: {
  url: string;
  title: string;
  likeLoading: boolean;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          disabled={likeLoading}
          variant={"ghost"}
          className="w-full mt-2"
          size={"default"}
        >
          <IoShareSocialOutline className="text-xl" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dark:border-gray-800">
        <div className=" flex justify-between items-center">
          <EmailShareButton url={url} subject={"New AI Prompt"} body="body">
            <EmailIcon size={32} round />
          </EmailShareButton>
          <FacebookShareButton
            url={url}
            quote={title}
            hashtag={"#promptography"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={title} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <RedditShareButton url={url} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
