import prisma from "@/app/lib/prisma";
import serverAuth from "@/app/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, promptId } = body;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Not Authorized id",
        },
        { status: 401 }
      );
    }
    if (!promptId) {
      return NextResponse.json(
        {
          message: "Prompt Id not found",
        },
        { status: 400 }
      );
    }

    const prompts = await prisma.prompt.findUnique({
      where: {
        published: true,
        id: promptId,
      },
      include: {
        user: true,
      },
    });

    if (!prompts) {
      return NextResponse.json(
        {
          message: "Not Post Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(prompts);
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
