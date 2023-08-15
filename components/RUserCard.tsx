import { User } from "@/utils/user";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Link from "next/link";
import { Separator } from "./ui/separator";
import FollowButton from "./FollowButton";

const RUserCard = ({
  user,
  currentUser,
}: {
  user: User;
  currentUser: User;
}) => {
  if (currentUser.id === user.id) {
    return null;
  }

  return (
    <div
      id={user.id}
      className="p-2 hover:bg-neutral-900 transition-colors rounded-lg"
    >
      <div className="flex items-center space-x-1 flex-row">
        <div>
          <Avatar className="w-10 h-10 rounded-full mr-3 max-[321px]:w-6 max-[321px]:h-6 shadow">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex flex-row">
                <span className="font-bold text-gray-900 max-[321px]:text-xs text-clip dark:text-[#E7EAE9]">
                  {user.username}
                </span>
                {user.role === "VERIFIED" && (
                  <BsFillPatchCheckFill
                    size={12}
                    className="ml-1 mt-2 text-blue-500"
                  />
                )}
              </div>
            </div>

            <Link href={`/u/${user.username}`}>
              <span className="cursor-pointer hover:underline text-gray-600 max-[321px]:text-xs text-sm dark:text-[#71767C]">
                {user.name}
              </span>
            </Link>
          </div>
          <div>
            <FollowButton userData={user} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="mt-4" />
    </div>
  );
};

export default RUserCard;
