import axios from "@/config/axios.config";
import { AddressResProps } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getAddressServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/user/address", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as AddressResProps;
}
