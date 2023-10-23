import { authOptions } from "@/lib/auth";
import { error400, error404, error500, success200 } from "@/lib/utils";
import { ZodProfileSchema } from "@/lib/zodSchemas";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { getUser, updateUser } from "./helper";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { user: null });
    }
    const userId = session.user.id;
    // Get user data from database
    const user = await getUser(userId);

    //Return if user not found
    if (!user) {
      return error404("User not found", { user: null });
    }

    // Return user data
    return success200({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        phone: user.phone,
      },
    });
  } catch (error: any) {
    return error500({ user: null });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { user: null });
    }

    const userData = await req.json();
    const result = ZodProfileSchema.safeParse(userData);

    if (result.success) {
      await updateUser(session.user.id, userData);
      return success200({ user: result.data });
    }

    if (result.error) {
      return error400("Invalid data format.", { user: null });
    }
  } catch (error) {
    return error500({ user: null });
  }
}
