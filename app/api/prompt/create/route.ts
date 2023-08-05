import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { services } from "@/utils/services";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        {
          message: "Body not found",
        },
        { status: 400 }
      );
    }

    const { title, description, userId, service, medias, prompt } = body;

    if (!title || !description || !userId || !service || !prompt) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    if (!services.includes(service)) {
      return NextResponse.json(
        {
          message: "Invalid service",
        },
        { status: 400 }
      );
    }

    const promptCreated = await prisma.prompt.create({
      data: {
        prompt,
        title,
        medias: medias || [],
        service,
        userId,
        clicks: 0,
        description,
        published: true,
      },
    });

    if (!promptCreated) {
      return NextResponse.json(
        {
          message: "Prompt not created",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Prompt created",
        prompt: promptCreated,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "Server error",
        error: err,
      },
      { status: 500 }
    );
  }
}
