"use client";

import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";

const RemoveCheckoutCookie = () => {
  const pathname = usePathname();
  if (pathname !== "/checkout") {
    deleteCookie("checkout");
  }
  return <></>;
};

export default RemoveCheckoutCookie;
