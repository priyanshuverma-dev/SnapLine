import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json(currentUser);
  } catch (error: any) {
    console.log(error.message);

    if (error?.cause === "No session") {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

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
