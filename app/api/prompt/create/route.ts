import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        {
          message: "Body not found",
        },
        { status: 400 }
      );
    }

    const { title, description, service, prompt, media_ids } = body;

    if (!title || !service || !prompt) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    if (service == "NONE") {
      return NextResponse.json(
        {
          message: "recheck service",
        },
        { status: 400 }
      );
    }

    const services = await prisma.aIService.findUnique({
      where: {
        id: service,
        status: "APPROVED",
      },
    });

    if (!services) {
      return NextResponse.json(
        {
          message: "Service not found",
        },
        { status: 400 }
      );
    }

    const promptCreated = await prisma.prompt.create({
      data: {
        prompt,
        title,
        medias: {
          connect: media_ids.map((id: any) => ({
            id,
          })),
        },
        userId: currentUser.id,
        clicks: 0,
        description,
        service,
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
      { status: 201 }
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
