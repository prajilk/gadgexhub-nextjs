import { headers } from "next/headers";
import axios from "@/config/axios.config";
import { AddressResProps } from "@/lib/types/types";

export async function getAddress() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");

  const { data } = await axios.get("/api/user/address", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as AddressResProps;
}
