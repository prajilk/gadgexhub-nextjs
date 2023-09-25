import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Missing user ID parameter in the request.",
      },
      { status: 400 },
    );
  }

  try {
    // Get user data from database
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    //Return if user not found
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "User not found.",
        },
        { status: 404 },
      );
    }

    // Return user data
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullname: user.name,
          gender: user.gender,
          phone: user.phone,
        },
        message: "Success",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
