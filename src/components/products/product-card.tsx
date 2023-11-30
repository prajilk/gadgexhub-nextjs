import { formatCurrency, textTruncate } from "@/lib/utils";
import Image from "next/image";
import { ProductCardProps } from "@/lib/types/types";
import LinkButton from "../shared/link-button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image as NextUIImage } from "@nextui-org/image";

const ProductCard = ({
  title,
  imgUrl,
  description,
  price,
  href,
}: ProductCardProps) => {
  return (
    <Card className="flex-shrink-0 shadow-md" isPressable>
      <CardBody className="p-0">
        <div className="bg-gray-200 md:p-5">
          <div className="relative aspect-square">
            <NextUIImage
              alt={`${title} Image`}
              className="rounded-none object-cover"
              as={Image}
              src={process.env.NEXT_PUBLIC_IMAGE_URL + imgUrl}
              isZoomed
              classNames={{
                img: "hover:scale-110",
                zoomedWrapper: "rounded-none",
              }}
              width={270}
              height={270}
            />
          </div>
        </div>
        <CardFooter className="flex flex-1 flex-col items-start gap-3">
          <h1 className="text-xs font-medium md:text-sm">
            {textTruncate(title, 35)}
          </h1>
          <p className="flex-1 text-xs font-medium text-success">
            {description}
          </p>
          <div className="w-full">
            <LinkButton
              href={href}
              className="w-full font-Roboto text-xs font-medium md:text-sm"
            >{`From ${formatCurrency(price)}`}</LinkButton>
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
