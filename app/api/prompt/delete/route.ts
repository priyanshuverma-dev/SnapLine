import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "You must be logged in to delete a prompt.",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await request.json();

    const prompt = await prisma.prompt.update({
      where: {
        userId: currentUser.id,
        id: id,
      },
      data: {
        status: "DELETED",
      },
    });

    return NextResponse.json(
      {
        prompt: prompt,
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
