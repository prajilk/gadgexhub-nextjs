import Banner from "@/components/banner";
import Latest from "@/components/latest";
import Hero from "@/components/hero/hero";
import ProductRow from "@/components/products/product-row";
import { getHeroBanner } from "@/lib/api/get-hero-banner";
import { getFilteredProduct } from "@/lib/api/products/get-filtered-products";
import { capitalizeSearchParam } from "@/lib/utils";

const rows = ["popular", "accessories", "gadgets", "audio-video"];
function makeRowTitle(title: string) {
  if (title === "popular") return "Best Selling";
  else if (title === "audio-video") return "Best Selling in Audio/Video";
  else return `Best Selling in ${capitalizeSearchParam(title)}`;
}
function makeRowViewAll(row: string) {
  if (row === "popular") return "/store?popular";
  else return `/store/c/${row}?popular`;
}

export default async function page() {
  const heroBanners = await getHeroBanner();
  const productRows = await Promise.all(
    rows.map(async (row) => {
      return {
        title: makeRowTitle(row),
        products: await getFilteredProduct({
          category: row === "popular" ? undefined : row,
          sort: "popular",
        }),
        viewAll: makeRowViewAll(row),
      };
    }),
  );

  return (
    <>
      {heroBanners && <Hero slides={heroBanners} />}
      <Latest />
      <Banner />
      {productRows.map((productRow, i) => (
        <div key={i}>
          <ProductRow {...productRow} />
        </div>
      ))}
    </>
  );
}
