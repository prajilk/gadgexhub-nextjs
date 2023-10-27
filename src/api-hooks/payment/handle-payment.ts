import axios from "@/config/axios.config";
import { PaymentRes } from "@/lib/types/types";
import { useMutation } from "@tanstack/react-query";

const handlePayment = async (addressId: number) => {
  const { data } = await axios.post("api/payment", { addressId });
  return data as PaymentRes;
};

export function usePayment(onSuccess: (data: PaymentRes) => void) {
  return useMutation({
    mutationFn: handlePayment,
    onSuccess,
  });
}
