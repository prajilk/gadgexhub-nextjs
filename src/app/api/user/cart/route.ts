import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import {
  createCart,
  createCartItem,
  createCartWithCartItems,
  createGuestUser,
  deleteCart,
  deleteCartItem,
  findCart,
  findCartItem,
  findCartWithProduct,
  findGuestUser,
  findGuestUserWithProduct,
  increaseQuantity,
  updateCartWithCartItem,
  updateQuantity,
} from "./helper";
import { error400, error500, getExpireDate, success200 } from "@/lib/utils";
import { getImageThumbnail, makeUrl } from "@/lib/cart-utils";
import { Cart, CartItem } from "@prisma/client";

type PostBody = {
  productId: string;
  quantity: number;
  color: string | null;
};
type PatchBody = {
  itemId: number;
  quantity: number;
};

async function handleNewCartItem(
  cart: { cartItems: CartItem[] } & Cart,
  body: PostBody,
) {
  const itemIndex = cart.cartItems.findIndex(
    (item) => item.productId === body.productId,
  );

  if (itemIndex === -1) {
    await createCartItem({ ...body, cartId: cart.id });
  } else {
    if (cart.cartItems[itemIndex].quantity >= 10) {
      return error400("Maximum quantity of 10 reached for this item!", {
        item: null,
      });
    }

    const isItemExist = cart.cartItems.findIndex(
      (item) => item.color === body.color,
    );

    if (isItemExist === -1) {
      await createCartItem({ ...body, cartId: cart.id });
      return success200({ item: {} });
    }
    await increaseQuantity(cart.cartItems[isItemExist].id);
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const guestId = req.cookies.get("guest-id")?.value;
    if (!session || !session.user || !session.user.id) {
      if (!guestId) {
        return success200({ item: [] });
      }
      const guestUser = await findGuestUserWithProduct(guestId);

      if (!guestUser || !guestUser.cart) {
        const res = error400("Invalid Guest ID.", { item: null });
        res.cookies.delete("guest-id");
        return res;
      }

      const cartItemsArray = guestUser.cart.cartItems.map((cartItem) => ({
        itemId: cartItem.id,
        pid: cartItem.productId,
        slug: cartItem.product.slug,
        title: cartItem.product.title,
        image: getImageThumbnail(
          { images: cartItem.product.images },
          cartItem.color,
        ),
        basePrice: cartItem.product.basePrice,
        offerPrice: cartItem.product.offerPrice,
        color: cartItem.color,
        quantity: cartItem.quantity,
        url: makeUrl(cartItem.product.slug, cartItem.productId, cartItem.color),
      }));

      return success200({ item: cartItemsArray.reverse() });
    }

    const userId = session.user.id;

    if (guestId) {
      // Retrieve the guest user and their cart
      const guestUser = await findGuestUser(guestId);

      if (guestUser && guestUser.cart) {
        // Check if the user is logged in (you need to have user's information)

        // Retrieve the user's cart
        const userCart = await findCart(userId);

        if (userCart) {
          // Iterate over guest user's cart items and merge into the user's cart
          guestUser.cart.cartItems.forEach((guestCartItem) => {
            // Check if the same product (based on productId and color) exists in the user's cart
            const existingUserCartItem = userCart.cartItems.find(
              (userCartItem) =>
                userCartItem.productId === guestCartItem.productId &&
                userCartItem.color === guestCartItem.color,
            );

            if (!existingUserCartItem) {
              // If the same product doesn't exist, add the guest cart item to the user's cart
              userCart.cartItems.push(guestCartItem);
            }
          });

          // Save the updated user's cart
          await updateCartWithCartItem({
            cartId: userCart.id,
            cartItems: userCart.cartItems,
          });
        } else {
          // If the user doesn't have a cart, create a new cart for them
          await createCartWithCartItems({
            userId,
            cartItems: guestUser.cart.cartItems,
          });
        }
        // Delete the guest user's cart
        await deleteCart(guestUser.cart.id);
      }
    }

    const cart = await findCartWithProduct(userId);

    if (!cart || cart.cartItems.length === 0) {
      const res = success200({ item: [] });
      res.cookies.delete("guest-id");
      return res;
    }

    const cartItemsArray = cart.cartItems.map((cartItem) => ({
      itemId: cartItem.id,
      pid: cartItem.productId,
      slug: cartItem.product.slug,
      title: cartItem.product.title,
      image: getImageThumbnail(
        { images: cartItem.product.images },
        cartItem.color,
      ),
      basePrice: cartItem.product.basePrice,
      offerPrice: cartItem.product.offerPrice,
      color: cartItem.color,
      quantity: cartItem.quantity,
      url: makeUrl(cartItem.product.slug, cartItem.productId, cartItem.color),
    }));

    const res = success200({ item: cartItemsArray.reverse() });
    res.cookies.delete("guest-id");
    return res;
  } catch (error) {
    return error500({ item: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body: PostBody | null = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return error400("Invalid data format.", { item: null });
    }

    if (!session || !session.user || !session.user.id) {
      const guestId = req.cookies.get("guest-id")?.value;
      if (!guestId) {
        const newGuestUser = await createGuestUser(getExpireDate()); // Create new Guest User
        const newGuestCart = await createCart({ guestUserId: newGuestUser.id }); //Create new Guest Cart
        await createCartItem({ ...body, cartId: newGuestCart.id }); // Create new CartItem with the Guest cart id

        const res = success200({ item: {} });
        res.cookies.set("guest-id", newGuestUser.id);

        return res;
      } else {
        const guestUser = await findGuestUser(guestId);
        if (!guestUser) {
          const res = error400("Invalid guest user ID in the cookie.", {
            item: null,
          });
          res.cookies.delete("guest-id");
          return res;
        }

        if (!guestUser.cart) {
          const newGuestCart = await createCart({ guestUserId: guestUser.id });
          await createCartItem({ ...body, cartId: newGuestCart.id });

          return success200({ item: {} });
        }

        await handleNewCartItem(guestUser.cart, body);
      }
      return success200({ item: {} });
    }

    const existingCart = await findCart(session.user.id);

    if (!existingCart) {
      const cart = await createCart({ userId: session.user.id });
      await createCartItem({ ...body, cartId: cart.id });

      return success200({ item: {} });
    }

    await handleNewCartItem(existingCart, body);

    return success200({ item: {} });
  } catch (error) {
    return error500({ item: null });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body: PatchBody | null = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return error400("Invalid data format.", { item: null });
    }

    const cartItem = await findCartItem(body.itemId);

    if (!cartItem) {
      return error400("No matching product found in your cart.", {
        item: null,
      });
    } else {
      if (cartItem.quantity > 10 || body.quantity > 10) {
        return error400("Maximum quantity of 10 reached for this item!", {
          item: null,
        });
      }
      if (cartItem.quantity < 1 || body.quantity < 1) {
        return error400("Minimum quantity is 1!", { item: null });
      }
      await updateQuantity(body.itemId, body.quantity);

      return success200({ item: {} });
    }
  } catch {
    return error500({ item: null });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const item_id = req.nextUrl.searchParams.get("itemId");
    if (!item_id) {
      return error400("Product ID missing from URL parameters.", {
        item: null,
      });
    }

    const item = await deleteCartItem(parseInt(item_id));

    if (!item) {
      return error400("No such item exists in your cart.", { item: null });
    }

    return success200({ item: [] });
  } catch (error) {
    return error500({ item: null });
  }
}
