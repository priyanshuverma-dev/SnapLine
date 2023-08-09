"use client";

import React from "react";
import PromptHeader from "./prompt-card/Header";
import { Prompt } from "@/utils/prompt";
import PromptBody from "./prompt-card/Body";
import PromptInteraction from "./prompt-card/Interaction";
import { User } from "@/utils/user";

const ModalPromptCard = ({
  prompt,
  currentUser,
}: {
  prompt: Prompt;
  currentUser: User;
}) => {
  return (
    <div>
      <PromptHeader
        image={prompt.user.image}
        name={prompt.user.name}
        title={prompt.title}
        role={prompt.user.role}
        username={prompt.user.username}
        key={prompt.id}
      />
      <PromptBody
        prompt={prompt.prompt}
        service={prompt.aiService.name}
        id={prompt.id}
        clicks={prompt.clicks}
      />
      <div>
        <div className="p-2">
          <span className="font-bold text-neutral-600">Description:</span>
          <p>{prompt.description}</p>
        </div>
      </div>

      <div>
        {prompt.images?.map((image) => (
          <img src={image} alt="prompt image" className="w-full" />
        ))}
      </div>
      <div>
        <PromptInteraction
          prompt={prompt}
          isModal={true}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default ModalPromptCard;
