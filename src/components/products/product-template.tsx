import Image from "next/image";
import Container from "../container";
import ImageGallery from "./image-gallery";
import {
  calculatePercentage,
  capitalizeSearchParam,
  formatCurrency,
} from "@/lib/utils";
import Link from "next/link";
import ProductActions from "./product-actions";
import { ProductProps } from "@/lib/types/types";

type ProductTemplateProps = {
  product: ProductProps;
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProductTemplate = ({ product, searchParams }: ProductTemplateProps) => {
  const selectedColor = searchParams.color as string;
  const color = capitalizeSearchParam(selectedColor);

  const setDefaultVariant = () => {
    const urlVariant = product.colorVariants.find(
      (variant) => variant.color === color,
    );
    if (!urlVariant) {
      return product.colorVariants[0];
    }
    return urlVariant;
  };
  const variant = setDefaultVariant();

  return (
    <Container className="pt-28 md:pt-36">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-evenly md:flex-row md:items-start">
        <div className="flex w-full flex-col gap-y-5 md:sticky md:top-28 md:w-[50%]">
          <ImageGallery images={variant.images!} />
        </div>
        <div className="flex w-full flex-col gap-y-1 py-8 md:sticky md:top-20 md:max-w-[344px] md:py-0 lg:max-w-[500px]">
          <h1 className="text-xl font-medium md:text-2xl">{product.title}</h1>
          <span className="text-sm">{variant.color}</span>
          <p className="mt-5 flex items-center gap-3 text-2xl">
            {formatCurrency(product.offerPrice)}{" "}
            <b className="rounded-sm bg-success px-1 py-0.5 text-xs font-medium text-white">
              save {calculatePercentage(product.basePrice, product.offerPrice)}
            </b>
          </p>
          <p className="mb-6 text-sm text-slate-500">
            M.R.P.{" "}
            <span className="line-through">
              {formatCurrency(product.basePrice)}
            </span>{" "}
            (inclusive of all taxes){" "}
          </p>
          {product.colorVariants[0].color !== null && (
            <div className="space-y-3">
              <h1 className="text-xl font-medium">
                Colors: <span>{variant.color}</span>
              </h1>
              <ul className="flex flex-wrap gap-3">
                {product.colorVariants.map((_variant, i) => (
                  <li
                    className={`flex-shrink-0 cursor-pointer rounded-sm bg-gray-200 ${
                      _variant.images[0].id === variant.images[0].id &&
                      "border-2 border-gray-600"
                    }`}
                    key={i}
                  >
                    <Link
                      href={`?${new URLSearchParams({
                        pid: product.id,
                        color: _variant.color?.toLowerCase() as string,
                      })}`}
                    >
                      <div className="relative h-14 w-14">
                        <Image
                          alt="image-variant"
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            _variant.images[0].url
                          }
                          fill
                          priority
                          sizes="(max-width: 999px) 72px, 60px"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ProductActions pid={product.id} color={variant.color} quantity={0} />
          <div className="my-5 md:my-10">
            <h1 className="font-medium">Description</h1>
            <hr className="my-2" />
            <p className="text-sm font-light">{product.description}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductTemplate;
