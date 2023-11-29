import { db } from "@/lib/prisma";

async function getProductWithImages(productId: string) {
  return await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
}

async function getCartItems(userId: string) {
  return await db.cart.findUnique({
    where: {
      userId,
    },
    include: {
      cartItems: {
        select: {
          product: {
            select: {
              offerPrice: true,
              basePrice: true,
            },
          },
          quantity: true,
          color: true,
          productId: true,
        },
      },
    },
  });
}

async function createOrder(
  orderId: string,
  amount: number,
  userId: string,
  addressId: number,
  orderItems: any,
) {
  return await db.order.create({
    data: {
      id: orderId,
      total: amount,
      userId,
      addressId,
      orderItems: {
        createMany: {
          data: orderItems,
        },
      },
    },
  });
}

async function updateOrder(order_id: string) {
  return await db.order.update({
    data: {
      payment_verified: true,
      status: "placed",
    },
    where: {
      id: order_id,
    },
    include: {
      orderItems: true
    }
  });
}

async function createPayment(values: any) {
  return await db.payment.create({
    data: values,
  });
}

export {
  getCartItems,
  getProductWithImages,
  createOrder,
  updateOrder,
  createPayment,
};
