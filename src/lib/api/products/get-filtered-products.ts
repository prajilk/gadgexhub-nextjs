import axios from "@/config/axios.config";
import { CategoryProducts } from "@/lib/types/types";

export async function getFilteredProduct({
  pageParam = 1,
  category,
  sort,
}: {
  pageParam?: number;
  category?: string | null;
  sort?: string;
}) {
  try {
    const { data } = await axios.get(`/api/product/filter`, {
      params: { page: pageParam, category, sort },
    });
    if (data) return data.products as CategoryProducts | null;
    return null;
  } catch (error) {
    return null;
  }
}
