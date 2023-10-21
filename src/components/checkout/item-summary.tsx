import { roboto } from "@/app/layout";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ItemSummary = () => {
  return (
    <>
      <div className="flex items-center gap-4 px-5 py-4">
        <Image
          src="/oneplus-buds-z2.png"
          alt="product image"
          className="rounded-md border border-gray-300 bg-gray-100"
          width={60}
          height={60}
        />
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
          <h3 className="max-w-md truncate text-sm">
            One Plus Buds Z2 hjdv gw rgs d as fefwrgrg Matte Black
          </h3>
          <div className="grid grid-cols-2">
            <p className="flex items-center gap-0.5 md:justify-center">
              <span className="text-xs">&#x2716;</span>1
            </p>
            <h1 className={`${roboto.className} text-right font-medium`}>
              {formatCurrency(2999)}
            </h1>
          </div>
        </div>
      </div>
      <hr className="mx-5" />
    </>
  );
};

export default ItemSummary;
