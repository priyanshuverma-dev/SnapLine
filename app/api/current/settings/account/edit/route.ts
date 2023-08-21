import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { username, name, bio, email, social, avatar } = body;

    if (!body) {
      return NextResponse.json(
        {
          message: "Body not found",
        },
        { status: 400 }
      );
    }

    if (!email || !username || !name || !bio || !social || !avatar) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    const { currentUser } = await serverAuth();

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!currentUser || !user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const currentDate = new Date();
    const lastUpdateDate = user.lastUsernameUpdate || new Date(0);
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    const isUsernameChanged = user.username === username;

    if (!isUsernameChanged) {
      if (
        currentDate.getTime() - lastUpdateDate.getTime() <
        sevenDaysInMilliseconds
      ) {
        return NextResponse.json(
          { message: "Username update is only allowed once every 7 days" },
          {
            status: 403,
          }
        );
      }
    }

    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username: username,
        NOT: {
          id: user.id,
        },
      },
    });

    if (isUsernameExist) {
      return NextResponse.json({
        error: "Username already exist",
      });
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        username,
        name,
        bio,
        email: email ? email : currentUser.email,
        social: social.map((obj: any) => obj.value),
        lastUsernameUpdate: currentDate,
        image: avatar,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Account updated",
        user,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        error: "Server error",
        catch: err,
      },
      { status: 500 }
    );
  }
}
