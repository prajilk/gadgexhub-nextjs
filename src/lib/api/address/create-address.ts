import { z } from "zod";
import axios from "@/config/axios.config";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { AddressProps, AddressResProps } from "@/lib/types/types";

type ResponseProps = Omit<AddressResProps, "addresses"> & {
  addresses: AddressProps;
};

export async function createAddress(values: z.infer<typeof ZodAddressSchema>) {
  const { data } = await axios.post("/api/user/address", values);
  return data as ResponseProps;
}
