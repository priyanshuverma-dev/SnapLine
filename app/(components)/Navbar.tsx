"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import Button from "./Button";
import Image from "next/image";

const Navbar = ({ logo }: { logo: ReactNode }) => {
  const { data, status } = useSession();

  return (
    <nav className="font-sans flex text-center sm:flex-row sm:text-left justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
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
          <Link href={"/profile"}>
            <Image
              alt={`${data.user?.name}'s image` ?? "user's image"}
              className="w-12 h-12 p-1 rounded-full  "
              src={data.user?.image as string}
              height={40}
              width={40}
            />
          </Link>
        ) : // <Button onClick={signOut}>Logout</Button>
        null}

        {status === "loading" ? <p>Loading</p> : null}
      </div>
    </nav>
  );
};

export default Navbar;
