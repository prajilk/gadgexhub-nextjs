import axios from "@/config/axios.config";
import { CategoryProduct } from "@/lib/types/types";

export async function getFilteredProduct({
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
  try {
    const { data } = await axios.get(`/api/product/filter`, {
      params: { page: pageParam, category, sort, search },
    });
    if (data) return data.products as CategoryProduct[] | null;
    return null;
  } catch (error) {
    return null;
  }
}
