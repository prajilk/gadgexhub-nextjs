import useSWR from "swr";
import { UserProps } from "../types/types";
import { fetcher } from "../utils";

export default function useUser() {
  const { data, error } = useSWR<UserProps>("/api/user", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const isLoading = !data && !error;

  return { data, error, isLoading };
}
