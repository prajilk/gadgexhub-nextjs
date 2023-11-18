import ProductResults from "@/components/store/product-results";
import StoreTemplate from "@/components/store/store-template";
import { getFilteredProduct } from "@/lib/api/products/get-filtered-products";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const Page = async ({
  params,
  searchParams,
}: {
  params: { category: string[] };
  searchParams: { sort: string };
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(["product", "filter"], () =>
    getFilteredProduct({
      category: params.category.at(-1),
      sort: searchParams.sort,
    }),
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <StoreTemplate categories={params.category}>
      <Hydrate state={dehydratedState}>
        <ProductResults />
      </Hydrate>
    </StoreTemplate>
  );
};

export default Page;
