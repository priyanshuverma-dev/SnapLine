import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        {
          message: "Body not found",
        },
        { status: 400 }
      );
    }

    const { title, description, prompts, image, slug } = body;

    if (!title || !prompts || !image || !slug) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    const slugExists = await prisma.trends.findUnique({
      where: {
        slug,
      },
    });

    if (slugExists) {
      return NextResponse.json(
        {
          message: "Slug already exists",
        },
        { status: 400 }
      );
    }

    const trend = await prisma.trends.create({
      data: {
        title,
        description,
        promptsId: prompts,
        image,
        slug,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Trend created",
        trend,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "Server error",
        error: err,
      },
      { status: 500 }
    );
  }
}
