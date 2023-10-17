import axios from "@/config/axios.config";
import { CartItemsRes } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

const getCartItems = async () => {
  const { data } = await axios.get("/api/user/cart");
  return data as CartItemsRes;
};

export function useCartItems() {
  return useQuery({
    queryKey: ["user", "cart"],
    queryFn: getCartItems,
  });
}
