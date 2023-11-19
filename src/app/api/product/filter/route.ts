import { db } from "@/lib/prisma";
import {
  error500,
  findParentAndEndChildIds,
  sortProduct,
  success200,
} from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    const sort = req.nextUrl.searchParams.get("sort");
    const dbCategories = await db.category.findMany();

    const matchingCategoryId = dbCategories.find(
      (dbCategory) =>
        dbCategory.name.toLowerCase().replace(/[\/. ]/g, "-") === category,
    )?.id;

    const result = findParentAndEndChildIds(dbCategories, matchingCategoryId);

    const dbProducts =
      result.length !== 0
        ? await db.category
            .findMany({
              where: {
                id: {
                  in: result,
                },
              },
              select: {
                Product: {
                  include: {
                    images: true,
                  },
                },
              },
            })
            .then((dbProducts) =>
              dbProducts.flatMap((dbProduct) => dbProduct.Product).flat(2),
            )
        : await db.product.findMany({ include: { images: true } });

    const products = sortProduct(dbProducts, sort).map((dbProduct) => ({
      pid: dbProduct.id,
      slug: dbProduct.slug,
      title: dbProduct.title,
      image: dbProduct.images.find((image) =>
        image.imagePublicId.endsWith("-thumb"),
      )?.imagePublicId,
      offerPrice: dbProduct.offerPrice,
      basePrice: dbProduct.basePrice,
    }));

    return success200({ products });
  } catch (error) {
    console.log(error);

    return error500({ products: null });
  }
}
