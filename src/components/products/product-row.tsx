import ProductCard from "@/components/products/product-card";
import { CategoryProduct } from "@/lib/types/types";
import { calculatePercentage } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type ProductRowProps = {
  title: string;
  products: CategoryProduct[] | null;
  viewAll: string;
};

const ProductRow = (rowData: ProductRowProps) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-2xl">{rowData.title}</h1>
        <Link
          href={rowData.viewAll}
          className="group flex items-center gap-1 whitespace-nowrap text-sm font-medium hover:text-gray-600"
        >
          View all
          <ChevronRight
            size={20}
            className="duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <hr className="mb-5 mt-3 border-gray-300" />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-4">
        {rowData.products?.splice(0, 4).map((product, i) => (
          <Link
            href={`/store/${product.slug}?pid=${product.pid}`}
            key={i}
            className="flex"
          >
            <ProductCard
              href={`/store/${product.slug}?pid=${product.pid}`}
              title={product.title}
              price={product.offerPrice}
              imgUrl={product.image}
              description={`Up to ${calculatePercentage(
                product.basePrice,
                product.offerPrice,
              )} OFF`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductRow;
