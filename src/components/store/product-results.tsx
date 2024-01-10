"use client";

import { useFilteredProducts } from "@/api-hooks/products/get-filtered-products";
import ProductCard from "./product-card";
import { Fragment, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { Frown, Loader2 } from "lucide-react";
import Link from "next/link";

const ProductResults = () => {
  const category = usePathname().split("/").at(-1);
  const sort = useSearchParams().get("sort");
  const search = useSearchParams().get("q");
  const { data, fetchNextPage, isFetchingNextPage } = useFilteredProducts(
    category,
    sort || undefined,
    search || undefined,
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
        {data?.pages.map((products, i) => (
          <Fragment key={i}>
            {products?.map((product, j) => (
              <Link
                href={`/store/${product.slug}?pid=${product.pid}`}
                key={product.pid}
                ref={j === products.length - 1 ? ref : undefined}
                className="flex w-full flex-col p-[3px]"
              >
                <ProductCard {...product} key={i} />
              </Link>
            ))}
          </Fragment>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3">
          <Loader2 className="animate-spin" size={30} />
          <span className="text-xs text-muted-foreground">
            Hang on, Loading Products
          </span>
        </div>
      )}
    </>
  );
};

export default ProductResults;
