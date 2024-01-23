import axios from "@/config/axios.config";
import { MarqueeOffersRes } from "../types/types";

export async function getMarqueeOffers() {
  try {
    const { data } = await axios.get("/api/offers/marquee");
    if (data) return data as MarqueeOffersRes;
    return null;
  } catch (error) {
    return null;
  }
}
