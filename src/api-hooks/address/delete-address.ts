import { SingleAddressResProps } from "@/lib/types/types";
import axios from "@/config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function handleDelete(id: number) {
  const { data } = await axios.delete(`/api/user/address?id=${id}`);
  return data as SingleAddressResProps;
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
