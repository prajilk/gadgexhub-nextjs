"use client";

import { noNavFooterPages } from "@/lib/data";
import { LayoutProps } from "@/lib/types/types";
import { usePathname } from "next/navigation";

const ShowNavbar = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const showHeader = !noNavFooterPages.some((path) =>
    pathname.startsWith(path),
  );

  return <>{showHeader && children}</>;
};

export default ShowNavbar;
