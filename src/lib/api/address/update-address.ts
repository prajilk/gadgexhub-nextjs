import { z } from "zod";
import axios from "@/config/axios.config";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { AddressProps, AddressResProps } from "@/lib/types/types";

type ResponseProps = Omit<AddressResProps, "addresses"> & {
  addresses: AddressProps;
};
interface UpdateAddressProps {
  address_id: number | undefined;
  data: z.infer<typeof ZodAddressSchema>;
}

export async function updateAddress({ address_id, data }: UpdateAddressProps) {
  const { data: result } = await axios.put("/api/user/address", {
    address_id,
    data,
  });
  return result as ResponseProps;
}
