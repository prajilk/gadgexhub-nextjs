import { db } from "@/lib/prisma";
import { error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const bestDeal = await db.bestDeal.findFirst();
    if (!bestDeal) return error500({ bestDeal: null });
    return success200({ deal: bestDeal });
  } catch (error) {
    return error500({ bestDeal: null });
  }
}
