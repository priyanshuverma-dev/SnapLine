"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useCurrentUser from "@/hooks/useCurrentUser";

const Navbar = ({ logo }: { logo: ReactNode }) => {
  const { status } = useSession();
  const { data: currentUser } = useCurrentUser();

  return (
    <nav className="font-sans flex text-center sm:flex-row sm:text-left justify-between py-4 px-6 bg-white shadow-lg sm:items-baseline w-full ">
      <div className="mb-2 sm:mb-0">
        <Link
          href="/"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-bold "
        >
          {logo}
        </Link>
      </div>
      <div>
        {status === "unauthenticated" ? (
          <Link
            href="/auth"
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 mr-2 font-bold text-blue-400"
          >
            Login
          </Link>
        ) : null}
        {status === "authenticated" ? (
          <Link href={`/${currentUser?.username}`}>
            <div>
              <Avatar>
                <AvatarImage src={currentUser?.image as string} />
                <AvatarFallback>{currentUser?.name.at(0)}</AvatarFallback>
              </Avatar>
            </div>
          </Link>
        ) : null}

        {status === "loading" ? <p>Loading</p> : null}
      </div>
    </nav>
  );
};

export default Navbar;
