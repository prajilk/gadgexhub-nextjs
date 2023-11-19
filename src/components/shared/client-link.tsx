"use client";

import { LayoutProps } from "@/lib/types/types";
import { useRouter } from "next/navigation";

const ClientLink = ({
  children,
  className,
  htmlFor,
  redirect,
}: {
  className?: string;
  htmlFor: string;
  redirect: string;
} & LayoutProps) => {
  const router = useRouter();
  return (
    <label
      htmlFor={htmlFor}
      className={className}
      onClick={() => router.push(redirect)}
    >
      {children}
    </label>
  );
};

export default ClientLink;
