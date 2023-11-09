import axios from "@/config/axios.config";
import { AllOrdersRes } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getAllOrders({ pageParam = 1 }) {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  try {
    const { data } = await axios.get("api/orders", {
      params: { page: pageParam },
      headers: {
        Cookie: `${cookie}`,
      },
    });
    return data as AllOrdersRes;
  } catch (error) {
    return null;
  }
}
