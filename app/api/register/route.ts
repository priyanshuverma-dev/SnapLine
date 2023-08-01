import bcrypt from "bcrypt";

import prisma from "@/app/lib/prisma";
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

  const username = `${name.replace(/\s/g, "").toLowerCase()}-${nanoid(5)}`;

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      username,
    },
  });

  return NextResponse.json(user);
}
