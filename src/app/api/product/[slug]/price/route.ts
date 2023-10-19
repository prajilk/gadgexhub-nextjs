import { db } from "@/lib/prisma";
import { error400, error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const pid = req.nextUrl.searchParams.get("pid");

  if (!pid || !slug) {
    return error400(
      "The request is missing or contains an invalid product ID & Product Slug",
      { data: null },
    );
  }

  try {
    const productPrice = await db.product.findUnique({
      where: {
        id: pid,
        slug,
      },
      select: {
        basePrice: true,
        offerPrice: true,
      },
    });

    if (!productPrice) {
      return error400(
        "The request is missing or contains an invalid product ID & Product Slug",
        { data: null },
      );
    }

    return success200({
      data: {
        basePrice: productPrice.basePrice,
        offerPrice: productPrice.offerPrice,
      },
    });
  } catch (error) {
    return error500({ data: null });
  }
}
