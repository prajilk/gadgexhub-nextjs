import { authOptions } from "@/lib/auth";
import { error400, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { findCartWithProduct } from "../user/cart/helper";
import { NextRequest } from "next/server";
import { getImageThumbnail } from "@/lib/cart-utils";
import { CheckoutItemProps } from "@/lib/types/types";
import { db } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const checkoutCookie = req.cookies.get("checkout")?.value || "";
    if (checkoutCookie !== "") {
      const decodedItem: CheckoutItemProps = JSON.parse(atob(checkoutCookie));
      const dbProduct = await db.product.findUnique({
        where: {
          id: decodedItem.productId,
        },
        include: {
          images: true,
        },
      });

      if (!dbProduct) {
        return error400(
          "The request is missing or contains an invalid product ID & Product Slug",
          { products: null },
        );
      }

      return success200({
        products: [
          {
            id: decodedItem.productId,
            quantity: decodedItem.quantity,
            basePrice: dbProduct.basePrice,
            offerPrice: dbProduct.offerPrice,
            title: dbProduct.title,
            image: getImageThumbnail(
              { images: dbProduct.images },
              decodedItem.color,
            ),
          },
        ],
      });
    } else {
      const session = await getServerSession(authOptions);
      if (!session || !session.user || !session.user.id) {
        return error400("Missing user ID in the session.", { user: null });
      }
      const userId = session.user.id;
      const cartItems = await findCartWithProduct(userId);
      if (!cartItems || cartItems.cartItems.length === 0) {
        return error400("User cart is empty!", { products: null });
      }

      const checkoutItems = cartItems.cartItems.map((cartItem) => {
        return {
          id: cartItem.productId,
          quantity: cartItem.quantity,
          basePrice: cartItem.product.basePrice,
          offerPrice: cartItem.product.offerPrice,
          title: cartItem.product.title,
          image: getImageThumbnail(
            { images: cartItem.product.images },
            cartItem.color,
          ),
        };
      });

      return success200({
        products: checkoutItems,
      });
    }
  } catch (error) {
    error500({ products: null });
  }
}
