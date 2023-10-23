import axios from "@/config/axios.config";
import { CheckoutItemRes } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getCheckout() {
  try {
    const headerSequence = headers();
    const cookie = headerSequence.get("cookie");
    const { data } = await axios.get("api/checkout", {
      headers: {
        Cookie: `${cookie}`,
      },
    });
    return data as CheckoutItemRes;
  } catch (error) {
    return null;
  }
}
