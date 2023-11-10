import { db } from "@/lib/prisma";
import { error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const banners = await db.heroBanner.findMany();
    if (banners?.length !== 0) return success200({ banners });
    else return error500({ banners: null });
  } catch (error) {
    return error500({ banners: null });
  }
}
