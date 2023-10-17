import { useProductPrice } from "@/api-hooks/cart/get-product-price";
import { useGlobalContext } from "@/context/store";
import { CartItemProps } from "@/lib/types/types";
import { formatCurrency, textTruncate } from "@/lib/utils";
import { Loader2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "../skeletons/skeleton";
import { useRemoveFromCart } from "@/api-hooks/cart/remove-cart-item";
import { Session } from "next-auth";
import { toast } from "sonner";
import getQueryClient from "@/lib/query-utils/get-query-client";
import { useUpdateQuantity } from "@/api-hooks/cart/update-quantity";

const CartItem = (item: CartItemProps & { session: Session | null }) => {
  const { cartItems, setCartItems } = useGlobalContext();
  const queryClient = getQueryClient();

  const { data, isLoading } = useProductPrice(item.slug, item.id);

  // Function to update cart items in localStorage and state
  const updateCartItems = (updatedCart: CartItemProps[]) => {
    localStorage.setItem("cart-items", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  async function onSuccessOnRemove() {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    updateCartItems(updatedCart);
    await queryClient.cancelQueries({ queryKey: ["user", "cart"] });
    await queryClient.invalidateQueries(["user", "cart"]);
    toast.success("Product successfully removed from your shopping cart.");
  }

  async function onSettledOnQuantity() {
    await queryClient.cancelQueries({ queryKey: ["user", "cart"] });
    await queryClient.invalidateQueries(["user", "cart"]);
  }

  const remove_cart_item_mutation = useRemoveFromCart(onSuccessOnRemove);
  const item_quantity_mutation = useUpdateQuantity(onSettledOnQuantity); // Mutation for increase or decrease quantity

  const removeFromCart = () => {
    if (item.session?.user) {
      remove_cart_item_mutation.mutate(item.id);
    } else {
      const updatedCart = cartItems.filter(
        (cartItem) => cartItem.id !== item.id,
      );
      updateCartItems(updatedCart);
      toast.success("Product successfully removed from your shopping cart.");
    }
  };

  const increaseQuantity = () => {
    if (item.session?.user) {
      item_quantity_mutation.mutate({
        productId: item.id,
        quantity: item.quantity + 1,
      });
    }
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        // Decrease quantity by one for the matching item
        const newQuantity =
          cartItem.quantity + 1 <= 10 ? cartItem.quantity + 1 : 10;
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    updateCartItems(updatedCartItems);
  };
  const decreaseQuantity = () => {
    if (item.session?.user) {
      item_quantity_mutation.mutate({
        productId: item.id,
        quantity: item.quantity - 1,
      });
    }
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        // Increase quantity by one for the matching item
        const newQuantity =
          cartItem.quantity + 1 >= 1 ? cartItem.quantity - 1 : 1;
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    updateCartItems(updatedCartItems);
  };

  const productUrl = `${item.url}${
    item.color !== null
      ? "&" + new URLSearchParams({ color: item.color.toLowerCase() })
      : ""
  }`;

  return (
    <div
      className="flex items-center justify-between border-b px-5 py-4 md:px-7 md:py-6"
      key={item.id}
    >
      <div className="relative flex items-center gap-5">
        {(remove_cart_item_mutation.isLoading ||
          item_quantity_mutation.isLoading) && (
          <div className="absolute z-10 flex h-full w-[110px] items-center justify-center bg-[rgba(0,0,0,0.1)]">
            <div className="h-fit w-fit rounded-full bg-white p-1 opacity-100">
              <Loader2 className="animate-spin text-black" size={25} />
            </div>
          </div>
        )}
        <Link href={productUrl} className="flex-shrink-0">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image}
            width={110}
            height={110}
            className="bg-gray-200"
            alt="Product image"
          />
        </Link>
        <div className="flex-grow-0">
          <Link href={productUrl}>
            <h1 className="text-sm font-medium md:text-base">
              {textTruncate(item.title, 25)}
            </h1>
          </Link>
          <p className="nd:text-sm mb-3 text-xs">{item.color}</p>
          <div className="flex gap-5">
            <div className="flex w-fit rounded-md border border-[rgba(0,0,0,0.4)]">
              <button
                className="px-2 disabled:cursor-not-allowed"
                disabled={
                  item.quantity <= 1 ||
                  remove_cart_item_mutation.isLoading ||
                  item_quantity_mutation.isLoading
                }
                onClick={decreaseQuantity}
              >
                <Minus size={15} />
              </button>
              <span className="min-w-[1em] py-0.5 text-center md:min-w-[1.5em] md:py-1">
                {item.quantity}
              </span>
              <button
                className="px-2 disabled:cursor-not-allowed"
                disabled={
                  item.quantity >= 10 ||
                  remove_cart_item_mutation.isLoading ||
                  item_quantity_mutation.isLoading
                }
                onClick={increaseQuantity}
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              className="text-xs text-muted-foreground underline"
              onClick={removeFromCart}
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
