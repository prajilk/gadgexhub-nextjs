import axios from "@/config/axios.config";
import { CategoryProducts } from "@/lib/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

async function getFilteredProductsClient({
  pageParam = 1,
  category,
  sort,
}: {
  pageParam?: number;
  category?: string | null;
  sort?: string;
}) {
  const { data } = await axios.get("/api/product/filter", {
    params: { page: pageParam, category, sort },
  });

  if (data) return data.products as CategoryProducts | null;
  return null;
}

export function useFilteredProducts(category: string | null, sort?: string) {
  return useInfiniteQuery({
    queryKey: ["product", "filter"],
    queryFn: ({ pageParam }) =>
      getFilteredProductsClient({ pageParam, category, sort }),
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}
