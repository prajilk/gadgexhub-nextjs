import ProductTemplate from "@/components/products/product-template";

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

// product.variants[0].images[0]

const product = [
  {
    color: "Matte Black",
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
    color: "Pearl White",
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
];

const ProductPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <>
      <ProductTemplate product={product} searchParams={searchParams} />
    </>
  );
};

export default ProductPage;
