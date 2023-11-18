import { db } from "@/lib/prisma";
import { error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const dbCategories = await db.category.findMany();

    const categoryTree = dbCategories.filter(
      (dbCategory) => dbCategory.parentId === null,
    );
    const categoryArray = categoryTree
      .map((category) =>
        dbCategories
          .filter((dbCategory) => dbCategory.parentId === category.id)
          .map((cat) => ({ parent: category.name, child: cat.name })),
      )
      .flat(1);

    interface TransformedItem {
      parent: string;
      child: string[];
    }

    const transformedArray: TransformedItem[] = categoryArray.reduce(
      (result: TransformedItem[], { parent, child }) => {
        const existingItem = result.find((item) => item.parent === parent);

        if (existingItem) {
          existingItem.child.push(child);
        } else {
          result.push({ parent, child: [child] });
        }

        return result;
      },
      [],
    );

    return success200({ categories: transformedArray });
  } catch (error) {
    return error500({ categories: null });
  }
}
