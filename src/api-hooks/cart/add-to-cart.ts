import axios from "@/config/axios.config";
import { CartItemRes } from "@/lib/types/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseAddToCartProps = {
  onMutate?: () => void;
  onSuccess?: () => void;
};

async function handleCart(values: {
  productId: string;
  quantity: number;
  color: string | null;
}) {
  const { data } = await axios.post("/api/user/cart", values);
  return data as CartItemRes;
}

export function useAddToCart({ onMutate, onSuccess }: UseAddToCartProps) {
  return useMutation({
    mutationFn: handleCart,
    onMutate,
    onSuccess,
    onError: ({ response }) => {
      toast.error(response?.data.message);
    },
  });
}
