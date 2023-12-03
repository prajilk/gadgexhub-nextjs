"use client";

import { AuthForm } from "@/components/form/auth-form";
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const SignUp = () => {
  const signInWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-start justify-center md:py-20">
      <div className="flex h-screen w-full flex-col gap-7 px-5 py-10 md:h-max md:w-fit md:rounded-3xl md:bg-white md:p-14 md:shadow-2xl">
        <h1 className="text-3xl font-light">Sign in/Create account</h1>
        <div className="flex flex-col gap-5">
          <AuthForm />
          <div className="flex w-full items-center gap-2">
            <hr className="w-full border-zinc-300" />
            OR
            <hr className="w-full border-zinc-300" />
          </div>
          <Button
            onClick={signInWithGoogle}
            color="primary"
            variant="bordered"
            radius="full"
            className="!border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign In with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
