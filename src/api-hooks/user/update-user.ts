import axios from "@/config/axios.config";
import { UserResProps } from "@/lib/types/types";
import { ZodProfileSchema } from "@/lib/zodSchemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleUpdate(values: z.infer<typeof ZodProfileSchema>) {
  const { data } = await axios.patch("/api/user", values);
  return data as UserResProps;
}

export function useUpdateUser(onSuccess: (data: UserResProps) => void) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess,
    onError: () => {
      toast.error("Error in updating profile!");
    },
  });
}
