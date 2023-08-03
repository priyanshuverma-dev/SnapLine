import prisma from "@/app/lib/prisma";
import serverAuth from "@/app/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const body = await request.json();
    // const { userId } = body;

    // if (!userId) {
    //   return NextResponse.json(
    //     {
    //       message: "Not Authorized id",
    //     },
    //     { status: 401 }
    //   );
    // }

    const prompts = await prisma.prompt.findMany({
      where: {
        published: true,
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
