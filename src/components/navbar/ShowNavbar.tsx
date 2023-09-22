"use client";

import { noNavFooterPages } from "@/lib/utils";
import { LayoutProps } from "@/lib/types/ui";
import { usePathname } from "next/navigation";

const ShowNavbar = ({ children }: LayoutProps) => {
    const pathname = usePathname();
    const showHeader = !noNavFooterPages.includes(pathname);

    return <>{showHeader && children}</>;
};

export default ShowNavbar;
