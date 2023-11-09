import axios from "@/config/axios.config";
import { CheckoutItemRes } from "@/lib/types/types";
import { AxiosError } from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.data.user === null)
      redirect("/authentication");
    return null;
  }
}
