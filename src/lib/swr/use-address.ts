import useSWR from "swr";
import { AddressResProps } from "../types/types";
import { fetcher } from "../utils";

export default function useAddress() {
  const { data, error } = useSWR<AddressResProps>(
    "/api/user/address",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

  const isLoading = !data && !error;

  return { data, error, isLoading };
}
