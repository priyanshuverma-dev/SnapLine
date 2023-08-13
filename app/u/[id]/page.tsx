"use client";
import { User } from "@/utils/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BiEditAlt } from "react-icons/bi";
import useProfiles from "@/hooks/use-profile";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingModal from "@/components/LoadingView";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import useCurrentUser from "@/hooks/useCurrentUser";
import { toast } from "react-hot-toast";
import useUsersPrompts from "@/hooks/use-users-prompts";
import { Prompt } from "@/utils/prompt";
import PromptCard from "@/components/ProfilePromptCard";
import ProfileFeeds from "@/components/ProfileFeeds";
import { KeyedMutator } from "swr";

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams();

  const { data: currentUser, isLoading: isUser } = useCurrentUser();

  const [followLoading, setFollowLoading] = useState(false);

  const {
    data: profileData,
    isLoading,
    error,
    mutate,
  }: {
    data: User;
    isLoading: boolean;
    error: any;
    mutate: KeyedMutator<User>;
  } = useProfiles(params.id as string);

  if (isLoading || isUser) {
    return <LoadingModal />;
  }

  if (error) {
    console.log(error);
    return (
      <div>
        <span>User Not Found</span>
      </div>
    );
  }

  const handleCurrentUser = () => {
    if (currentUser?.id === profileData.id) {
      router.push("/settings/profile");
    }
  };

  const followUser = async () => {
    setFollowLoading(true);
    try {
      const res = await fetch(`/api/profiles/follow/${profileData.id}`, {
        // cache: "no-cache",
      });

      const isFollow = await res.json();

      if (res.status === 401) {
        toast.error("You must be logged in to follow someone");
        setFollowLoading(false);
        return;
      }

      if (isFollow === true) {
        mutate({
          ...profileData,
          followers: [...profileData.followers, currentUser?.id],
        });
        toast.success("Followed");
        console.log(isFollow);
        setFollowLoading(false);
      } else {
        toast.success("Unfollowed");
        mutate({
          ...profileData,
          followers: profileData.followers.filter(
            (id) => id !== currentUser?.id
          ),
        });
        console.log(isFollow);
        setFollowLoading(false);
      }
    } catch (err) {
      console.log(err);
      setFollowLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      <div>
        <div className="flex flex-row">
          <div className="flex flex-1">
            <div className="flex flex-col">
              <Avatar className="w-14 h-14 rounded-full mr-3 max-[321px]:w-8 max-[321px]:h-8 shadow">
                <AvatarImage src={profileData.image} />
                <AvatarFallback>{profileData.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="pt-2 flex flex-col">
              <div className="flex flex-row">
                <span className="max-[321px]:text-xs text-center  font-semibold dark:text-white text-neutral-950">
                  {profileData.name}
                </span>
                {profileData.role === "VERIFIED" && (
                  <BsFillPatchCheckFill className="ml-2 mt-2 max-[321px]:mt-0 max-[321px]:text-[10px] text-xs text-blue-500" />
                )}
              </div>
              <span className="max-[321px]:text-xs text-sm text-gray-500 hover:underline hover:cursor-pointer">
                @{profileData.username}
              </span>
            </div>
          </div>
          <div className="p-1 flex items-center justify-center">
            {currentUser?.id === profileData.id ? (
              <Button
                variant={"outline"}
                onClick={handleCurrentUser}
                className="max-[321px]:text-xs text-sm"
              >
                Edit
              </Button>
            ) : (
              <Button
                disabled={followLoading}
                onClick={followUser}
                size={"sm"}
                className="max-[321px]:text-xs text-sm "
                variant={
                  profileData.followers.includes(currentUser?.id)
                    ? "destructive"
                    : "outline"
                }
              >
                {profileData.followers.includes(currentUser?.id)
                  ? "Unfollow"
                  : "Follow"}
                {followLoading && "..."}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="pt-4 pb-4 ">
        <span className="text-center max-[321px]:text-xs text-gray-200">
          {profileData.bio}
        </span>
      </div>

      <Separator />

      <div className="flex flex-row">
        <div className="p-2">
          <span className="pr-2 font-semibold">
            {profileData.following.length}
          </span>
          <span className="text-neutral-200">Following</span>
        </div>
        <div className="py-1">
          <Separator orientation="vertical" />
        </div>
        <div className="p-2">
          <span className="pr-2 font-semibold">
            {profileData.followers.length}
          </span>
          <span className="text-neutral-200">Followers</span>
        </div>
      </div>

      <div>
        <ProfileFeeds isCurrentUser={currentUser?.id === profileData.id} />
      </div>
    </section>
  );
};

export default ProfilePage;
