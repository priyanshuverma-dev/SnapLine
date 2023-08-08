import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const ais = await prisma.aIService.findMany({
      where: {
        status: "APPROVED" || "VERIFIED",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (ais.length === 0) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(
      ais.map((ai) => {
        return {
          id: ai.id,
          name: ai.name,
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
