import axios from "@/config/axios.config";
import { SingleAddressResProps } from "@/lib/types/types";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleCreate(values: z.infer<typeof ZodAddressSchema>) {
  const { data } = await axios.post("/api/user/address", values);
  return data as SingleAddressResProps;
}

export function useCreateAddress(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleCreate,
    onSuccess,
    onError: ({ response }) => {
      toast.error(response.data?.message);
    },
    onSettled: () => queryClient.invalidateQueries(["user", "address"]),
  });
}
