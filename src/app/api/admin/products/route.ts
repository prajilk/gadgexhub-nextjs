import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import cuid from "cuid";
import { ZodProductSchema } from "@/lib/zodSchemas";
import { ColorVariant } from "@/lib/types/types";
import { error500, success200 } from "@/lib/utils";
import { createProduct } from "./helper";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (
  image: string,
  slug: string,
  color: string,
  filename: string,
) => {
  return cloudinary.uploader.upload(image, {
    folder: "products",
    public_id: `${slug}/${color === "default" ? "" : color}/${filename}`,
  });
};

function extractColorAsString(colors: ColorVariant[]) {
  if (colors[0].color.toLowerCase() === "default") return null;
  const colorsArray = colors.map((item) => item.color);
  const colorsString = colorsArray.join(",");
  return colorsString;
}

export async function POST(req: NextRequest) {
  try {
    const body: z.infer<typeof ZodProductSchema> = await req.json();

    const promises = body.colors.flatMap((color) => [
      ...color.others.map((otherImages) =>
        uploadImage(otherImages, body.slug, color.color, cuid()),
      ),
      uploadImage(color.thumbnail, body.slug, color.color, `${cuid()}-thumb`),
    ]);

    const response = await Promise.all(promises);

    const product = await createProduct({
      title: body.title,
      slug: body.slug,
      shortDescription:
        body.shortDescription === "" ? null : body.shortDescription,
      description: body.description,
      basePrice: parseInt(body.basePrice),
      offerPrice: parseInt(body.offerPrice),
      stock: parseInt(body.stock),
      categoryId: parseInt(body.categoryId),
      color: extractColorAsString(body.colors),
      variantName: body.variantName,
      variantValues: body.variantValues?.replace(/\s/g, ""),
      images: {
        createMany: {
          data: response.map((res) => ({ imagePublicId: res.public_id })),
        },
      },
    });
    return success200({ product: product });
  } catch (error) {
    return error500({ product: null });
  }
}
