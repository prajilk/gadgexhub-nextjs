import { formatCurrency, textTruncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "@/lib/types/types";
import LinkButton from "../shared/link-button";

const ProductCard = ({
  title,
  imgUrl,
  description,
  price,
  href,
}: ProductCardProps) => {
  return (
    <div className="card rounded-none border border-gray-100 bg-white">
      <Link href={href} className="overflow-hidden bg-gray-200 p-0 md:p-5">
        <div className="relative aspect-square">
          <Image
            src={imgUrl}
            className="object-cover duration-300 hover:scale-110"
            alt="product image"
            fill
            sizes="(max-width: 699px) 74vw, (max-width: 999px) 38vw, calc(min(100vw - 96px, 1600px) / 5 - (24px / 5 * 4))"
          />
        </div>
      </Link>
      <div className="card-body flex-1 p-3">
        <div className="flex-1">
          <Link
            href={href}
            className="card-header text-xs font-medium md:text-sm"
          >
            {textTruncate(title, 35)}
          </Link>
        </div>
        <p className="text-xs font-medium text-content2">{description}</p>
        <div className="card-footer">
          <LinkButton
            href={href}
            className="w-full text-xs"
          >{`From ${formatCurrency(price)}`}</LinkButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
