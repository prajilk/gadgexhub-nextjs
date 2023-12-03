import axios from "@/config/axios.config";
import { UserResProps } from "@/lib/types/types";
import { ZodAuthSchema } from "@/lib/zodSchemas";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

async function handleCreateAccountRequest(
  values: z.infer<typeof ZodAuthSchema>,
) {
  const { data } = await axios.post("/api/auth/signup", values);
  return data as UserResProps;
}

export function useCreateAccount(
  onSuccess: (
    data: UserResProps,
    variables: z.infer<typeof ZodAuthSchema>,
  ) => void,
  onError: (error: any) => void,
) {
  return useMutation({
    mutationFn: handleCreateAccountRequest,
    onSuccess,
    onError,
  });
}
