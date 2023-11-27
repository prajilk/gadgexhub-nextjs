"use client";

import { useGlobalContext } from "@/context/store";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@nextui-org/badge";

const Cart = () => {
  const { cartItems } = useGlobalContext();

  return (
    <Badge
      content={cartItems.length}
      color="danger"
      classNames={{
        badge: "text-xs",
      }}
      isInvisible={cartItems.length === 0}
    >
      <ShoppingCart />
    </Badge>
  );
};

export default Cart;
