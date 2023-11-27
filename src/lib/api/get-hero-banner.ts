import axios from "@/config/axios.config";
import { HeroBanner } from "@prisma/client";

export async function getHeroBanner() {
  try {
    const { data } = await axios.get("/api/product/hero-banner");
    if (data && data.banners) return data.banners as HeroBanner[] | null;
    return null;
  } catch (error) {
    return null;
  }
}
