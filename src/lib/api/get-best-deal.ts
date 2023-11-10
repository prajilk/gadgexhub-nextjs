import axios from "@/config/axios.config";
import { BestDealRes } from "../types/types";

export async function getBestDeal() {
  try {
    const { data } = await axios.get("/api/product/best-deal");
    if (data) return data as BestDealRes;
    return null;
  } catch (error) {
    return null;
  }
}
