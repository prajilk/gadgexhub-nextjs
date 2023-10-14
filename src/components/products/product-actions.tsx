"use client";

import { useSession } from "next-auth/react";
import Button from "../shared/button";
import { useGlobalContext } from "@/context/store";
import { CartItemProps } from "@/lib/types/types";
import { toast } from "sonner";

const ProductActions = (props: CartItemProps) => {
  const { setCartItems } = useGlobalContext();
  const { data: session } = useSession();

  function addToLocalStorage(values: CartItemProps) {
    const existingCartItems: CartItemProps[] = getCartItemsFromLocalStorage();

    const existingProduct = existingCartItems.find(
      (item) => item.id === values.id,
    );

    if (!existingProduct) {
      addToCartAndPersist(values, existingCartItems);
    } else {
      if (existingProduct.quantity >= 10) {
        return toast.error("Maximum quantity of 10 reached for this item!");
      }
      updateCartItemAndPersist(values, existingCartItems);
    }

    toast.success("Product successfully added to your shopping cart.");
  }

  function getCartItemsFromLocalStorage(): CartItemProps[] {
    const cartItem = localStorage.getItem("cart-items") || "[]";
    return JSON.parse(cartItem);
  }

  function addToCartAndPersist(
    item: CartItemProps,
    cartItems: CartItemProps[],
  ) {
    cartItems.push(item);
    persistCartItems(cartItems);
  }

  function updateCartItemAndPersist(
    updatedItem: CartItemProps,
    cartItems: CartItemProps[],
  ) {
    const updatedCartItems = cartItems.map((item) =>
      item.id === updatedItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    persistCartItems(updatedCartItems);
  }

  function persistCartItems(cartItems: CartItemProps[]) {
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    setCartItems(cartItems);
  }

  function addToCart() {
    if (!session || !session.user) {
      addToLocalStorage(props);
    }
  }

  return (
    <div className="mt-6 space-y-4">
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
