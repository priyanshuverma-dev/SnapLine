import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const ais = await prisma.aIService.findMany({
      where: {
        status: "APPROVED",
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (ais.length === 0) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(ais);
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
