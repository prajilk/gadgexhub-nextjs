import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const pid = req.nextUrl.searchParams.get("pid");

  if (!pid || !slug) {
    return NextResponse.json(
      {
        success: false,
        message:
          "The request is missing or contains an invalid product ID & Product Slug",
        data: null,
      },
      { status: 400 },
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
      return NextResponse.json(
        {
          success: false,
          message:
            "The request is missing or contains an invalid product ID & Product Slug",
          data: null,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success",
        data: {
          basePrice: productPrice.basePrice,
          offerPrice: productPrice.offerPrice,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product price",
        data: null,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Success",
      data: {
        basePrice: 5999,
        offerPrice: 3999,
      },
    },
    { status: 200 },
  );
}
