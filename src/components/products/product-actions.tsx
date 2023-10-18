"use client";

import { useSession } from "next-auth/react";
import Button from "../shared/button";
import { toast } from "sonner";
import { useAddToCart } from "@/api-hooks/cart/add-to-cart";
import LoadingButton from "../shared/loading-button";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";

type ProductActionsProps = {
  pid: string;
  quantity: number;
  color: string | null;
};

const ProductActions = (props: ProductActionsProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  async function onSuccess() {
    await queryClient.cancelQueries({ queryKey: ["user", "cart"] });
    await queryClient.invalidateQueries(["user", "cart"]);
    toast.success("Product successfully added to your shopping cart.");
    cart_mutation.reset();
  }

  async function onMutate() {
    if (!session?.user) {
      const guestUserIdCookie = getCookie("guest-id");
      if (!guestUserIdCookie) {
        const guestUserIdLocal = localStorage.getItem("guest-id");
        if (guestUserIdLocal) setCookie("guest-id", guestUserIdLocal);
      }
    }
  }

  const cart_mutation = useAddToCart({ onMutate, onSuccess });

  function addToCart() {
    cart_mutation.mutate({
      productId: props.pid,
      quantity: props.quantity + 1,
      color: props.color,
    });
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
