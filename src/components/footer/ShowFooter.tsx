"use client";

import { noNavFooterPages } from "@/lib/utils";
import { LayoutProps } from "@/lib/types/ui";
import { usePathname } from "next/navigation";

const ShowFooter = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const ShowFooter = !noNavFooterPages.includes(pathname);
  return <>{ShowFooter && children}</>;
};

export default ShowFooter;
