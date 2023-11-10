import Banner from "@/components/banner";
import Latest from "@/components/latest";
import Hero from "@/components/hero/hero";
import ProductRow from "@/components/products/product-row";
import { getHeroBanner } from "@/lib/api/get-hero-banner";

export default async function page() {
  const heroBanners = await getHeroBanner();

  return (
    <>
      {heroBanners && <Hero slides={heroBanners} />}
      <Latest />
      <Banner />
      <ProductRow />
      <ProductRow />
      <ProductRow />
    </>
  );
}
