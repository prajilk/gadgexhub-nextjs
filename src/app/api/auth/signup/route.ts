import { db } from "@/lib/prisma";
import { error500, success200 } from "@/lib/utils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const userExists = await db.user.findUnique({
      where: { email: email },
    });

    // Check is email is already exists
    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "User with this email already exists.",
        },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: passwordHash,
        name: email.split("@")[0],
      },
    });

    return success200({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        gender: newUser.gender,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    return error500({ user: null });
  }
}
