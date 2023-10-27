import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { CheckoutItemProps } from "@/lib/types/types";
import { error400, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import Razorpay from "razorpay";
import { uid } from "uid";
import { createOrder, getCartItems, getProductWithImages } from "./helper";

// Initialize razorpay object
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req: NextRequest) {
  let amount: number;
  let orderItems = [];
  try {
    const { addressId } = await req.json();
    if (!addressId) return error400("Missing delivery address id", {});

    const checkoutCookie = req.cookies.get("checkout")?.value || "";
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { user: null });
    }
    const userId = session.user.id;

    if (checkoutCookie !== "") {
      const decodedItem: CheckoutItemProps = JSON.parse(atob(checkoutCookie));
      const dbProduct = await getProductWithImages(decodedItem.productId);

      if (!dbProduct) {
        return error400(
          "The request is missing or contains an invalid product ID & Product Slug",
          { products: null },
        );
      }

      amount =
        dbProduct.offerPrice *
        (decodedItem.quantity !== 0 ? decodedItem.quantity : 1);

      const orderItem = {
        productId: dbProduct.id,
        quantity: decodedItem.quantity,
        color: decodedItem.color,
        amount,
      };

      orderItems.push(orderItem);
    } else {
      const cartItems = await getCartItems(userId);

      if (!cartItems || cartItems.cartItems.length === 0) {
        return error400("User cart is empty!", { products: null });
      }
      amount = cartItems.cartItems.reduce(
        (acc, curr) =>
          acc +
          curr.product.offerPrice * (curr.quantity !== 0 ? curr.quantity : 1),
        0,
      );

      orderItems = cartItems.cartItems.map((cartItem) => ({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        color: cartItem.color,
        amount:
          cartItem.product.offerPrice *
          (cartItem.quantity !== 0 ? cartItem.quantity : 1),
      }));
    }

    const order = await createOrder(amount, userId, addressId, orderItems);

    const response = await razorpay.orders.create({
      amount: (amount * 100).toString(),
      currency: "INR",
      receipt: uid(),
      payment_capture: true,
    });
    return success200({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      orderId: order.id,
    });
  } catch (error) {
    return error500({});
  }
}
