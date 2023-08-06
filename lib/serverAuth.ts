import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { signOut } from "next-auth/react";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    signOut({ callbackUrl: "/" });
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    signOut({ callbackUrl: "/" });

    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
