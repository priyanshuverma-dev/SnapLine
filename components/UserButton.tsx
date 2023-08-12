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
    <Button variant={"outline"} size={"lg"}>
      <div>
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
            <div className="flex flex-row items-center justify-start space-x-3">
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
    </Button>
  );
};

export default UserButton;
