import { calculatePercentage, formatCurrency, textTruncate } from "@/lib/utils";
import Image from "next/image";

type ProductCardProps = {
  image: string;
  title: string;
  offerPrice: number;
  basePrice: number;
  stock: number;
};

const ProductCard = ({
  image,
  title,
  offerPrice,
  basePrice,
  stock,
}: ProductCardProps) => {
  return (
    <div className="flex flex-1 flex-col border bg-white p-2">
      <div className="group relative aspect-square w-full overflow-hidden">
        {stock === 0 && (
          <div className="absolute z-30 flex h-full w-full items-center justify-center bg-[rgba(255,255,255,0.7)]">
            <span className="bg-white p-3 text-sm font-medium text-destructive">
              Out Of Stock
            </span>
          </div>
        )}
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + image}
          alt={title + "Image"}
          fill
          sizes="300px"
          className="z-0 duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col justify-between gap-1">
        <div>
          <span className="text-[0.5rem] font-medium text-success">
            Up to {calculatePercentage(basePrice, offerPrice)} OFF
          </span>
          <h1 className="text-sm font-medium">{textTruncate(title, 35)}</h1>
          <p className="text-[0.5rem] text-destructive">
            {stock <= 5 && stock > 0 && `Hurry, only ${stock} left`}
          </p>
        </div>
        <span className="font-Roboto text-sm">
          From {formatCurrency(offerPrice)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
