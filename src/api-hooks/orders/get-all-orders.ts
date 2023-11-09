import axios from "@/config/axios.config";
import { AllOrdersRes } from "@/lib/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

async function getAllOrdersClient({ pageParam = 1 }) {
  const { data } = await axios.get("/api/orders", {
    params: { page: pageParam },
  });
  return data as AllOrdersRes;
}

export function useAllOrders() {
  return useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdersClient,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}
