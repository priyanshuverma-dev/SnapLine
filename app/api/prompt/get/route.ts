import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const type = query.get("type");

  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        prompt: true,
        clicks: true,
        likes: true,
        user: {
          select: {
            username: true,
            image: true,
            name: true,
            role: true,
          },
        },
        aiService: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    if (prompts.length === 0) {
      return NextResponse.json(
        {
          message: "Not Post Found",
        },
        { status: 404 }
      );
    }

    if (type === "full") {
      return NextResponse.json(prompts);
    } else {
      return NextResponse.json(prompts);
    }
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
