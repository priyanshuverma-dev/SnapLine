import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const aiservices = await prisma.aIService.findMany({
      where: {
        status: "APPROVED",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (aiservices.length === 0) {
      return NextResponse.json({ message: "Nothing found" }, { status: 404 });
    }

    return NextResponse.json(aiservices);
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
