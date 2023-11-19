import { calculatePercentage, formatCurrency, textTruncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  pid: string;
  slug: string;
  image: string;
  title: string;
  offerPrice: number;
  basePrice: number;
};

const ProductCard = ({
  pid,
  slug,
  image,
  title,
  offerPrice,
  basePrice,
}: ProductCardProps) => {
  return (
    <Link
      href={`/store/${slug}?pid=${pid}`}
      className="flex aspect-square w-full flex-col space-y-2 p-0.5"
    >
      <div className="flex flex-1 flex-col bg-white p-2">
        <div className="group relative aspect-square w-full overflow-hidden">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + image}
            alt={title + "Image"}
            fill
            sizes="300px"
            className="duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-5 flex flex-1 flex-col justify-between gap-1">
          <div>
            <span className="text-xs text-destructive">
              Up to {calculatePercentage(basePrice, offerPrice)} OFF
            </span>
            <h1 className="text-sm font-medium">{textTruncate(title, 35)}</h1>
          </div>
          <span className="font-Roboto text-sm">
            From {formatCurrency(offerPrice)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
