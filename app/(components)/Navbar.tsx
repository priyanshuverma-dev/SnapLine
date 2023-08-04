"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useNavbarStore } from "@/hooks/use-nav-store";
import { usePathname } from "next/navigation";

const Navbar = ({ logo }: { logo: ReactNode }) => {
  const route = usePathname();

  if (route === "/auth") {
    return null;
  }

  const { status } = useSession();
  const { data: currentUser } = useCurrentUser();

  const nav = useNavbarStore();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => (nav.isOpen ? nav.onClose() : nav.onOpen())}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 outline-none focus:outline-none"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>

            <span className="pl-2 text-center self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              Prompt.Ai
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
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
                        <AvatarFallback>
                          {currentUser?.name.at(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </Link>
                ) : null}

                {status === "loading" ? <p>Loading</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // return (
  //   <nav className="font-sans flex text-center sm:flex-row sm:text-left justify-between py-4 px-6 bg-white shadow-lg sm:items-baseline w-full ">
  //     <div className="mb-2 sm:mb-0">
  //       <Link
  //         href="/"
  //         className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-bold "
  //       >
  //         {logo}
  //       </Link>
  //     </div>
  //     <div>
  //       {status === "unauthenticated" ? (
  //         <Link
  //           href="/auth"
  //           className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 mr-2 font-bold text-blue-400"
  //         >
  //           Login
  //         </Link>
  //       ) : null}
  //       {status === "authenticated" ? (
  //         <Link href={`/${currentUser?.username}`}>
  //           <div>
  //             <Avatar>
  //               <AvatarImage src={currentUser?.image as string} />
  //               <AvatarFallback>{currentUser?.name.at(0)}</AvatarFallback>
  //             </Avatar>
  //           </div>
  //         </Link>
  //       ) : null}

  //       {status === "loading" ? <p>Loading</p> : null}
  //     </div>
  //   </nav>
  // );
};

export default Navbar;
