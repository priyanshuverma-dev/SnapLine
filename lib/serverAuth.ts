import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import prisma from "./prisma";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in", {
      cause: "No session",
    });
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in", {
      cause: "No user",
    });
  }

  return { currentUser };
};

export default serverAuth;
