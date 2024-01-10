import { ItemSummary } from "@/lib/types/types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ItemSummary = (
  props: Omit<Omit<Omit<ItemSummary, "productId">, "slug">, "basePrice">,
) => {
  return (
    <>
      <div className="flex items-center gap-4 py-4">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + props.imageUrl}
          alt="product image"
          className="rounded-md border border-gray-300 bg-gray-100"
          width={80}
          height={80}
        />
        <div>
          <h5 className="cutoff-text text-sm text-black md:text-base">
            {props.title}
          </h5>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            {props.color}
          </p>
        </div>
        <div className="ms-auto">
          <span className="block font-Roboto text-sm font-medium md:text-base">
            {formatCurrency(props.offerPrice)}
          </span>
          <p className="mt-1 text-end text-xs text-muted-foreground md:text-sm">
            Qty: {props.quantity}
          </p>
        </div>
      </div>
    </>
  );
};

export default ItemSummary;
