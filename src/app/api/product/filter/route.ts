import { db } from "@/lib/prisma";
import {
  error500,
  findParentAndEndChildIds,
  sortProduct,
  success200,
} from "@/lib/utils";
import { NextRequest } from "next/server";
import { getAllProducts, getProductsWithCategories } from "./helper";
import { makeSearchResult } from "../../search/helper";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
  const category = req.nextUrl.searchParams.get("category");
  const sort = req.nextUrl.searchParams.get("sort");
  const search = req.nextUrl.searchParams.get("search");

  try {
    const dbCategories = await db.category.findMany();

    const matchingCategoryId = dbCategories.find(
      (dbCategory) =>
        dbCategory.name.toLowerCase().replace(/[\/. ]/g, "-") === category ||
        dbCategory.id === Number(category),
    )?.id;

    const categories = findParentAndEndChildIds(
      dbCategories,
      matchingCategoryId,
    );

    const dbProducts =
      categories.length !== 0
        ? await getProductsWithCategories(categories, page)
        : search
        ? await makeSearchResult(search, page)
        : await getAllProducts(page);

    const products = sortProduct(dbProducts, sort).map((dbProduct) => ({
      pid: dbProduct.id,
      slug: dbProduct.slug,
      title: dbProduct.title,
      image: dbProduct.images.find((image) =>
        image.imagePublicId.endsWith("-thumb"),
      )?.imagePublicId,
      offerPrice: dbProduct.offerPrice,
      basePrice: dbProduct.basePrice,
      stock: dbProduct.stock,
    }));

    return success200({ products });
  } catch (error) {
    return error500({ products: null });
  }
}
