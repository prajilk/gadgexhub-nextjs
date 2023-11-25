"use client";

import { LayoutProps } from "@/lib/types/types";
import { NextUIProvider as Provider } from "@nextui-org/system";

const NextUIProvider = ({ children }: LayoutProps) => {
  return <Provider className="flex flex-1 flex-col">{children}</Provider>;
};

export default NextUIProvider;
