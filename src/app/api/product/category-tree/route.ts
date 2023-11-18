import { db } from "@/lib/prisma";
import { error500, generateCategoryStructure, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    const dbCategories = await db.category.findMany();

    const categoryTree = generateCategoryStructure(
      dbCategories,
      category || "",
    );

    return success200({ categories: categoryTree });
  } catch (error) {
    return error500({ categories: null });
  }
}
