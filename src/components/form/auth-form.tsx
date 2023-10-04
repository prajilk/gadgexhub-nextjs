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
import { Input, InputContainer } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ZodAuthSchema } from "@/lib/zodSchemas";
import LoadingButton from "@/components/shared/loading-button";
import { motion as m } from "framer-motion";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const [isPassword, setIsPassword] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signInLoading, setSignInIsLoading] = useState(false);
  const [signUpLoading, setSignUpIsLoading] = useState(false);

  const router = useRouter();

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
        callbackUrl: "/",
      });

      if (signInResponse?.error) {
        form.reset();
        throw new Error("Invalid credentials.");
      }

      toast.success("Signed in successfully.");
      router.refresh();
      router.back();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSignInIsLoading(false);
    }
  }
  async function handleCreateAccount(data: z.infer<typeof ZodAuthSchema>) {
    setError(null);
    setSignUpIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const { success, message } = await res.json();
      if (!success) throw new Error(message);
      toast.success("Account created successfully!");
      handleSignIn(data); // Auto sign in after account creation.
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSignUpIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputContainer className="md:bg-[#f5f5f5]">
                  <Input placeholder="Email" {...field} />
                </InputContainer>
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
                <InputContainer
                  className="md:bg-[#f5f5f5]"
                  icon={
                    isPassword ? (
                      <Eye onClick={() => setIsPassword(false)} />
                    ) : (
                      <EyeOff onClick={() => setIsPassword(true)} />
                    )
                  }
                >
                  <Input
                    placeholder="Password"
                    type={isPassword ? "password" : "text"}
                    {...field}
                  />
                </InputContainer>
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
          <LoadingButton
            type="button"
            onClick={form.handleSubmit(handleSignIn)}
            loader={signInLoading}
            disabled={signInLoading || signUpLoading}
            className="border text-white hover:bg-gray-700"
          >
            Sign in
          </LoadingButton>
          <LoadingButton
            type="button"
            onClick={form.handleSubmit(handleCreateAccount)}
            loader={signUpLoading}
            disabled={signInLoading || signUpLoading}
            className="border border-black bg-white text-black hover:bg-gray-100"
          >
            Create account
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
