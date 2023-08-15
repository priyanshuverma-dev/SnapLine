import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        role: true,
        name: true,
        username: true,
        image: true,
        followers: true,
      },
      where: {
        role: {
          not: "BANNED" || "DELETED",
        },
      },
    });

    if (!users)
      return NextResponse.json(
        {
          error: "No users found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(
      {
        users: users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 501,
      }
    );
  }
}
