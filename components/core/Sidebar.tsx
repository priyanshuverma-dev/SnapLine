"use client";

import React, { useMemo } from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { ModeToggle } from "./ThemeSwitch";
import { Separator } from "../ui/separator";
import UserButton from "../profile/UserButton";
import { borel } from "@/utils/utils";
import { useLogoutModal } from "@/hooks/modals/use-logout-modal";
import { BiLogOut } from "react-icons/bi";
import { useSession } from "next-auth/react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const logoutModal = useLogoutModal();

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

  // bg-white  border-gray-200  dark:bg-black dark:border-neutral-700
  //bg-white dark:bg-black
  const { status } = useSession();
  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-4 transition-transform  -translate-x-full sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  flex flex-col justify-between">
          <div className="">
            <ul className="space-y-2 font-medium ">
              <div className="p-1 flex justify-between">
                <span
                  className={`${borel.className} pl-2 pb-4 text-center self-center text-3xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white`}
                >
                  SnapLine
                </span>
                <ModeToggle onHeader={true} />
              </div>
              <Separator />
              {routes.map((item) => (
                <li key={item.label}>
                  <SidebarItem islabel={true} key={item.label} {...item} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <UserButton islabel={true} />
            </div>
            {status === "authenticated" && (
              <Button
                onClick={() => logoutModal.onOpen()}
                className="w-full"
                variant={"secondary"}
              >
                <BiLogOut size={25} className="pr-1" /> Logout
              </Button>
            )}
          </div>
        </div>
      </aside>
      <div className="sm:hidden block">
        <header className=" border-b border-gray-300 dark:border-neutral-700 flex items-center justify-between shadow-md">
          <div className="flex justify-between items-center px-4 py-2">
            <span
              className={`${borel.className} text-3xl text-black dark:text-white text-center`}
            >
              SnapLine
            </span>
          </div>
          <ModeToggle onHeader={true} />
        </header>
      </div>
      <div className="sm:ml-64 sm:mb-0 pb-[75px]">{children}</div>
      <div className="sm:hidden block">
        <nav className="flex justify-between fixed bottom-0 left-0 right-0 m-4  rounded-2xl px-1 py-1 backdrop-filter backdrop-blur-lg bg-opacity-40 border dark:border-neutral-700 shadow-md">
          {routes.map((item) => (
            <SidebarItem islabel={false} key={item.label} {...item} />
          ))}
          <UserButton islabel={false} isNav={true} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
