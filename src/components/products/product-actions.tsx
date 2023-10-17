"use client";

import { useSession } from "next-auth/react";
import Button from "../shared/button";
import { useGlobalContext } from "@/context/store";
import { CartItemProps } from "@/lib/types/types";
import { toast } from "sonner";
import { useAddToCart } from "@/api-hooks/cart/add-to-cart";
import LoadingButton from "../shared/loading-button";
import getQueryClient from "@/lib/query-utils/get-query-client";

const ProductActions = (props: CartItemProps) => {
  const { setCartItems } = useGlobalContext();
  const { data: session } = useSession();
  const queryClient = getQueryClient();

  function addToLocalStorage(values: CartItemProps) {
    const existingCartItems: CartItemProps[] = getCartItemsFromLocalStorage();

    const existingProduct = existingCartItems.find(
      (item) => item.id === values.id,
    );

    if (!existingProduct) {
      addToCartAndPersist(values, existingCartItems);
    } else {
      if (existingProduct.quantity >= 10) {
        return (
          !session?.user &&
          toast.error("Maximum quantity of 10 reached for this item!")
        );
      }
      updateCartItemAndPersist(values, existingCartItems);
    }

    !session?.user &&
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
    cartItems.push({ ...item, quantity: item.quantity + 1 });
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

  async function onSuccess() {
    addToLocalStorage(props);
    await queryClient.cancelQueries({ queryKey: ["user", "cart"] });
    await queryClient.invalidateQueries(["user", "cart"]);
    toast.success("Product successfully added to your shopping cart.");
    cart_mutation.reset();
  }

  const cart_mutation = useAddToCart({ onSuccess });

  function addToCart() {
    if (session?.user) {
      cart_mutation.mutate({
        productId: props.id,
        quantity: props.quantity + 1,
        color: props.color,
      });
    } else {
      addToLocalStorage(props);
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <LoadingButton
        loader={cart_mutation.isLoading}
        disabled={cart_mutation.isLoading}
        className="rounded-none py-6 text-base uppercase"
        onClick={addToCart}
      >
        Add to cart
      </LoadingButton>
      <Button className="rounded-none bg-secondaryTheme py-6 text-base uppercase hover:bg-secondaryTheme hover:bg-opacity-60">
        Buy it now
      </Button>
    </div>
  );
};

export default ProductActions;
