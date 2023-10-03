import Banner from "@/components/banner";
import Latest from "@/components/latest";
import Hero from "@/components/hero/hero";
import ProductRow from "@/components/products/product-row";

export default function page() {
  return (
    <>
      <Hero />
      <Latest />
      <Banner />
      <ProductRow />
      <ProductRow />
      <ProductRow />
    </>
  );
}
