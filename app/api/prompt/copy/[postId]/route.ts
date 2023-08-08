import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const promptId = params.postId;

    const promptIwantToLike = await prisma.prompt.findUnique({
      where: {
        id: promptId,
      },
    });

    if (!promptIwantToLike) {
      return NextResponse.json(
        {
          message: "Prompt not found",
        },
        { status: 404 }
      );
    }

    const copy = await prisma.prompt.update({
      where: {
        id: promptId,
      },
      data: {
        clicks: promptIwantToLike.clicks + 1,
      },
    });

    return NextResponse.json(
      {
        message: "Copy created",
        copy: copy,
      },
      { status: 200 }
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
