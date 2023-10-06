import { AddressProps, AddressResProps } from "@/lib/types/types";
import axios from "@/config/axios.config";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseProps = Omit<AddressResProps, "addresses"> & {
  addresses: AddressProps;
  isDefault?: boolean;
};

async function handleDelete(id: number) {
  const { data } = await axios.delete(`/api/user/address?id=${id}`);
  return data as ResponseProps;
}

function handleMutate(queryClient: QueryClient) {
  const previousData: AddressResProps | undefined = queryClient.getQueryData([
    "user",
    "address",
  ]);
  return { previousData };
}

async function handleSuccess(
  queryClient: QueryClient,
  data: ResponseProps,
  addressId: number,
  context: { previousData: AddressResProps | undefined } | undefined,
) {
  await queryClient.cancelQueries(["user", "address"]);
  queryClient.setQueryData(["user", "address"], {
    ...context?.previousData,
    addresses: context?.previousData?.addresses?.filter(
      (address) => address.address_id !== addressId,
    ),
  });
  if (data.success) {
    toast.success("Address deleted successfully.");
  } else {
    toast.error("Error in deleting the address.");
  }
}

function handleError(
  queryClient: QueryClient,
  error: any,
  data: number,
  context: { previousData: AddressResProps | undefined } | undefined,
) {
  queryClient.setQueryData(["user", "address"], context?.previousData);
  if (error.response.data.isDefault)
    return toast.error(
      "Default address cannot be deleted before setting another default.",
    );
  toast.error("Error in deleting the address.");
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDelete,
    onMutate: () => handleMutate(queryClient),
    onSuccess: async (data, addressId, context) =>
      handleSuccess(queryClient, data, addressId, context),
    onError: (error, data, context) =>
      handleError(queryClient, error, data, context),
    onSettled: () => queryClient.invalidateQueries(["user", "address"]),
  });
}
