import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
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
    const promptId = params.postId;

    const promptIwantToLike = await prisma.prompt.findUnique({
      where: {
        id: promptId,
      },
    });

    if (!promptIwantToLike) {
      return NextResponse.json(
        {
          message: "Prompt not found",
        },
        { status: 404 }
      );
    }

    const isLiked = promptIwantToLike.likes.includes(currentUser.id);

    if (isLiked) {
      await prisma.prompt.update({
        where: {
          id: promptId,
        },
        data: {
          likes: {
            set: promptIwantToLike.likes.filter((id) => id !== currentUser.id),
          },
        },
      });

      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          likedPrompts: {
            set: currentUser.likedPrompts.filter((id) => id !== promptId),
          },
        },
      });

      return NextResponse.json(false);
    }

    await prisma.prompt.update({
      where: {
        id: promptId,
      },
      data: {
        likes: {
          set: [...promptIwantToLike.likes, currentUser.id],
        },
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        likedPrompts: {
          set: [...currentUser.likedPrompts, promptId],
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
