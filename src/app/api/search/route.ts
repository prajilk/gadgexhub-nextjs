import { error400, error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";
import { makeSearchResult } from "./helper";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q");

  if (!search || search === "") {
    return error400("Invalid Search keyword", { result: null });
  }

  try {
    const searchResult = await makeSearchResult(search, 1);

    const finalResult = searchResult.map((dbProduct) => ({
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

    return success200({
      result: finalResult,
    });
  } catch (error) {
    return error500({ result: null });
  }
}
