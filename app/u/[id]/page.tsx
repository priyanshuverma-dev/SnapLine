"use client";
import { User } from "@/utils/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BiEditAlt } from "react-icons/bi";
import useProfiles from "@/hooks/use-profile";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingModal from "@/components/core/LoadingView";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import useCurrentUser from "@/hooks/useCurrentUser";
import { toast } from "react-hot-toast";
import ProfileFeeds from "@/components/profile/ProfileFeeds";
import { KeyedMutator } from "swr";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams();

  const {
    data: currentUser,
    isLoading: isUser,
  }: {
    data: User;
    isLoading: boolean;
  } = useCurrentUser();

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
        <span>Error in finding user. reload page</span>
      </div>
    );
  }

  const followUser = async () => {
    if (currentUser.username === "guest") {
      return toast.error("Please login to do this action");
    }
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
            (id: any) => id !== currentUser?.id
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

  if (!profileData) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-lg">User not found. try to check username</span>
      </div>
    );
  }

  return (
    <section>
      <div>
        <div className="flex flex-row">
          <div className="flex flex-1">
            <div className="flex flex-col">
              <Avatar className="w-14 h-14 rounded-full mr-3 max-[321px]:w-8 max-[321px]:h-8 shadow">
                <AvatarImage src={profileData.image} />
                <AvatarFallback>{profileData?.name?.at(0)}</AvatarFallback>
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
            {currentUser?.id === profileData.id &&
            currentUser.username === "guest" ? (
              <Link href="/settings/profile">
                <Button
                  variant={"outline"}
                  className="max-[321px]:text-xs text-sm"
                >
                  <BiEditAlt className="mr-2" /> Edit
                </Button>
              </Link>
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
        <span className="text-center max-[321px]:text-xs dark:text-gray-200 text-gray-900">
          {profileData.bio}
        </span>
      </div>

      <Separator />

      <div className="flex flex-row">
        <div className="p-2">
          <span className="pr-2 font-semibold dark:text-gray-200 text-gray-900">
            {profileData.following.length}
          </span>
          <span className="dark:text-gray-200 text-gray-900">Following</span>
        </div>
        <div className="py-1">
          <Separator orientation="vertical" />
        </div>
        <div className="p-2">
          <span className="pr-2 font-semibold dark:text-gray-200 text-gray-900">
            {profileData.followers.length}
          </span>
          <span className="dark:text-gray-200 text-gray-900">Followers</span>
        </div>
      </div>

      <div>
        <ProfileFeeds
          currentUser={currentUser}
          isCurrentUser={currentUser?.id === profileData.id}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
