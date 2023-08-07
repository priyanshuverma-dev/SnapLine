import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";

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

    const { name, description, price, website, aiType, userId } = body;

    if (!name || !description || !price || !website || !aiType || !userId) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    const serviceExists = await prisma.aIService.findUnique({
      where: {
        name,
      },
    });

    if (serviceExists) {
      return NextResponse.json(
        {
          message: "Service already exists",
        },
        { status: 400 }
      );
    }

    const service = await prisma.aIService.create({
      data: {
        name,
        description,
        price,
        website,
        aiType,
        status: "PENDING",
        registeredBy: userId,
      },
    });

    return NextResponse.json(
      {
        message: "Service created",
        service,
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
