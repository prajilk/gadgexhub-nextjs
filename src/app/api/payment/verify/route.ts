import { NextRequest } from "next/server";
import crypto from "crypto";
import { error400, error500, success200 } from "@/lib/utils";
import { createPayment, updateOrder } from "../helper";
import { db } from "@/lib/prisma";

const getPaymentVia = (method: string, payload: any) => {
  if (method === "netbanking") return payload["bank"];
  else if (method === "wallet") return payload["wallet"];
  else if (method === "upi") return payload["vpa"];
  else if (method === "card") {
    return payload["card"].last4 + "," + payload["card"].network;
  } else return null;
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const payloadEntity = data.payload.payment.entity;
    const order_id = payloadEntity.order_id.split("_")[1].toUpperCase();

    if (data.event === "payment.failed") {
      await db.order.delete({
        where: {
          id: order_id,
        },
      });
      return error400("Payment failed", { verified: false });
    }

    const shasum = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_WEBHOOK_SECRET!,
    );
    shasum.update(JSON.stringify(data));
    const digest = shasum.digest("hex");

    if (digest === req.headers.get("x-razorpay-signature")) {
      const successOrder = await updateOrder(order_id);
      for (const order of successOrder.orderItems) {
        try {
          await db.product.update({
            where: {
              id: order.productId,
            },
            data: {
              stock: {
                decrement: order.quantity,
              },
            },
          });
        } catch (error) {
          throw error;
        }
      }

      await createPayment({
        rzr_order_id: payloadEntity.order_id,
        rzr_payment_id: payloadEntity.id,
        orderId: order_id,
        method:
          payloadEntity.method === "card"
            ? payloadEntity["card"].type + " card"
            : payloadEntity.method,
        via: getPaymentVia(payloadEntity.method, payloadEntity),
        amount: Number(payloadEntity.amount) / 100,
      });
    } else {
      return error400(
        "Payment Signatures Do Not Match. Please contact support for help",
        {
          verified: false,
        },
      );
    }
    return success200({ verified: true });
  } catch (error) {
    return error500({ verified: false });
  }
}
