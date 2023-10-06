"use client";

import { ButtonProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { motion as m } from "framer-motion";

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...buttonProps
}) => {
  return (
    <m.button
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      {...buttonProps}
      className={cn(
        "btn w-full rounded-full bg-black font-light text-white hover:bg-gray-700",
        className,
      )}
    >
      {children}
    </m.button>
  );
};

export default Button;
