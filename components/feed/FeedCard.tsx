"use client";

import { Prompt } from "@/utils/prompt";

import React from "react";
import PromptHeader from "./prompt-card/Header";
import PromptBody from "./prompt-card/Body";
import { User } from "@/utils/user";
import PromptInteraction from "./prompt-card/Interaction";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const FeedCard = ({
  prompt,
  currentUser,
}: {
  prompt: Prompt;
  currentUser: User;
}) => {
  return (
    <Card className="border-none">
      <div key={prompt.id}>
        <div className="flex items-start">
          <div className="w-full">
            <CardHeader>
              <PromptHeader
                image={prompt.user.image}
                name={prompt.user.name}
                username={prompt.user.username}
                role={prompt.user.role}
                title={prompt.title}
              />
            </CardHeader>
            <CardContent>
              <PromptBody
                serviceName={prompt.aiService.name}
                service={prompt.aiService.image}
                prompt={prompt.prompt}
                id={prompt.id}
                clicks={prompt.clicks}
              />
            </CardContent>
            <CardFooter>
              <div>
                <PromptInteraction prompt={prompt} currentUser={currentUser} />
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeedCard;
