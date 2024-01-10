import { Card, CardFooter } from "@nextui-org/card";
import { Image as NextUIImage } from "@nextui-org/image";
import { calculatePercentage, formatCurrency } from "@/lib/utils";
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
    <Card
      isPressable
      radius="lg"
      className="flex-shrink-0 border-none shadow-none"
      style={{ width: "200px" }}
    >
      <Link href={`/store/${slug}?pid=${pid}`}>
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
      </Link>
      <CardFooter className="flex flex-1 flex-col items-start gap-3">
        <Link
          className="cutoff-text text-left text-xs font-medium md:text-sm"
          href={`/store/${slug}?pid=${pid}`}
        >
          {title}
        </Link>
        <div className="flex w-full flex-1 flex-col">
          <p className="mb-5 text-left text-destructive">
            {calculatePercentage(basePrice, offerPrice)}{" "}
            <span className="font-Roboto text-base font-medium text-black">
              {formatCurrency(offerPrice)}
            </span>{" "}
            <span className="font-Roboto text-xs text-muted-foreground line-through">
              {formatCurrency(basePrice)}
            </span>
          </p>
          <LinkButton
            href={`/store/${slug}?pid=${pid}`}
            size="sm"
            className="mt-auto w-full flex-shrink-0 font-Roboto text-xs font-medium md:text-sm"
          >
            {`From ${formatCurrency(offerPrice)}`}
          </LinkButton>
        </div>
      </CardFooter>
    </Card>
  );
}
