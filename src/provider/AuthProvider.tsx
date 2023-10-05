"use client";

import { LayoutProps } from "@/lib/types/types";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: LayoutProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
