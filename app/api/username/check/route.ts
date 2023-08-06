import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { promptId: string } }
) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Not Logged In",
        },
        { status: 401 }
      );
    }

    if (currentUser.username.length <= 16) {
      return NextResponse.json(false, { status: 400 });
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
