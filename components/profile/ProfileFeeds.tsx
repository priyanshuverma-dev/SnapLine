"use client";

import React from "react";
import ProfilePromptCard from "./ProfilePromptCard";
import useUsersPrompts from "@/hooks/use-users-prompts";
import { Prompt } from "@/utils/prompt";
import { useParams } from "next/navigation";
import LoadingModal from "../core/LoadingView";
import useProfiles from "@/hooks/use-profile";
import { User } from "@/utils/user";

const ProfileFeeds = ({
  isCurrentUser,
  currentUser,
}: {
  isCurrentUser: boolean;
  currentUser: User;
}) => {
  const params = useParams();

  const {
    data: profileData,
    isLoading: isProfile,
    error: profileError,
  }: {
    data: User;
    isLoading: boolean;
    error: any;
  } = useProfiles(params.id as string);

  if (isProfile) {
    return <LoadingModal />;
  }

  const {
    data,
    isLoading,
    error,
  }: {
    data: Prompt[];
    isLoading: boolean;
    error: any;
  } = useUsersPrompts(profileData.id);

  if (isLoading) {
    return <LoadingModal />;
  }

  if (error) {
    console.log(error);
    return (
      <div>
        <span>Prompts Not Found</span>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 ">
      {data.map((prompt) => {
        return (
          <ProfilePromptCard
            key={prompt.id}
            prompt={prompt}
            currentUser={currentUser}
          />
        );
      })}

      {data.length === 0 && (
        <div className="flex justify-center items-center">
          <span className="text-gray-400">No Prompts Found</span>
        </div>
      )}
    </div>
  );
};

export default ProfileFeeds;
