import axios from "@/config/axios.config";
import { ChildrenCategories } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getCategories() {
  const { data } = await axios.get("/api/admin/products/categories");
  if (data && data.categories)
    return data.categories as ChildrenCategories | null;
  return null;
}

export function useCategories() {
  return useQuery(["admin", "products", "categories"], getCategories);
}
