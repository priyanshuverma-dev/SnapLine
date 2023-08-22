"use client";

import { Prompt } from "@/utils/prompt";

import React from "react";
import PromptHeader from "./prompt-card/Header";
import PromptBody from "./prompt-card/Body";
import { User } from "@/utils/user";
import PromptInteraction from "./prompt-card/Interaction";
import { Card, CardContent } from "../ui/card";

const FeedCard = ({
  prompt,
  currentUser,
}: {
  prompt: Prompt;
  currentUser: User;
}) => {
  return (
    <Card className="dark:border-gray-800">
      <CardContent>
        <div key={prompt.id} className="pt-6">
          <div className="flex items-start">
            <div className="w-full">
              <PromptHeader
                image={prompt.user.image}
                name={prompt.user.name}
                username={prompt.user.username}
                role={prompt.user.role}
                title={prompt.title}
              />

              <PromptBody
                service={prompt.aiService.name}
                prompt={prompt.prompt}
                id={prompt.id}
                clicks={prompt.clicks}
              />

              <div>
                <PromptInteraction prompt={prompt} currentUser={currentUser} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedCard;
