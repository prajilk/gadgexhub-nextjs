"use client";

import { noNavFooterPages } from "@/lib/data";
import { LayoutProps } from "@/lib/types/types";
import { usePathname } from "next/navigation";

const ShowFooter = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const showFooter = !noNavFooterPages.some((path) =>
    pathname.startsWith(path),
  );
  return <>{showFooter && children}</>;
};

export default ShowFooter;
