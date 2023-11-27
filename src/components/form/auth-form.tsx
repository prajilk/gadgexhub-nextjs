"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ZodAuthSchema } from "@/lib/zodSchemas";
import { motion as m } from "framer-motion";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useCreateAccount } from "@/api-hooks/user/create-user-account";
import { UserResProps } from "@/lib/types/types";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export function AuthForm() {
  const [isPassword, setIsPassword] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signInLoading, setSignInIsLoading] = useState(false);
  const router = useRouter();

  const callbackUrl = getCookie("originCallbackUrl"); // Get callback url from cookie to redirect after login success.

  const form = useForm<z.infer<typeof ZodAuthSchema>>({
    resolver: zodResolver(ZodAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn(data: z.infer<typeof ZodAuthSchema>) {
    setError(null);
    setSignInIsLoading(true);

    try {
      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: callbackUrl || "/",
      });

      if (signInResponse?.error) {
        form.reset();
        throw new Error("Invalid credentials.");
      }
      toast.success("Signed in successfully. redirecting...");
      deleteCookie("originCallbackUrl"); // Delete callbackUrl cookie after successful login
      router.refresh();
      router.replace(signInResponse?.url || "/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSignInIsLoading(false);
    }
  }

  const onSuccess = (
    data: UserResProps,
    variables: z.infer<typeof ZodAuthSchema>,
  ) => {
    toast.success("Account created successfully!");
    handleSignIn(variables); // Auto sign in after account creation.
  };
  const onError = ({ response }: { response: any }) => {
    setError(response.data.message);
  };

  const mutation = useCreateAccount(onSuccess, onError);

  async function handleCreateAccount(data: z.infer<typeof ZodAuthSchema>) {
    mutation.mutate(data);
    setError(null);
  }

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  radius="sm"
                  size="sm"
                  classNames={{
                    inputWrapper: "border border-slate-200",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Password"
                  radius="sm"
                  size="sm"
                  classNames={{
                    inputWrapper: "border border-slate-200",
                  }}
                  endContent={
                    isPassword ? (
                      <Eye
                        className="cursor-pointer text-gray-400"
                        onClick={() => setIsPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        className="cursor-pointer"
                        onClick={() => setIsPassword(true)}
                      />
                    )
                  }
                  type={isPassword ? "password" : "text"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error ? (
          <m.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="mt-3 block h-5 text-center text-xs text-destructive"
          >
            {error}
          </m.span>
        ) : (
          <span className="mt-3 block h-5" />
        )}
        <div className="mt-5 flex flex-col gap-3">
          <Button
            isLoading={signInLoading}
            color="primary"
            onClick={form.handleSubmit(handleSignIn)}
            isDisabled={mutation.isLoading}
            radius="full"
            type="button"
          >
            Sign in
          </Button>
          <Button
            isLoading={mutation.isLoading}
            color="primary"
            onClick={form.handleSubmit(handleCreateAccount)}
            isDisabled={mutation.isLoading}
            radius="full"
            type="button"
            variant="bordered"
            className="!border"
          >
            Create account
          </Button>
        </div>
      </form>
    </Form>
  );
}
