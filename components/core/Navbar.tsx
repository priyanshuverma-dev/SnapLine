"use client";
import React, { useMemo } from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import UserButton from "../profile/UserButton";
import { BiTrendingUp } from "react-icons/bi";
import { ModeToggle } from "./ThemeSwitch";
import { borel } from "@/utils/utils";

const Navbar = ({ children }: { children: React.ReactNode }) => {
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
        icon: BiTrendingUp,
        label: "Trends",
        href: "/trends",
        active: pathname === "/trends",
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
      {/* header  */}
      <header className="border-gray-300 dark:border-neutral-700 flex items-center justify-between shadow-md">
        <div className="flex justify-between items-center px-4 py-2">
          <span
            className={`${borel.className} text-3xl text-black dark:text-white text-center`}
          >
            SnapLine
          </span>
        </div>
        <ModeToggle onHeader={true} />
      </header>
      {/* body  */}
      <div className="pb-[75px]">{children}</div>
      {/* navbar  */}
      <div className="flex justify-center">
        <nav className="flex justify-center fixed bottom-0 m-4 rounded-2xl px-1 py-1 backdrop-filter backdrop-blur-lg bg-opacity-40 border dark:border-neutral-700 shadow-md">
          {routes.map((item) => (
            <SidebarItem islabel={false} key={item.label} {...item} />
          ))}
          <UserButton islabel={false} isNav={true} />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
