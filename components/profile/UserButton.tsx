import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const UserButton = ({
  islabel,
  isNav,
}: {
  islabel?: boolean;
  isNav?: boolean;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { status } = useSession();

  if (isNav) {
    return (
      <Link
        href={
          status === "unauthenticated"
            ? "/login"
            : `/u/${currentUser?.username}`
        }
        className={twMerge(`flex items-center p-2 rounded-lg group`)}
      >
        {status === "unauthenticated" && (
          <span className="scroll-m-20 text-xl font-semibold tracking-tight text-blue-400">
            Login
          </span>
        )}

        {status === "authenticated" && (
          <Avatar>
            <AvatarImage src={currentUser?.image as string} />
            <AvatarFallback>{currentUser?.name.at(0)}</AvatarFallback>
          </Avatar>
        )}
      </Link>
    );
  } else {
    return (
      <div className={islabel ? "" : "mr-2"}>
        <Link
          href={
            status === "unauthenticated"
              ? "/login"
              : `/u/${currentUser?.username}`
          }
        >
          <div
            className={twMerge(
              "flex items-center justify-between p-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 rounded-md mb-0",
              islabel && "bg-secondary mb-2",
              status === "unauthenticated" && "justify-center"
            )}
          >
            {status === "unauthenticated" && (
              <span className="scroll-m-20 text-xl font-semibold tracking-tight text-blue-400">
                Login
              </span>
            )}

            {status === "authenticated" && (
              <div className="flex flex-row items-center  justify-between space-x-3">
                <Avatar>
                  <AvatarImage src={currentUser?.image as string} />
                  <AvatarFallback>{currentUser?.name.at(0)}</AvatarFallback>
                </Avatar>
                {islabel ? (
                  <span className="font-medium overflow-clip">
                    {currentUser?.name}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }
};

export default UserButton;
