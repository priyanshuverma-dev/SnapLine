import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        {
          message: "id not found",
        },
        { status: 400 }
      );
    }

    const artificalIntelligences = await prisma.aIService.findUnique({
      where: {
        id: id,
      },
    });

    if (!artificalIntelligences) {
      return NextResponse.json(
        {
          message: "Not AI Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(artificalIntelligences);
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
