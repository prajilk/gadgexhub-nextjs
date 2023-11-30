import axios from "@/config/axios.config";
import { CategoryProduct } from "@/lib/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

async function getFilteredProductsClient({
  pageParam = 1,
  category,
  sort,
  search,
}: {
  pageParam?: number;
  category?: string | null;
  sort?: string;
  search?: string;
}) {
  const { data } = await axios.get("/api/product/filter", {
    params: { page: pageParam, category, sort, search },
  });

  if (data) return data.products as CategoryProduct[] | null;
  return null;
}

export function useFilteredProducts(
  category?: string | null,
  sort?: string,
  search?: string,
) {
  return useInfiniteQuery({
    queryKey: ["product", "filter"],
    queryFn: ({ pageParam }) =>
      getFilteredProductsClient({ pageParam, category, sort, search }),
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}
