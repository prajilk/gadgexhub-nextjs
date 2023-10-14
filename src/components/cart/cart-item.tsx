import { useProductPrice } from "@/api-hooks/cart/get-product-price";
import { useGlobalContext } from "@/context/store";
import { CartItemProps } from "@/lib/types/types";
import { formatCurrency, textTruncate } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "../skeletons/skeleton";

const CartItem = (item: CartItemProps) => {
  const { cartItems, setCartItems } = useGlobalContext();

  const { data, isLoading } = useProductPrice(item.slug, item.id);

  // Function to update cart items in localStorage and state
  const updateCartItems = (updatedCartItems: CartItemProps[]) => {
    localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    updateCartItems(updatedCartItems);
  };

  const increaseQuantity = (id: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        // Decrease quantity by one for the matching item
        const newQuantity = item.quantity + 1 <= 5 ? item.quantity + 1 : 5;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };
  const decreaseQuantity = (id: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        // Increase quantity by one for the matching item
        const newQuantity = item.quantity + 1 >= 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const productUrl = `${item.url}${
    item.color !== null &&
    "&" + new URLSearchParams({ color: item.color.toLowerCase() })
  }}`;

  return (
    <div
      className="flex items-center justify-between border-b px-5 py-4 md:px-7 md:py-6"
      key={item.id}
    >
      <div className="flex items-center gap-5">
        <Link href={productUrl}>
          <Image
            src={item.image}
            width={110}
            height={110}
            className="bg-gray-200"
            alt="Product image"
          />
        </Link>
        <div>
          <Link href={productUrl}>
            <h1 className="font-medium md:text-lg">
              {textTruncate(item.title, 20)}
            </h1>
          </Link>
          <p className="nd:text-sm mb-3 text-xs">{item.color}</p>
          <div className="flex gap-5">
            <div className="flex w-fit rounded-md border border-[rgba(0,0,0,0.4)]">
              <button
                className="px-2"
                disabled={item.quantity <= 1}
                onClick={() => decreaseQuantity(item.id)}
              >
                <Minus size={15} />
              </button>
              <span className="min-w-[1em] py-0.5 text-center md:min-w-[1.5em] md:py-1">
                {item.quantity}
              </span>
              <button
                className="px-2"
                disabled={item.quantity >= 5}
                onClick={() => increaseQuantity(item.id)}
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              className="text-xs text-muted-foreground underline"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="text-right">
        {isLoading ? (
          <>
            <Skeleton className="mb-1 h-5 w-14" />
            <Skeleton className="h-4 w-14" />
          </>
        ) : (
          <>
            <h1 className="text-xs text-success md:text-base">
              {formatCurrency(data?.data?.offerPrice ?? 0)}
            </h1>
            <span className="text-xs line-through md:text-base">
              {formatCurrency(data?.data?.basePrice ?? 0)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;
