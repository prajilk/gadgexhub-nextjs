import axios from "@/config/axios.config";
import { NavCategories } from "../types/types";

export async function getNavCategories() {
  try {
    const { data } = await axios.get("/api/product/nav-categories");
    if (data) return data.categories as NavCategories;
    return null;
  } catch (error) {
    return null;
  }
}
