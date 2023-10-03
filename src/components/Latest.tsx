import React from "react";
import Container from "./container";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import ProductCard from "./products/product-card";

const Latest = () => {
  return (
    <Container className="py-10 md:py-20">
      <div className="flex flex-col items-center justify-center gap-10">
        <p className="text-sm font-normal">Latest products</p>
        <h1 className="max-w-lg text-center text-xl font-normal md:text-3xl">
          Our newest products are here to help you look your best.
        </h1>
        <Link
          href="/"
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
        <ProductCard
          title="Test One"
          description="10% off"
          href="/"
          imgUrl="/oneplus-buds-z2.png"
          price={2000}
        />
        <ProductCard
          title="Test One"
          description="10% off"
          href="/"
          imgUrl="/oneplus-supervooc-80w-adapter.png"
          price={2000}
        />
      </div>
    </Container>
  );
};

export default Latest;
