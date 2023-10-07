"use client";

import { ShoppingCart } from "lucide-react";
import { ReactNode, useEffect } from "react";
import Button from "../shared/button";
import { useGlobalContext } from "@/context/store";
import CartItem from "./cart-item";

const Drawer = ({ trigger }: { trigger: ReactNode }) => {
  const { cartItems, setCartItems } = useGlobalContext();

  useEffect(() => {
    // Get cart items from localStorage
    const itemsJSON = localStorage.getItem("cart-items");
    if (itemsJSON) {
      setCartItems(JSON.parse(itemsJSON));
    }
  }, []);

  return (
    <div>
      <input type="checkbox" id="cart-drawer" className="drawer-toggle" />

      <label htmlFor="cart-drawer">{trigger}</label>
      <label
        className="overlay"
        style={{ position: "fixed" }}
        htmlFor="cart-drawer"
      ></label>
      <div className="drawer drawer-right max-w-[30rem]">
        <div className="flex h-full flex-col p-0">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex gap-3">
              <ShoppingCart />
              <h2 className="text-xl font-medium uppercase">
                {cartItems.length === 0
                  ? "Cart"
                  : `${cartItems.length} Item in your Cart`}
              </h2>
            </div>
            <label
              htmlFor="cart-drawer"
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>
          <div className="scrollbar-thin max-h-[100%] overflow-y-scroll">
            {cartItems.length !== 0 ? (
              cartItems.map((item) => <CartItem {...item} />)
            ) : (
              <NoCartItem />
            )}
          </div>
          {cartItems.length !== 0 && (
            <div className="w-full border-t p-5">
              <Button className="rounded-none">Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;

const NoCartItem = () => {
  return (
    <div className="flex flex-col items-center space-y-3 pt-10">
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
      <h1 className="text-xl font-medium">Your shopping cart is empty</h1>
      <Button className="w-fit rounded-sm font-medium uppercase">
        Start Shopping
      </Button>
    </div>
  );
};
