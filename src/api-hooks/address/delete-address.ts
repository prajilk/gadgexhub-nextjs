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

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDelete,
    onSuccess: () => toast.success("Address deleted successfully."),
    onError: (error: any) => {
      if (error.response.data.isDefault) {
        return toast.error(
          "Default address cannot be deleted before setting another default.",
        );
      }
      toast.error("Error in deleting the address.");
    },
    onSettled: () => queryClient.invalidateQueries(["user", "address"]),
  });
}
