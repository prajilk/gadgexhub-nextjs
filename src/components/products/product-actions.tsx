"use client";

import { useSession } from "next-auth/react";
import Button from "../shared/button";
import { toast } from "sonner";
import { useAddToCart } from "@/api-hooks/cart/add-to-cart";
import LoadingButton from "../shared/loading-button";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type ProductActionsProps = {
  pid: string;
  quantity: number;
  color: string | null;
  slug: string;
};

const ProductActions = (props: ProductActionsProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

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

  function buyNow() {
    if (!session?.user) {
      return router.push("/authentication");
    }
    const item = {
      productId: props.pid,
      quantity: props.quantity + 1,
      color: props.color,
    };
    const checkoutExpires = new Date(new Date().getTime() + 10 * 60000); // 10 minutes
    deleteCookie("checkout");
    setCookie("checkout", btoa(JSON.stringify(item)), {
      expires: checkoutExpires,
    });
    router.push("/checkout");
  }

  return (
    <div className="mt-6 space-y-4">
      <LoadingButton
        loader={cart_mutation.isLoading}
        disabled={cart_mutation.isLoading}
        className="rounded-none py-6 text-base font-normal uppercase"
        onClick={addToCart}
      >
        Add to cart
      </LoadingButton>
      <Button
        onClick={buyNow}
        className="btn rounded-none bg-secondaryTheme py-6 text-base font-normal uppercase hover:bg-secondaryTheme hover:bg-opacity-60"
      >
        Buy it now
      </Button>
    </div>
  );
};

export default ProductActions;
