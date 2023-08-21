import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "No User Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
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
