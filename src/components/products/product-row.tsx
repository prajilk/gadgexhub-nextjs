import ProductCard from "@/components/products/product-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "Oneplus SuperVOOC 80w Power Adapter",
    imgUrl: "/oneplus-supervooc-80w-adapter.png",
    description: "10% OFF",
    price: 1990,
    href: "/store/oneplus-supervooc-80w-adapter?pid=twvshjay",
  },
  {
    title: "OnePlus Buds Z2",
    imgUrl: "/oneplus-buds-z2.png",
    description: "Up to 32% OFF",
    price: 2499,
    href: "/store/oneplus-buds-z2?pid=twvseqjay",
  },
  {
    title: "Zeb-Companion 300",
    imgUrl: "/zeb-companion.png",
    description: "Up to 12% OFF",
    price: 3299,
    href: "/store/zeb-companion-300?pid=twvseqjay",
  },
  {
    title: "OnePlus Buds Z2",
    imgUrl: "/oneplus-buds-z2.png",
    description: "Up to 32% OFF",
    price: 2499,
    href: "/store/oneplus-buds-z2?pid=twvseqjay",
  },
];

const ProductRow = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium md:text-2xl">Best of Gadgets</h1>
        <Link
          href="/"
          className="group flex items-center gap-1 text-sm font-medium hover:text-gray-600"
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
        {products.map((product, i) => (
          <ProductCard {...product} key={i} />
        ))}
      </div>
    </section>
  );
};

export default ProductRow;
