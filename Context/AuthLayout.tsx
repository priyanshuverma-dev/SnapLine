"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthContextProps) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return <div>{children}</div>;
  }

  return (
    <Sidebar>
      {/* <Navbar logo="PrompAi" /> */}
      <div className="p-4 sm:ml-64 ">
        <Header />
        {children}
      </div>
    </Sidebar>
  );
}
