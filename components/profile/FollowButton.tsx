"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { User } from "@/utils/user";

interface FollowButtonProps {
  userData: User;
  currentUser: User;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  currentUser,
  userData,
}) => {
  const [followLoading, setFollowLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(
    userData.followers?.includes(currentUser.id) ? true : false
  );

  const followUser = async () => {
    setFollowLoading(true);
    try {
      const res = await fetch(`/api/profiles/follow/${userData.id}`);

      const isFollow = await res.json();

      if (res.status === 401) {
        toast.error("You must be logged in to follow someone");
        setFollowLoading(false);
        return;
      }

      if (isFollow === true) {
        toast.success("Followed");
        console.log(isFollow);
        setFollowLoading(false);
        setIsShowing(true);
      } else {
        toast.success("Unfollowed");

        console.log(isFollow);
        setFollowLoading(false);
      }
    } catch (err) {
      console.log(err);
      setFollowLoading(false);
      toast.error("Something went wrong");
    }
  };

  if (currentUser.id === userData.id) {
    return null;
  }

  return (
    <>
      {isShowing ? null : (
        <Button
          disabled={followLoading}
          onClick={followUser}
          size={"sm"}
          className="max-[321px]:text-xs text-sm "
          variant={"secondary"}
        >
          Follow
          {followLoading && "..."}
        </Button>
      )}
    </>
  );
};

export default FollowButton;
