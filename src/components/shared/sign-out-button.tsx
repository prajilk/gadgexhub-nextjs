"use client";

import { signOut } from "next-auth/react";
import { toast } from "sonner";
import Button from "./button";

const SignOutButton = () => {
  async function handleSignOut() {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
      localStorage.removeItem("cart-items");
      toast.success("Sign out successfully.");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Button onClick={handleSignOut} className="w-fit rounded-none">
      Sign out
    </Button>
  );
};

export default SignOutButton;
