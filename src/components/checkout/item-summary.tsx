import { ItemSummary } from "@/lib/types/types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const ItemSummary = (
  props: Omit<
    Omit<Omit<Omit<ItemSummary, "productId">, "slug">, "color">,
    "offerPrice"
  >,
) => {
  return (
    <>
      <div className="flex items-center gap-4 px-5 py-4">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + props.imageUrl}
          alt="product image"
          className="rounded-md border border-gray-300 bg-gray-100"
          width={60}
          height={60}
        />
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
          <h3 className="max-w-md truncate text-sm">{props.title}</h3>
          <div className="grid grid-cols-2">
            <p className="flex items-center gap-0.5 md:justify-center">
              <span className="text-xs">&#x2716;</span>
              {props.quantity}
            </p>
            <h1 className="text-right font-Roboto font-medium">
              {formatCurrency(props.basePrice)}
            </h1>
          </div>
        </div>
      </div>
      <hr className="mx-5" />
    </>
  );
};

export default ItemSummary;
