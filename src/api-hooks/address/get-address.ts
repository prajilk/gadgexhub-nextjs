import axios from "@/config/axios.config";
import { useQuery } from "@tanstack/react-query";

function getAddressClient() {
  return axios.get("/api/user/address");
}

export function useGetAddress() {
  return useQuery(["user", "address"], getAddressClient);
}
