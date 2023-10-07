"use client";

import { useSession } from "next-auth/react";
import Button from "../shared/button";
import { ProductActionsProps, useGlobalContext } from "@/context/store";

const ProductActions = (props: ProductActionsProps) => {
  const { setCartItems } = useGlobalContext();
  const { data: session } = useSession();

  function addToLocalStorage(values: ProductActionsProps) {
    const cartItem = localStorage.getItem("cart-items") || "[]";
    const existingCartItems: ProductActionsProps[] = JSON.parse(cartItem);

    if (!existingCartItems.find((item) => item.id === values.id)) {
      existingCartItems.push(values);
      localStorage.setItem("cart-items", JSON.stringify(existingCartItems));
      setCartItems(existingCartItems);
    }
  }

  function addToCart() {
    if (!session || !session.user) {
      addToLocalStorage(props);
    }
  }

  return (
    <div className="space-y-4">
      <Button
        className="rounded-none py-6 text-base uppercase"
        onClick={addToCart}
      >
        Add to cart
      </Button>
      <Button className="rounded-none bg-secondaryTheme py-6 text-base uppercase hover:bg-secondaryTheme hover:bg-opacity-60">
        Buy it now
      </Button>
    </div>
  );
};

export default ProductActions;
