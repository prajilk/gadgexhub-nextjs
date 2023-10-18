import { db } from "@/lib/prisma";

type CreateCartProps = {
  userId?: string;
  guestUserId?: string;
};

type CreateCartItemProps = {
  quantity: number;
  color: string | null;
  productId: string;
  cartId: number;
};

async function createGuestUser(expirationDate: Date) {
  return await db.guestUser.create({
    data: {
      expirationDate,
    },
  });
}

async function createCart({ userId, guestUserId }: CreateCartProps) {
  return await db.cart.create({
    data: {
      guestUserId: guestUserId,
      userId: userId,
    },
  });
}

async function createCartItem({
  quantity,
  color,
  productId,
  cartId,
}: CreateCartItemProps) {
  return await db.cartItem.create({
    data: {
      quantity,
      color,
      productId,
      cartId,
    },
  });
}

async function findGuestUser(guestId: string) {
  return await db.guestUser.findUnique({
    where: {
      id: guestId,
    },
    include: {
      cart: {
        include: {
          cartItems: true,
        },
      },
    },
  });
}

async function findCart(userId: string) {
  return await db.cart.findUnique({
    where: {
      userId,
    },
    include: {
      cartItems: true,
    },
  });
}

async function increaseQuantity(id: number) {
  return await db.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: {
        increment: 1,
      },
    },
  });
}

export {
  createGuestUser,
  createCart,
  createCartItem,
  findGuestUser,
  findCart,
  increaseQuantity,
};
