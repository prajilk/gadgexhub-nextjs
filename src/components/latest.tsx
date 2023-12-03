import React from "react";
import Container from "./container";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import ProductCard from "./products/product-card";
import { getFilteredProduct } from "@/lib/api/products/get-filtered-products";
import { calculatePercentage } from "@/lib/utils";

const Latest = async () => {
  const result = await getFilteredProduct({});

  return (
    <Container className="py-10 md:py-20">
      <div className="flex flex-col items-center justify-center gap-10">
        <p className="text-sm font-normal">Latest products</p>
        <h1 className="max-w-lg text-center text-xl font-normal md:text-3xl">
          Our newest products are here to help you look your best.
        </h1>
        <Link
          href="/store"
          className="group flex items-center gap-3 border-b border-black pb-1 text-sm"
        >
          Explore more
          <MoveRight
            strokeWidth={1}
            className="duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-4">
        {result
          ?.splice(0, 4)
          .map((product, i) => (
            <ProductCard
              key={i}
              title={product.title}
              description={`${calculatePercentage(
                product.basePrice,
                product.offerPrice,
              )} off`}
              href={`/store/${product.slug}?pid=${product.pid}`}
              imgUrl={product.image}
              price={product.offerPrice}
            />
          ))}
      </div>
    </Container>
  );
};

export default Latest;
