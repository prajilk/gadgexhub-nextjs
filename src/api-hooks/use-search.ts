import axios from "@/config/axios.config";
import { CategoryProducts } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getSearchResult(query: string) {
  if (!query) return null;
  const { data } = await axios.get("/api/search", { params: { q: query } });
  if (data && data.result) return data.result as CategoryProducts | null;
  return null;
}

export function useSearch(search: string) {
  return useQuery(["search", search], () => getSearchResult(search), {
    retry: false,
  });
}
