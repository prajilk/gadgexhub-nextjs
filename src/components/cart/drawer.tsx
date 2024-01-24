"use client";

import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useGlobalContext } from "@/context/store";
import { useSession } from "next-auth/react";
import { useCartItems } from "@/api-hooks/cart/get-cart-items";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import CartItem from "./cart-item";
import SkeletonCartItem from "../skeletons/skeleton-cart-item";
import { formatCurrency } from "@/lib/utils";
import Cart from "../navbar/cart";
import { Button } from "@nextui-org/button";
import LinkButton from "../shared/link-button";

const Drawer = () => {
  const { cartItems, setCartItems } = useGlobalContext();

  const { data: session } = useSession();
  const { data: cartItemsSVR, isLoading } = useCartItems();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      const guestUserIdCookie = getCookie("guest-id");
      const guestUserIdLocal = localStorage.getItem("guest-id");

      if (!guestUserIdCookie) {
        if (guestUserIdLocal) setCookie("guest-id", guestUserIdLocal);
      } else if (!guestUserIdLocal) {
        localStorage.setItem("guest-id", guestUserIdCookie);
      }
    } else {
      localStorage.removeItem("guest-id");
    }

    if (cartItemsSVR?.item) {
      setCartItems(cartItemsSVR.item);
    }
  }, [session, setCartItems, cartItemsSVR?.item]);

  const handleCheckout = () => {
    if (!session?.user) {
      return router.push("/authentication");
    }
    router.push("/checkout");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Cart />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 p-0 md:max-w-[30rem]">
        <SheetHeader className="border-b">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex gap-3">
              <ShoppingCart />
              <h2 className="text-xl font-medium uppercase">
                {cartItems.length === 0
                  ? "Cart"
                  : `${cartItems.length} Item in your Cart`}
              </h2>
            </div>
          </div>
        </SheetHeader>
        <div className="scrollbar-thin max-h-[100%] overflow-y-scroll">
          {cartItems.length !== 0 ? (
            cartItems.map((item, i) => (
              <CartItem {...item} session={session} key={i} />
            ))
          ) : isLoading ? (
            <SkeletonCartItem />
          ) : (
            <NoCartItem />
          )}
        </div>
        <SheetFooter className="mt-auto">
          {cartItems.length !== 0 && (
            <div className="w-full border-t p-5">
              <Button
                color="primary"
                className="w-full"
                onClick={handleCheckout}
              >
                Checkout
                <span className="ms-2 font-Roboto">
                  {formatCurrency(
                    cartItems.reduce(
                      (acc, curr) => acc + curr.offerPrice * curr.quantity,
                      0,
                    ),
                  )}
                </span>
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;

const NoCartItem = () => {
  return (
    <div className="flex flex-col items-center pt-10">
      <svg
        width="150"
        height="150"
        viewBox="0 0 284 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="15" y="33" width="41" height="20" rx="10" fill="gray" />
        <rect
          x="53.4352"
          y="33"
          width="157"
          height="20"
          rx="10"
          transform="rotate(67.1846 53.4352 33)"
          fill="gray"
        />
        <path
          d="M58.8792 92.8964C56.0897 86.303 60.9297 79 68.0889 79H243.828C250.738 79 255.566 85.8415 253.25 92.3519L223.365 176.352C221.947 180.338 218.174 183 213.944 183H103.627C99.6102 183 95.983 180.596 94.4177 176.896L58.8792 92.8964Z"
          fill="gray"
        />
        <circle cx="116.5" cy="212.5" r="16" fill="gray" />
        <circle cx="198.5" cy="212.5" r="16" fill="gray" />
        <rect
          x="100"
          y="9.47233"
          width="16"
          height="55"
          rx="8"
          transform="rotate(-20 100 9.47233)"
          fill="gray"
        />
        <rect
          x="147.923"
          y="4.07771"
          width="16"
          height="55"
          rx="8"
          fill="gray"
        />
        <rect
          x="197.734"
          y="4.07771"
          width="16"
          height="55"
          rx="8"
          transform="rotate(20 197.734 4.07771)"
          fill="gray"
        />
      </svg>
      <h1 className="my-5 text-xl font-medium">Your shopping cart is empty</h1>
      <LinkButton
        href="/store"
        className="font-medium uppercase"
        color="primary"
        size="sm"
      >
        Start Shopping
      </LinkButton>
    </div>
  );
};
