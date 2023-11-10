import { db } from "@/lib/prisma";
import { error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categories =
      await db.$queryRaw`SELECT * FROM "Category" WHERE id NOT IN (
  SELECT DISTINCT "parentId" FROM "Category" WHERE "parentId" IS NOT NULL
) ORDER BY name;`;
    if (!categories) return error500({ categories: null });
    return success200({ categories });
  } catch (error) {
    return error500({ categories: null });
  }
}
