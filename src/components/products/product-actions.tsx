"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useAddToCart } from "@/api-hooks/cart/add-to-cart";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";

type ProductActionsProps = {
  pid: string;
  quantity: number;
  color: string | null;
  slug: string;
  stock: number;
};

const ProductActions = (props: ProductActionsProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const pathname = usePathname(); // Get pathname
  const searchParams = useSearchParams(); // Get all searchParams
  const pid = searchParams.get("pid");
  const clr = searchParams.get("color");

  // Callback Url for redirect after login success.
  const callbackUrl =
    pathname +
    (pid ? `?pid=${pid}` : "") +
    (clr ? `&${new URLSearchParams({ color: clr })}` : "");

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
      setCookie("originCallbackUrl", callbackUrl); // Set callbackUrl to cookie for redirect after login success
      return router.push(`/authentication`);
    }
    const item = {
      productId: props.pid,
      quantity: props.quantity + 1,
      color: props.color,
    };

    deleteCookie("checkout");
    setCookie("checkout", btoa(JSON.stringify(item)), {
      maxAge: 60 * 10,
    });
    router.push("/checkout");
  }

  return (
    <div className="mt-6 space-y-4">
      <Button
        isLoading={cart_mutation.isLoading}
        radius="none"
        color="primary"
        size="lg"
        className="w-full uppercase"
        onClick={addToCart}
      >
        {props.stock === 0 ? "Out Of Stock" : "Add to cart"}
      </Button>
      <Button
        onClick={buyNow}
        disabled={props.stock === 0}
        radius="none"
        color="danger"
        size="lg"
        className="w-full uppercase"
      >
        Buy it now
      </Button>
    </div>
  );
};

export default ProductActions;
