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

    const {
      promptId,
      url,
      secure_url,
      public_id,
      format,
      width,
      height,
      resource_type,
      signature,
    } = body;

    if (
      !url ||
      !secure_url ||
      !public_id ||
      !format ||
      !width ||
      !height ||
      !resource_type ||
      !signature
    ) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    const media = await prisma.media.create({
      data: {
        promptId,
        url,
        secure_url,
        public_id,
        format,
        width,
        height,
        resource_type,
        signature,
      },
    });

    if (!media) {
      return NextResponse.json(
        {
          message: "Media not created",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Media created",
        media,
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
