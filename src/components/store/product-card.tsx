import { calculatePercentage, formatCurrency } from "@/lib/utils";
import NextImage from "next/image";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

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
    <Card shadow="none" isPressable className="flex-1 bg-white" radius="md">
      <CardBody className="flex-grow-0 overflow-visible p-0">
        <Image
          as={NextImage}
          shadow="none"
          radius="lg"
          width={300}
          height={300}
          isZoomed
          alt={title}
          className="w-full overflow-hidden object-cover"
          classNames={{
            img: "hover:scale-110",
          }}
          src={process.env.NEXT_PUBLIC_IMAGE_URL + image}
        />
      </CardBody>
      <CardFooter className="flex-col items-start pb-0 text-small">
        <span className="text-[0.7rem] text-success">
          Up to {calculatePercentage(basePrice, offerPrice)} OFF
        </span>
        <b className="cutoff-text text-left">{title}</b>
        <p className="text-[0.7rem] text-destructive">
          {stock <= 5 && stock > 0 && `Hurry, only ${stock} left`}
        </p>
      </CardFooter>
      <div className="flex flex-1 items-end pb-3 ps-3">
        <p className="flex-1 text-small">
          From <span className="font-Roboto">{formatCurrency(offerPrice)}</span>
        </p>
      </div>
    </Card>
  );
};

export default ProductCard;
