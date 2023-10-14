import axios from "@/config/axios.config";
import { AddProductResProps } from "@/lib/types/types";
import { ZodProductSchema } from "@/lib/zodSchemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleCreate(values: z.infer<typeof ZodProductSchema>) {
  const { data } = await axios.post("/api/admin/products", values);
  return data as AddProductResProps;
}

export function useAddProduct(onSuccess: () => void) {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleCreate,
    onSuccess,
    onError: ({ response }) => {
      toast.error(response.data?.message);
    },
    // onSettled: () => queryClient.invalidateQueries(["admin", "products"]),
  });
}
