"use client";

import React, { useMemo } from "react";
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlinePlus,
} from "react-icons/ai";
import { useNavbarStore } from "@/hooks/use-nav-store";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { ModeToggle } from "./ThemeSwitch";
import { Separator } from "./ui/separator";
import UserButton from "./UserButton";

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
        label: "Explore",
        href: "/explore",
        active: pathname === "/explore",
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

  const nav = useNavbarStore();

  return (
    <div
      onClick={() => {
        if (nav.isOpen) {
          nav.onClose();
        }
      }}
    >
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-4 transition-transform ${
          nav.isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white  border-gray-200 sm:translate-x-0 dark:bg-black dark:border-neutral-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black flex flex-col justify-between">
          <div className="">
            <ul className="space-y-2 font-medium ">
              <span className="pl-2 pb-4 text-center self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                SnapLine
              </span>
              <Separator />
              {routes.map((item) => (
                <li key={item.label}>
                  <SidebarItem key={item.label} {...item} />
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div>
              <UserButton />
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
      <div className="sm:ml-64 bg-gray-50 dark:bg-black">{children}</div>
    </div>
  );
};

export default Sidebar;
