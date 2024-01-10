import { CartItemProps } from "@/lib/types/types";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRemoveFromCart } from "@/api-hooks/cart/remove-cart-item";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useUpdateQuantity } from "@/api-hooks/cart/update-quantity";
import { useQueryClient } from "@tanstack/react-query";

const CartItem = (item: CartItemProps & { session: Session | null }) => {
  const queryClient = useQueryClient();

  async function onSuccessOnRemove() {
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
    remove_cart_item_mutation.mutate(item.itemId);
  };

  const increaseQuantity = () => {
    item_quantity_mutation.mutate({
      itemId: item.itemId,
      quantity: item.quantity + 1,
    });
  };
  const decreaseQuantity = () => {
    item_quantity_mutation.mutate({
      itemId: item.itemId,
      quantity: item.quantity - 1,
    });
  };

  const productUrl = `${item.url}${
    item.color !== null
      ? "&" + new URLSearchParams({ color: item.color.toLowerCase() })
      : ""
  }`;

  return (
    <div
      className="flex items-center justify-between border-b px-5 py-4 md:px-7 md:py-6"
      key={item.itemId}
    >
      <div className="relative flex items-center gap-5">
        {(remove_cart_item_mutation.isLoading ||
          item_quantity_mutation.isLoading) && (
          <div className="absolute z-10 flex h-full w-[100px] items-center justify-center bg-[rgba(0,0,0,0.1)]">
            <div className="h-fit w-fit rounded-full bg-white p-1 opacity-100">
              <Loader2 className="animate-spin text-black" size={25} />
            </div>
          </div>
        )}
        <Link href={productUrl} className="flex-shrink-0">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image}
            width={100}
            height={100}
            className="bg-gray-200"
            alt="Product image"
          />
        </Link>
        <div className="flex-grow-0">
          <Link href={productUrl}>
            <h1 className="cutoff-text text-sm font-medium md:text-base">
              {item.title}
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
        <h1 className="font-Roboto text-sm text-success md:text-base">
          {formatCurrency(item.offerPrice ?? 0)}
        </h1>
        <span className="font-Roboto text-sm line-through md:text-base">
          {formatCurrency(item.basePrice ?? 0)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
