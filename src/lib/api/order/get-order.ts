import axios from "@/config/axios.config";
import { SingleOrderRes } from "@/lib/types/types";
import { AxiosError } from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getOrder(orderId: string) {
  try {
    const headerSequence = headers();
    const cookie = headerSequence.get("cookie");
    const { data } = await axios.get(`api/orders/${orderId}`, {
      headers: {
        Cookie: `${cookie}`,
      },
    });
    return data as SingleOrderRes;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data.user === null)
      redirect("/authentication");
    return null;
  }
}
