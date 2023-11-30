import { Card, CardFooter } from "@nextui-org/card";
import { Image as NextUIImage } from "@nextui-org/image";
import { calculatePercentage, formatCurrency, textTruncate } from "@/lib/utils";
import LinkButton from "../shared/link-button";
import Link from "next/link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { getFilteredProduct } from "@/lib/api/products/get-filtered-products";
import { CategoryProduct } from "@/lib/types/types";
import Image from "next/image";

const RelatedProducts = async ({
  categoryId,
  pid,
}: {
  categoryId: number;
  pid: string;
}) => {
  const relatedProducts = await getFilteredProduct({
    category: `${categoryId}`,
  }).then((products) => products?.filter((product) => product.pid !== pid));

  return (
    relatedProducts?.length !== 0 && (
      <>
        <h1 className="mt-14 text-xl font-medium">Related Products</h1>
        <ScrollShadow
          orientation="horizontal"
          hideScrollBar
          className="flex gap-3 pb-10 pt-7"
        >
          {relatedProducts?.map((product, i) => (
            <RelatedProductCard key={i} {...product} />
          ))}
        </ScrollShadow>
      </>
    )
  );
};

export default RelatedProducts;

function RelatedProductCard({
  pid,
  slug,
  image,
  title,
  offerPrice,
  basePrice,
}: Omit<CategoryProduct, "stock">) {
  return (
    <Link href={`/store/${slug}?pid=${pid}`} className="flex-shrink-0">
      <Card isPressable radius="lg" className="border-none shadow-none">
        <NextUIImage
          alt={`${title} Image`}
          className="rounded-none bg-gray-200 object-cover"
          height={200}
          width={200}
          classNames={{
            img: "hover:scale-110",
            zoomedWrapper: "rounded-none",
          }}
          isZoomed
          as={Image}
          src={process.env.NEXT_PUBLIC_IMAGE_URL + image}
        />
        <CardFooter className="flex flex-1 flex-col items-start gap-3">
          <h1 className="text-xs font-medium md:text-sm">
            {textTruncate(title, 35)}
          </h1>
          <div className="w-full">
            <p className="text-left text-destructive">
              {calculatePercentage(basePrice, offerPrice)}{" "}
              <span className="font-Roboto text-base font-medium text-black">
                {formatCurrency(offerPrice)}
              </span>{" "}
              <span className="font-Roboto text-xs text-muted-foreground line-through">
                {formatCurrency(basePrice)}
              </span>
            </p>
            <LinkButton
              href="/"
              size="sm"
              className="mt-5 w-full font-Roboto text-xs font-medium md:text-sm"
            >
              {`From ${formatCurrency(offerPrice)}`}
            </LinkButton>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
