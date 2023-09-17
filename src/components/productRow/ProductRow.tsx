import ProductCard from "@/components/productRow/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const products = [
    {
        title: "Oneplus SuperVOOC 80w Power Adapter",
        imgUrl: "/oneplus-supervooc-80w-adapter.png",
        description: "10% OFF",
        price: 1990,
        href: "/store/product/oneplus-supervooc-80w-adapter?pid=twvshjay",
    },
    {
        title: "OnePlus Buds Z2",
        imgUrl: "/oneplus-buds-z2.png",
        description: "Up to 32% OFF",
        price: 2499,
        href: "/store/product/oneplus-buds-z2?pid=twvseqjay",
    },
    {
        title: "Zeb-Companion 300",
        imgUrl: "/zeb-companion.png",
        description: "Up to 12% OFF",
        price: 3299,
        href: "/store/product/zeb-companion-300?pid=twvseqjay",
    },
    {
        title: "OnePlus Buds Z2",
        imgUrl: "/oneplus-buds-z2.png",
        description: "Up to 32% OFF",
        price: 2499,
        href: "/store/product/oneplus-buds-z2?pid=twvseqjay",
    },
];

const ProductRow = () => {
    return (
        <section className="container px-5 md:px-14 py-10">
            <div className="flex justify-between">
                <h1 className="text-xl md:text-2xl font-medium">
                    Best of Gadgets
                </h1>
                <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-gray-600 group text-sm font-medium"
                >
                    View all
                    <ChevronRight
                        size={20}
                        className="group-hover:translate-x-1 duration-300"
                    />
                </Link>
            </div>
            <hr className="mt-3 mb-5 border-gray-300" />
            <div className="grid gap-2 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {products.map((product, i) => (
                    <ProductCard {...product} key={i} />
                ))}
            </div>
        </section>
    );
};

export default ProductRow;
