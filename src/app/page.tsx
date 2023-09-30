import Banner from "@/components/Banner";
import BannerSM from "@/components/BannerSM";
import Latest from "@/components/Latest";
import Hero from "@/components/hero/Hero";
import ProductRow from "@/components/productRow/ProductRow";

export default function page() {
  return (
    <>
      <Hero />
      <Latest />
      <Banner />
      <BannerSM />
      <ProductRow />
      <ProductRow />
      <ProductRow />
    </>
  );
}
