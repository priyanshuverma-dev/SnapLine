import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { promptId: string } }
) {
  try {
    const promptId = params.promptId;
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
        status: "PUBLISHED",
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
