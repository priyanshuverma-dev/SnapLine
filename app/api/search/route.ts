import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        {
          error: "No query provided",
        },
        {
          status: 400,
        }
      );
    }

    const prompts = await prisma.prompt.findMany({
      where: {
        OR: [
          {
            user: {
              name: {
                contains: query,
                mode: "insensitive",
              },
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            role: true,
            name: true,
            username: true,
            image: true,
          },
        },

        aiService: {
          select: {
            id: true,
            name: true,
            status: true,
            image: true,
            website: true,
          },
        },
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        role: true,
        name: true,
        username: true,
        image: true,
      },
    });

    const ai = await prisma.aIService.findMany({
      where: {
        OR: [
          {
            status: "APPROVED",
          },
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            website: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        status: true,
        image: true,
        website: true,
        description: true,
        price: true,
      },
    });

    return NextResponse.json(
      {
        prompts: prompts,
        users: users,
        ai: ai,
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
