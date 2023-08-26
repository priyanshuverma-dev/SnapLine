import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const ais = await prisma.prompt.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        id: true,
        title: true,
        aiService: {
          select: {
            name: true,
            image: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (ais.length === 0) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(
      ais.map((ai) => {
        return {
          id: ai.id,
          title: ai.title,
          aiService: ai.aiService.name,
          image: ai.aiService.image,
          user: ai.user.name,
          userImage: ai.user.image,
        };
      })
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
