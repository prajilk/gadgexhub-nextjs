import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import {
  createCart,
  createCartItem,
  createGuestUser,
  findCart,
  findGuestUser,
  increaseQuantity,
} from "./helper";
import { error400, error500, getExpireDate, success200 } from "@/lib/utils";
import { getImageThumbnail, makeUrl } from "@/lib/cart-utils";

type PostBody = {
  productId: string;
  quantity: number;
  color: string | null;
};
type PatchBody = {
  itemId: number;
  quantity: number;
};

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      const guestId = req.cookies.get("guest-id")?.value;
      if (!guestId) {
        return success200({ item: [] });
      }
      const guestUser = await db.guestUser.findUnique({
        where: {
          id: guestId,
        },
        include: {
          cart: {
            include: {
              cartItems: {
                include: {
                  product: {
                    include: {
                      images: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

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
        color: cartItem.color,
        quantity: cartItem.quantity,
        url: makeUrl(cartItem.product.slug, cartItem.productId, cartItem.color),
      }));

      return success200({ item: cartItemsArray.reverse() });
    }

    const userId = session.user.id;
    const cart = await db.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.cartItems.length === 0) return success200({ item: [] });

    const cartItemsArray = cart.cartItems.map((cartItem) => ({
      itemId: cartItem.id,
      pid: cartItem.productId,
      slug: cartItem.product.slug,
      title: cartItem.product.title,
      image: getImageThumbnail(
        { images: cartItem.product.images },
        cartItem.color,
      ),
      color: cartItem.color,
      quantity: cartItem.quantity,
      url: makeUrl(cartItem.product.slug, cartItem.productId, cartItem.color),
    }));

    return success200({ item: cartItemsArray.reverse() });
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

        const itemIndex = guestUser.cart.cartItems.findIndex(
          (item) => item.productId === body.productId,
        );

        if (itemIndex === -1) {
          await createCartItem({ ...body, cartId: guestUser.cart.id });
        } else {
          if (guestUser.cart.cartItems[itemIndex].quantity >= 10) {
            return error400("Maximum quantity of 10 reached for this item!", {
              item: null,
            });
          }
          if (guestUser.cart.cartItems[itemIndex].color !== body.color) {
            await createCartItem({ ...body, cartId: guestUser.cart.id });
            return success200({ item: {} });
          }
          await increaseQuantity(guestUser.cart.cartItems[itemIndex].id);
        }
      }
      return success200({ item: {} });
    }

    const existingCart = await findCart(session.user.id);

    if (!existingCart) {
      const cart = await createCart({ userId: session.user.id });
      await createCartItem({ ...body, cartId: cart.id });
    } else {
      const itemIndex = existingCart.cartItems.findIndex(
        (item) => item.productId === body.productId,
      );

      if (itemIndex === -1) {
        await createCartItem({ ...body, cartId: existingCart.id });
      } else {
        if (existingCart.cartItems[itemIndex].quantity >= 10) {
          return error400("Maximum quantity of 10 reached for this item!", {
            item: null,
          });
        }
        await increaseQuantity(existingCart.cartItems[itemIndex].id);
      }
    }

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

    const cartItem = await db.cartItem.findUnique({
      where: {
        id: body.itemId,
      },
    });

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
      await db.cartItem.update({
        where: {
          id: body.itemId,
        },
        data: {
          quantity: body.quantity,
        },
      });

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

    const item = await db.cartItem.delete({
      where: {
        id: parseInt(item_id),
      },
    });

    if (!item) {
      return error400("No such item exists in your cart.", { item: null });
    }

    return success200({ item: [] });
  } catch (error) {
    return error500({ item: null });
  }
}
