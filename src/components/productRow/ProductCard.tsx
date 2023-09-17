"use client";

import { formatCurrency, textTruncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion as m } from "framer-motion";
import { ProductCardProps } from "@/types";
import LinkButton from "../common/LinkButton";

const ProductCard = ({
    title,
    imgUrl,
    description,
    price,
    href,
}: ProductCardProps) => {
    return (
        <m.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
            }}
            viewport={{ once: true }}
            className="card rounded-none bg-white border border-gray-100"
        >
            <Link
                href={href}
                className="p-0 md:p-5 bg-gray-200 overflow-hidden"
            >
                <div className="aspect-square relative">
                    <Image
                        src={imgUrl}
                        className="hover:scale-110 duration-300 object-cover"
                        alt="product image"
                        fill
                        sizes="(max-width: 699px) 74vw, (max-width: 999px) 38vw, calc(min(100vw - 96px, 1600px) / 5 - (24px / 5 * 4))"
                    />
                </div>
            </Link>
            <div className="card-body p-3 flex-1">
                <div className="flex-1">
                    <Link
                        href={href}
                        className="card-header text-sm md:text-xl"
                    >
                        {textTruncate(title, 35)}
                    </Link>
                </div>
                <p className="text-content2 font-medium text-xs md:text-base">
                    {description}
                </p>
                <div className="card-footer">
                    <LinkButton
                        href={href}
                        title={`From ${formatCurrency(price)}`}
                        className="w-full text-xs md:text-sm"
                    />
                </div>
            </div>
        </m.div>
    );
};

export default ProductCard;
