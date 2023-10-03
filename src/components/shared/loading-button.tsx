import { LoadingButtonProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { motion as m } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingButton: React.FunctionComponent<LoadingButtonProps> = ({
  children,
  className,
  loader,
  ...buttonProps
}) => {
  return (
    <m.button
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      {...buttonProps}
      className={cn(
        "btn w-full rounded-full bg-black font-light text-white",
        className,
      )}
    >
      {loader ? <Loader2 className="animate-spin" /> : children}
    </m.button>
  );
};

export default LoadingButton;
