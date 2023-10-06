import axios from "@/config/axios.config";
import { UserResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getUser() {
  const { data } = await axios.get("/api/user");
  return data as UserResProps;
}

export function useUser() {
  return useQuery(["user"], getUser);
}
