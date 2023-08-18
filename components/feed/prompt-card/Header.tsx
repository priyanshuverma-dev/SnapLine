import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Link from "next/link";

interface PromptHeaderProps {
  image: string;
  name: string;
  username: string;
  role: string;
  title: string;
}

const PromptHeader: FC<PromptHeaderProps> = ({
  image,
  name,
  role,
  username,
  title,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2 space-x-1 flex-row">
        <div>
          <Avatar className="w-10 h-10 rounded-full mr-3 max-[321px]:w-6 max-[321px]:h-6 shadow">
            <AvatarImage src={image} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <span className="font-bold text-gray-900 max-[321px]:text-xs text-clip dark:text-[#E7EAE9]">
              {name}
            </span>
            {role === "VERIFIED" && (
              <BsFillPatchCheckFill className="ml-1 text-blue-500" />
            )}
          </div>

          <Link href={`/u/${username}`}>
            <span className="cursor-pointer hover:underline text-gray-600 max-[321px]:text-xs dark:text-[#71767C]">
              @{username}
            </span>
          </Link>
        </div>
      </div>
      <span className="p-2 font-normal">{title}</span>
    </div>
  );
};

export default PromptHeader;
