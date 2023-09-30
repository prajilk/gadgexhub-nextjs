import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { ZodProfileSchema } from "@/lib/zodSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Missing user ID in the session.",
      },
      { status: 400 },
    );
  }
  const userId = session.user.id;

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
          name: user.name,
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

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Missing user ID in the session.",
      },
      { status: 400 },
    );
  }

  const userData = await req.json();
  const result = ZodProfileSchema.safeParse(userData);

  if (result.success) {
    try {
      await db.user.update({
        data: userData,
        where: {
          id: session.user.id,
        },
      });

      return NextResponse.json(
        {
          success: true,
          user: result.data,
          message: "Profile updated successfully.",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "Something went wrong",
        },
        { status: 500 },
      );
    }
  }

  if (result.error) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Invalid data format.",
      },
      { status: 400 },
    );
  }
}
