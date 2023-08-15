"use client";

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
      <div className="p-4">{children}</div>
    </Sidebar>
  );
}
