import Image from "next/image";
import Container from "../container";
import ImageGallery from "./image-gallery";
import { capitalizeSearchParam, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import ProductActions from "./product-actions";

type ImagesProps = {
  id: string;
  url: string;
};

type VariantProps = {
  color: string;
  images: ImagesProps[];
};

type ProductTemplateProps = {
  product: VariantProps[];
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProductTemplate = ({ product, searchParams }: ProductTemplateProps) => {
  const selectedColor = searchParams.color as string;
  const productID = searchParams.pid as string;
  const color = capitalizeSearchParam(selectedColor);

  const setDefaultVariant = () => {
    const urlVariant = product.find((variant) => variant.color === color);
    if (!urlVariant) {
      return product[0];
    }
    return urlVariant;
  };

  const variant = setDefaultVariant();

  const cartItem = {
    id: productID,
    title: "OnePlus Buds Z2",
    image: "/oneplus-buds-z2.png",
    variant: variant.color,
    url: "http://localhost:3000/store/earphone-700-anc?pid=twvdhjay",
    quantity: 2,
  };

  return (
    <Container className="pt-28 md:pt-36">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-evenly md:flex-row md:items-start">
        <div className="flex w-full flex-col gap-y-5 md:sticky md:top-28 md:w-[50%]">
          <ImageGallery images={variant.images!} />
        </div>
        <div className="flex w-full flex-col gap-y-1 py-8 md:sticky md:top-20 md:max-w-[344px] md:py-0 lg:max-w-[500px]">
          <h1 className="text-4xl font-medium">OnePlus Buds Z2</h1>
          <span className="text-sm">{variant.color}</span>
          <p className="mt-5 flex items-center gap-3 text-2xl">
            {formatCurrency(4999)}{" "}
            <b className="rounded-sm bg-success px-1 py-0.5 text-xs font-medium text-white">
              save 16%
            </b>
          </p>
          <p className="text-sm text-slate-500">
            M.R.P. <span className="line-through">{formatCurrency(5999)}</span>{" "}
            (inclusive of all taxes){" "}
          </p>
          <div className="my-6 space-y-3">
            <h1 className="text-xl font-medium">
              Colors: <span>{variant.color}</span>
            </h1>
            <ul className="flex flex-wrap gap-3">
              {product.map((_variant, i) => (
                <li
                  className={`relative h-14 w-14 flex-shrink-0 cursor-pointer rounded-sm bg-gray-200 ${
                    _variant.images[0].id === variant.images[0].id &&
                    "border-2 border-gray-600"
                  }`}
                  key={i}
                >
                  <Link
                    href={`?${new URLSearchParams({
                      pid: productID,
                      color: _variant.color.toLowerCase(),
                    })}`}
                  >
                    <Image
                      alt="image-variant"
                      src={_variant.images[0].url}
                      fill
                      sizes="(max-width: 999px) 72px, 60px"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ProductActions {...cartItem} />
        </div>
      </div>
    </Container>
  );
};

export default ProductTemplate;
