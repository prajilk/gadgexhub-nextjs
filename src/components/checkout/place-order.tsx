"use client";

import Script from "next/script";
import LoadingButton from "../shared/loading-button";
import { usePayment } from "@/api-hooks/payment/handle-payment";
import { PaymentRes } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/store";
import PaymentProcessingDialog from "../dialog/payment-processing-dialog";
import { useState } from "react";

const PlaceOrder = () => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const payment_mutation = usePayment(makePayment);
  const { deliveryAddress } = useGlobalContext();

  function makePayment(data: PaymentRes) {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: "GadgeXhub",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank You for Your Purchase!",
      //   image: "",
      handler: async function (response: any) {
        if (response.razorpay_signature) {
          router.push(`/checkout/${data.orderId}`);
        } else {
          toast.error("Payment failed. Please contact support!");
        }
      },
      theme: {
        color: "#000",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function () {
      paymentObject.close();
      toast.error("Payment failed. Please contact support!");
    });
    setProcessing(false);
  }

  function placeOrder() {
    setProcessing(true);
    if (deliveryAddress?.address_id)
      payment_mutation.mutate(deliveryAddress.address_id);
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <LoadingButton
        loader={payment_mutation.isLoading}
        disabled={payment_mutation.isLoading || !deliveryAddress?.address_id}
        onClick={placeOrder}
        className="btn my-5 w-full rounded-xl bg-black text-white"
      >
        Place order
      </LoadingButton>
      {processing && <PaymentProcessingDialog open={processing} />}
    </>
  );
};

export default PlaceOrder;
