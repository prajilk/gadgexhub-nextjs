import axios from "@/config/axios.config";
import { CartItemRes } from "@/lib/types/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseAddToCartProps = {
  onSuccess?: () => void;
  onSettled?: () => void;
};

async function handleCart(values: {
  productId: string;
  quantity: number;
  color: string | null;
}) {
  const { data } = await axios.post("/api/user/cart", values);
  return data as CartItemRes;
}

export function useAddToCart({ onSuccess, onSettled }: UseAddToCartProps) {
  return useMutation({
    mutationKey: ["user", "cart", "add"],
    mutationFn: handleCart,
    onSuccess,
    onError: ({ response }) => {
      toast.error(response?.data.message);
    },
    onSettled,
  });
}
