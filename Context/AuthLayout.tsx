"use client";

import Navbar from "@/components/core/Navbar";
import Sidebar from "@/components/core/Sidebar";
import { usePathname } from "next/navigation";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthContextProps) {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/redirect/link"
  ) {
    return <div>{children}</div>;
  }

  return (
    // <Sidebar>
    <Navbar>
      <div
        className="flex justify-center items-center flex-col 
      max-w-[60rem] w-full h-full mx-auto px-4"
      >
        {children}
      </div>
    </Navbar>
    // </Sidebar>
  );
}
