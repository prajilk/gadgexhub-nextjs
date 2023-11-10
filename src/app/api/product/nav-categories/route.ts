import { db } from "@/lib/prisma";
import { error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

// {
//     title: "Accessories",
//     subItems: [
//       { title: "Gaming Accessories", url: "/store/gaming-accessories" },
//       {
//         title: "Computer Accessories",
//         url: "/store/computer-accessories",
//       },
//       { title: "Laptop Accessories", url: "/store/laptop-accessories" },
//       {
//         title: "Mobile & Tablet Accessories",
//         url: "/store/mobile-tablet-accessories",
//       },
//       { title: "Power Banks", url: "/store/power-banks" },
//     ],
//   },

type Categories = {
  id: number;
  name: string;
  parentId: number | null;
}[];

type TreeCategories = {
  id: number;
  title: string;
  subItems: {
    title: string;
    url: string;
  }[];
}[];

function buildTree(data: Categories) {
  const map: Map<number, TreeCategories[0]> = new Map();

  const categories: TreeCategories = data.reduce((acc, item) => {
    const node: TreeCategories[0] = {
      id: item.id,
      title: item.name,
      subItems: [],
    };

    map.set(item.id, node);

    if (item.parentId === null) {
      acc.push(node);
    }

    const parent = map.get(item.parentId || 0);
    if (parent) {
      parent.subItems.push({
        title: item.name,
        url: `/store/${item.name.toLowerCase().replace(/ /g, "-")}`,
      });
    }

    return acc;
  }, [] as TreeCategories);

  return categories;
}

export async function GET(req: NextRequest) {
  try {
    const dbCategories = await db.category.findMany();
    const categories = buildTree(dbCategories);

    return success200({ categories });
  } catch (error) {
    return error500({ categories: null });
  }
}
