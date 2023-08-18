"use client";

import React, { useMemo } from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useNavbarStore } from "@/hooks/use-nav-store";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { ModeToggle } from "./ThemeSwitch";
import { Separator } from "../ui/separator";
import UserButton from "../profile/UserButton";
import { borel } from "@/utils/utils";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return <div>{children}</div>;
  }

  const routes = useMemo(
    () => [
      {
        icon: AiOutlineHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: AiOutlineSearch,
        label: "Find Out",
        href: "/search",
        active: pathname === "/search",
      },
      {
        icon: AiOutlinePlus,
        label: "Create",
        href: "/create-one",
        active: pathname === "/create-one",
      },
    ],
    [pathname]
  );

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-4 transition-transform  -translate-x-full bg-white  border-gray-200 sm:translate-x-0 dark:bg-black dark:border-neutral-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black flex flex-col justify-between">
          <div className="">
            <ul className="space-y-2 font-medium ">
              <span
                className={`${borel.className} pl-2 pb-4 text-center self-center text-3xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white`}
              >
                SnapLine
              </span>
              <Separator />
              {routes.map((item) => (
                <li key={item.label}>
                  <SidebarItem islabel={true} key={item.label} {...item} />
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div>
              <UserButton islabel={true} />
            </div>
            <Button
              onClick={() => signOut()}
              className="w-full"
              variant={"secondary"}
            >
              Logout
            </Button>
            <div className="p-1">
              <ModeToggle />
            </div>
          </div>
        </div>
      </aside>
      <div className="sm:hidden block">
        <header className="bg-white border-b border-gray-300 flex items-center justify-center shadow-md dark:bg-black dark:border-neutral-700">
          <div className="flex justify-between items-center px-4 py-2">
            <span
              className={`${borel.className} text-3xl text-black dark:text-white text-center`}
            >
              SnapLine
            </span>
          </div>
        </header>
      </div>
      <div className="sm:ml-64 bg-gray-50 dark:bg-black sm:mb-0 pb-[75px]">
        {children}
      </div>
      <div className="sm:hidden block">
        <nav className="fixed bottom-0 left-0 w-full bg-neutral-700 border-t dark:bg-black border-neutral-700 shadow-md flex justify-between px-1 py-2">
          {routes.map((item) => (
            <SidebarItem islabel={false} key={item.label} {...item} />
          ))}
          <UserButton islabel={false} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
