import axios from "@/config/axios.config";
import { CartItemRes } from "@/lib/types/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function removeCartItem(itemId: number) {
  const { data } = await axios.delete(`/api/user/cart?itemId=${itemId}`);
  return data as CartItemRes;
}

export function useRemoveFromCart(onSuccess: () => void) {
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess,
    onError: ({ response }) => {
      toast.error(response?.data.message);
    },
  });
}
