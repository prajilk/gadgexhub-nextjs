import axios from "@/config/axios.config";
import { SingleAddressResProps } from "@/lib/types/types";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

interface UpdateAddressProps {
  address_id: number | undefined;
  data: z.infer<typeof ZodAddressSchema>;
}

export async function handleUpdate({ address_id, data }: UpdateAddressProps) {
  const { data: result } = await axios.put("/api/user/address", {
    address_id,
    data,
  });
  return result as SingleAddressResProps;
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      toast.success("Address saved successfully.");
    },
    onError: () => {
      toast.error("Error in saving address!");
    },
    onSettled: () => queryClient.invalidateQueries(["user", "address"]),
  });
}
