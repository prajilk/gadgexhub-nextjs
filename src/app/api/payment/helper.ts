import { db } from "@/lib/prisma";
import { uid } from "uid";

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
  amount: number,
  userId: string,
  addressId: number,
  orderItems: any,
) {
  return await db.order.create({
    data: {
      id: uid().toUpperCase(),
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
  });
}

async function createPayment(values: any) {
  return await db.payment.create({
    data: {
      rzr_order_id: values.razorpay_order_id,
      rzr_payment_id: values.razorpay_payment_id,
      rzr_payment_signature: values.razorpay_signature,
      orderId: values.order_id,
    },
  });
}

export {
  getCartItems,
  getProductWithImages,
  createOrder,
  updateOrder,
  createPayment,
};
