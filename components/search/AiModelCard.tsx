"use client";
import { AIService } from "@/utils/ai-service";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FiExternalLink } from "react-icons/fi";
import { useExternalLinkModal } from "@/hooks/modals/use-external-modal";
import Link from "next/link";

const AiModelCard = ({ ai }: { ai: AIService }) => {
  return (
    <Link href={`/ai/${ai.name.replaceAll(" ", "-").toLowerCase()}`}>
      <Card className="m-4 hover:bg-primary-foreground transition-colors">
        <CardContent>
          <div className="w-[250px] h-[400px] p-4 flex items-center flex-col justify-center">
            <div>
              <Image
                src={ai.image}
                width={"128"}
                height={"128"}
                alt={`${ai.name}'s image`}
                className="w-32 h-32 rounded m-2"
              />
            </div>
            <div className="flex flex-row items-center p-4">
              <span className="font-mono text-xl text-center pr-1">
                {ai.name}
              </span>
              <BsFillPatchCheckFill className="rounded-full text-green-500" />
            </div>
            <span className="text-xs font-semibold text-primary">
              {ai.description.substring(0, 100)}..
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <span
              className={cn(
                ai.price == null ? "text-green-400" : "text-red-400",
                "w-full"
              )}
            >
              Price: {ai.price == null ? "Free" : `$${ai.price}`}
            </span>
            <FiExternalLink />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AiModelCard;
