import serverAuth from "@/app/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
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
    const userId = params.slug;

    const user = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(user);
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
