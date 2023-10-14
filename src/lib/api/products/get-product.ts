import axios from "@/config/axios.config";
import { ProductResProps } from "@/lib/types/types";

export async function getProduct(slug: string, pid: string) {
  try {
    const { data } = await axios.get(`/api/product/${slug}?pid=${pid}`);
    return data as ProductResProps;
  } catch (error) {
    return null;
  }
}
