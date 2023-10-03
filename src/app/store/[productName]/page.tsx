"use client";

import Container from "@/components/container";
import ImageGallery from "@/components/products/image-gallery";
import Button from "@/components/shared/button";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
// import { getProduct } from "@/lib/api/get-product";
// import { Metadata } from "next";
// import { notFound } from "next/navigation";

// type Props = {
//   params: { productName: string };
//   searchParams: { [key: string]: string | undefined };
// };

// export async function generateMetadata({
//   params,
//   searchParams,
// }: Props): Promise<Metadata> {
//   const data = await getProduct(searchParams.pid ?? "", params.productName[0]);

//   const product = data.products[0];

//   if (!product) {
//     notFound();
//   }

//   const product = {
//     title: "Test",
//   };

//   return {
//     title: `${product.title} | Acme Store`,
//     description: `${product.title}`,
//     openGraph: {
//       title: `${product.title} | Acme Store`,
//       description: `${product.title}`,
//       // images: product.thumbnail ? [product.thumbnail] : [],
//     },
//   };
// }

const product = {
  variants: [
    {
      images: [
        {
          id: "126id",
          url: "/oneplus-buds-z2.png",
        },
        {
          id: "127id",
          url: "/oneplus-buds-z2-image1.webp",
        },
        {
          id: "128id",
          url: "/oneplus-buds-z2-image2.webp",
        },
      ],
    },
    {
      images: [
        {
          id: "123id",
          url: "/oneplus-buds-z2-white.webp",
        },
        {
          id: "124id",
          url: "/oneplus-buds-z2-white-image1.webp",
        },
        {
          id: "125id",
          url: "/oneplus-buds-z2-white-image2.webp",
        },
      ],
    },
  ],
};

const ProductPage = ({ params }: { params: { productName: string } }) => {
  const [images, setImages] = useState(product.variants[0].images);

  function changeVariant(index: number) {
    setImages([...product.variants[index].images]);
  }

  return (
    <Container className="pt-28">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-evenly md:flex-row md:items-start">
        <div className="flex w-full flex-col gap-y-5 md:w-[50%]">
          <ImageGallery images={images!} />
        </div>
        <div className="flex w-full flex-col gap-y-12 py-8 md:sticky md:top-20 md:max-w-[344px] md:py-0 lg:max-w-[500px]">
          <div>
            <h1 className="text-4xl font-medium">OnePlus Buds Z2</h1>
            <span className="text-sm">Matte Black</span>
            <p className="mt-5 flex items-center gap-3 text-2xl">
              {formatCurrency(4999)}{" "}
              <b className="rounded-sm bg-success px-1 py-0.5 text-xs font-medium text-white">
                save 16%
              </b>
            </p>
            <p className="text-sm text-slate-500">
              M.R.P.{" "}
              <span className="line-through">{formatCurrency(5999)}</span>{" "}
              (inclusive of all taxes){" "}
            </p>
            <div className="my-6 space-y-3">
              <h1 className="text-xl font-medium">
                Colors: <span>Matte Black</span>
              </h1>
              <ul className="flex gap-3">
                {product.variants.map((variant, i) => (
                  <li
                    className={`relative h-14 w-14	cursor-pointer rounded-sm bg-gray-200 ${
                      variant.images[0].id === images[0].id &&
                      "border-2 border-gray-600"
                    }`}
                    key={i}
                    onClick={() => changeVariant(i)}
                  >
                    <Image
                      alt="image-variant"
                      src={variant.images[0].url}
                      fill
                      sizes="(max-width: 999px) 72px, 60px"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <Button className="rounded-none py-6 text-base uppercase">
                Add to cart
              </Button>
              <Button className="bg-secondaryTheme hover:bg-secondaryTheme rounded-none py-6 text-base uppercase hover:bg-opacity-60">
                Buy it now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
