import { NextRequest } from "next/server";
import crypto from "crypto";
import { error400, error500, success200 } from "@/lib/utils";
import { createPayment, updateOrder } from "../helper";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      order_id,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !order_id
    ) {
      return error400("Missing required parameters", { verified: false });
    }

    const signature = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(signature.toString())
      .digest("hex");

    const isVerified = expectedSignature === razorpay_signature;
    if (isVerified) {
      await updateOrder(order_id);
      await createPayment({
        rzr_order_id: razorpay_order_id,
        rzr_payment_id: razorpay_payment_id,
        rzr_payment_signature: razorpay_signature,
        orderId: order_id,
      });
    } else {
      return error400(
        "Payment Signatures Do Not Match. Please contact support for help",
        {
          verified: false,
        },
      );
    }

    return success200({ order_id: order_id, verified: true });
  } catch (error) {
    return error500({ verified: false });
  }
}
