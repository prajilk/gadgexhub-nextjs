import axios from "@/config/axios.config";
import { SingleOrderRes } from "@/lib/types/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getOrder(orderId: string) {
  try {
    const headerSequence = headers();
    const cookie = headerSequence.get("cookie");
    const { data } = await axios.get(`api/order/${orderId}`, {
      headers: {
        Cookie: `${cookie}`,
      },
    });
    return data as SingleOrderRes;
  } catch (error: any) {
    if (error.response.data.user === null) redirect("/authentication");
    return null;
  }
}
