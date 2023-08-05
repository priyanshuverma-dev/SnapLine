import prisma from "@/app/lib/prisma";
import serverAuth from "@/app/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
