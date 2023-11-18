import { formatCurrency, textTruncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  pid: string;
  slug: string;
  image: string;
  title: string;
  offerPrice: number;
};

const ProductCard = ({
  pid,
  slug,
  image,
  title,
  offerPrice,
}: ProductCardProps) => {
  return (
    <Link
      href={`/store/${slug}?pid=${pid}`}
      className="aspect-square w-full space-y-2 p-2"
    >
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-white">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + image}
          alt={title + "Image"}
          fill
          sizes="300px"
          className="duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-sm">{textTruncate(title, 35)}</h1>
        <span className="font-Roboto text-sm font-medium">
          {formatCurrency(offerPrice)}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
