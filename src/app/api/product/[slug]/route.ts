import { db } from "@/lib/prisma";
import { makeColorVariant } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { slug: string } },
) {
  const pid = req.nextUrl.searchParams.get("pid");
  const slug = params.params.slug;

  if (!pid || !slug) {
    return NextResponse.json(
      {
        success: false,
        message:
          "The request is missing or contains an invalid product ID & Product Slug",
        product: null,
      },
      { status: 400 },
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
      return NextResponse.json(
        {
          success: false,
          message:
            "The request is missing or contains an invalid product ID & Product Slug",
          product: null,
        },
        { status: 400 },
      );
    }

    // Remove color and images from product
    const { color, images, ...product } = dbProduct;

    return NextResponse.json(
      {
        success: true,
        message: "Success",
        product: {
          ...product,
          colorVariants: makeColorVariant({
            colors: dbProduct.color,
            images: dbProduct.images,
          }),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
        product: null,
      },
      { status: 500 },
    );
  }
}
