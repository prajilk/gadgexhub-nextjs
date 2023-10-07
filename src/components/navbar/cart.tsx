"use client";

import { useGlobalContext } from "@/context/store";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cartItems } = useGlobalContext();

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart />
      {cartItems.length !== 0 && (
        <div className="badge badge-error badge-xs absolute -right-2 -top-1 translate-y-[-25%] p-2">
          <span className="absolute inset-0 translate-y-[20%]">
            {cartItems.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default Cart;
