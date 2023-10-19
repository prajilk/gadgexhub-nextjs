import { db } from "@/lib/prisma";
import { error400, error500, makeColorVariant, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { slug: string } },
) {
  const pid = req.nextUrl.searchParams.get("pid");
  const slug = params.params.slug;

  if (!pid || !slug) {
    return error400(
      "The request is missing or contains an invalid product ID & Product Slug",
      { product: null },
    );
  }

  try {
    const dbProduct = await db.product.findUnique({
      where: {
        slug: slug,
        id: pid,
      },
      include: {
        images: true,
      },
    });

    if (!dbProduct) {
      return error400(
        "The request is missing or contains an invalid product ID & Product Slug",
        { product: null },
      );
    }

    // Remove color and images from product
    const { color, images, ...product } = dbProduct;

    return success200({
      product: {
        ...product,
        colorVariants: makeColorVariant({
          colors: dbProduct.color,
          images: dbProduct.images,
        }),
      },
    });
  } catch (error) {
    return error500({ product: null });
  }
}
