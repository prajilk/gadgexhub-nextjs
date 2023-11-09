import axios from "@/config/axios.config";
import { ProductPriceRes } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getProductPrice(slug: string, pid: string) {
  const { data } = await axios.get(`/api/product/${slug}/price?pid=${pid}`);
  return data as ProductPriceRes;
}

export function useProductPrice(slug: string, pid: string) {
  return useQuery(["product", "price"], () => getProductPrice(slug, pid));
}
