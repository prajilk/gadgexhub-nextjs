import axios from "@/config/axios.config";
import { AddressResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getAddressClient() {
  const { data } = await axios.get("/api/user/address");
  return data as AddressResProps;
}

export function useGetAddress() {
  return useQuery(["user", "address"], getAddressClient);
}
