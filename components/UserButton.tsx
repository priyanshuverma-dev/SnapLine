import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";

const UserButton = () => {
  const { status } = useSession();
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100 bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-950  rounded-md mb-2">
      {status === "unauthenticated" ? (
        <Link
          href="/login"
          className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 mr-2 font-bold text-blue-400"
        >
          Login
        </Link>
      ) : null}
      {status === "authenticated" ? (
        <Link href={`/u/${currentUser?.username}`}>
          <div className="flex flex-row items-center  justify-between space-x-3">
            <Avatar>
              <AvatarImage src={currentUser?.image as string} />
              <AvatarFallback>{currentUser?.name.at(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium overflow-clip">
              {currentUser?.name}
            </span>
          </div>
        </Link>
      ) : null}

      {status === "loading" ? <p>Loading</p> : null}
    </div>
  );
};

export default UserButton;