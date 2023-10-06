import axios from "@/config/axios.config";
import { AddressProps, AddressResProps } from "@/lib/types/types";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

type ResponseProps = Omit<AddressResProps, "addresses"> & {
  addresses: AddressProps;
};

async function handleCreate(values: z.infer<typeof ZodAddressSchema>) {
  const { data } = await axios.post("/api/user/address", values);
  return data as ResponseProps;
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleCreate,
    onSuccess: () => {
      toast.success("Address saved successfully.");
    },
    onError: ({ response }) => {
      toast.error(response.data?.message);
    },
    onSettled: () => queryClient.invalidateQueries(["user", "address"]),
  });
}
