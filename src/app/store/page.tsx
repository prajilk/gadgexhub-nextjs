import ProductResults from "@/components/store/product-results";
import StoreTemplate from "@/components/store/store-template";
import { getFilteredProduct } from "@/lib/api/products/get-filtered-products";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const Store = async ({ searchParams }: { searchParams: { sort: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(["product", "filter"], () =>
    getFilteredProduct({ sort: searchParams.sort }),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <StoreTemplate>
      <Hydrate state={dehydratedState}>
        <ProductResults />
      </Hydrate>
    </StoreTemplate>
  );
};

export default Store;
