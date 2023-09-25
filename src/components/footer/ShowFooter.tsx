"use client";

import { noNavFooterPages } from "@/lib/utils";
import { LayoutProps } from "@/lib/types/types";
import { usePathname } from "next/navigation";

const ShowFooter = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  // const ShowFooter = !noNavFooterPages.includes(pathname);
  const showFooter = !noNavFooterPages.some((path) =>
    pathname.startsWith(path),
  );
  return <>{showFooter && children}</>;
};

export default ShowFooter;
