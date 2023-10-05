import { AddressProps, AddressResProps } from "@/lib/types/types";
import axios from "@/config/axios.config";

type ResponseProps = Omit<AddressResProps, "addresses"> & {
  addresses: AddressProps;
  isDefault?: boolean;
};

export async function deleteAddress(id: number | undefined) {
  const { data } = await axios.delete(`/api/user/address?id=${id}`);
  return data as ResponseProps;
}
