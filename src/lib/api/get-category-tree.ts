import axios from "@/config/axios.config";
import { CategoryStructure, NavbarCategories } from "../types/types";

export async function getCategoryTree(category?: string | null) {
  try {
    const { data } = await axios.get("/api/product/category-tree", {
      params: { category },
    });
    if (data) return data.categories as CategoryStructure;
    return null;
  } catch (error) {
    return null;
  }
}

export async function getNavbarCategories() {
  try {
    const { data } = await axios.get(
      "/api/product/category-tree/navbar-category",
    );
    if (data) return data.categories as NavbarCategories[];
    return null;
  } catch (error) {
    return null;
  }
}
