"use client";

import { useFilteredProducts } from "@/api-hooks/products/get-filtered-products";
import ProductCard from "./product-card";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { Frown } from "lucide-react";

const ProductResults = () => {
  const category = usePathname().split("/").at(-1);
  const sort = useSearchParams().get("sort");
  const { data, fetchNextPage, isFetchingNextPage } = useFilteredProducts(
    category || null,
    sort || undefined,
  );

  const lastOrderRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastOrderRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && data?.pages.at(-1)?.length !== 0)
      fetchNextPage();
  }, [entry, data?.pages, fetchNextPage]);

  return (
    <>
      {data?.pages.reduce((acc, curr) => acc + (curr?.length || 0), 0) ===
        0 && (
        <h1 className="my-3 text-center text-sm font-medium text-muted-foreground">
          <Frown className="mx-auto animate-bounce" />
          No products found!
        </h1>
      )}
      <div className="grid auto-rows-auto grid-cols-2 items-stretch md:grid-cols-3 lg:grid-cols-4">
        {data?.pages.map(
          (products) =>
            products?.map((product, i) => <ProductCard {...product} key={i} />),
        )}
      </div>
    </>
  );
};

export default ProductResults;
