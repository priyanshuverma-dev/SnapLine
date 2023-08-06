import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const username = name.toLowerCase().replace(/\s/g, "");

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    // if (userExists) {
    //   return NextResponse.json(
    //     {
    //       error: "Username already exists",
    //     },
    //     { status: 401 }
    //   );
    // }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    if (err.meta.target === "User_email_key") {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
