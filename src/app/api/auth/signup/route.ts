import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    try {
        const userExists = await db.customer.findUnique({
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
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await db.customer.create({
            data: {
                email,
                password: passwordHash,
                username: email.split("@")[0],
            },
        });

        return NextResponse.json(
            {
                success: true,
                user: newUser,
                message: "User created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                user: null,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
