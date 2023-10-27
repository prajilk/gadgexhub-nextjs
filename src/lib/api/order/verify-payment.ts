import axios from "@/config/axios.config";
import { PaymentVerifyRes } from "@/lib/types/types";

type VerifyPaymentProps = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  order_id: string;
};

export const verifyPayment = async (values: VerifyPaymentProps) => {
  try {
    const { data } = await axios.post("api/payment/verify", values);
    return data as PaymentVerifyRes;
  } catch (error) {
    return null;
  }
};
