import axios from "@/config/axios.config";
import { CartItemQuantity, CartItemQuantityRes } from "@/lib/types/types";
import { useMutation } from "@tanstack/react-query";

async function handleQuantity(values: CartItemQuantity) {
  const { data } = await axios.patch("/api/user/cart", values);
  return data as CartItemQuantityRes;
}

export function useUpdateQuantity(onSettled: () => void) {
  return useMutation({
    mutationFn: handleQuantity,
    onSettled,
  });
}
