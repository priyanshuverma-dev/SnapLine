import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Not Authorized",
        },
        { status: 401 }
      );
    }
    const userId = params.userId;
    const userWantTofollow = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userWantTofollow) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (currentUser.id === userWantTofollow.id) {
      return NextResponse.json(
        {
          message: "You can't follow yourself",
        },
        { status: 400 }
      );
    }

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          following: {
            set: currentUser.following.filter((id) => id !== userId),
          },
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followers: {
            set: userWantTofollow.followers.filter(
              (id) => id !== currentUser.id
            ),
          },
        },
      });
      return NextResponse.json(false);
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        following: {
          push: userId,
        },
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          push: currentUser.id,
        },
      },
    });

    return NextResponse.json(true);
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
