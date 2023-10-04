import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json(
        {
          message: "Slug not found",
        },
        { status: 400 }
      );
    }

    const trends = await prisma.trends.findUnique({
      where: {
        status: "PUBLISHED",
        slug: slug,
      },
      include: {
        user: true,
        prompts: true,
      },
    });

    if (!trends) {
      return NextResponse.json(
        {
          message: "Not Trends Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(trends);
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
