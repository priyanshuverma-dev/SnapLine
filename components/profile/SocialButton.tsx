import React from "react";
import { IconBase } from "react-icons";
import { AiFillYoutube } from "react-icons/ai";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { Icons } from "../core/icons";
import { BiLinkAlt } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { useExternalLinkModal } from "@/hooks/modals/use-external-modal";

const SocialButton = ({ link }: { link: string }) => {
  const modal = useExternalLinkModal();

  return (
    <div className="flex p-1 flex-row">
      <Button
        variant={"link"}
        className=""
        size={"default"}
        onClick={() => {
          modal.setLink(link);
          modal.onOpen();
        }}
      >
        <BiLinkAlt size={15} className="text-primary-foreground" />
        <span className="text-xs pl-2 text-blue-400 underline hover:cursor-pointer">
          {link}
        </span>
      </Button>
    </div>
  );
};

export default SocialButton;
