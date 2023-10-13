import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    if (!userId) {
      return NextResponse.json(
        {
          message: "user Id not found",
        },
        { status: 400 }
      );
    }

    const prompts = await prisma.prompt.findMany({
      where: {
        status: "PUBLISHED",
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        prompt: true,
        createdAt: true,
        likes: true,
        medias: true,
        status: true,
        clicks: true,
        aiService: {
          select: {
            id: true,
            name: true,
            website: true,
            image: true,
          },
        },
        user: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
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
