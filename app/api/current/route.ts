import serverAuth from "@/lib/serverAuth";
import { Role } from "@/utils/user";
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
          guest: {
            bio: "",
            email: "",
            followers: [],
            following: [],
            id: "guest",
            image: "guest",
            likedPrompts: [],
            name: "guest",
            prompt: [],
            role: Role.GUEST,
            preferences: [],
            social: [],
            createdAt: new Date(),
            lastUsernameUpdate: new Date(),
            updatedAt: new Date(),
            aiService: [],
            username: "guest",
          },
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
