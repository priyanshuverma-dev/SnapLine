import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const type = query.get("type");

  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        published: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        user: true,
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
      return NextResponse.json(
        prompts.map((prompt) => {
          return {
            id: prompt.id,
            title: prompt.title,
            prompt: prompt.prompt,
            service: prompt.service,
            tags: prompt.tags,
            likes: prompt.likes,
            user: {
              id: prompt.user.id,
              name: prompt.user.name,
              image: prompt.user.image,
              username: prompt.user.username,
              role: prompt.user.role,
            },
          };
        })
      );
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
