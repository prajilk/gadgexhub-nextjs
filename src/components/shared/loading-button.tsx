import { LoadingButtonProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoadingButton: React.FunctionComponent<LoadingButtonProps> = ({
  children,
  className,
  loader,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={cn(
        "btn w-full rounded-full bg-black font-light text-white",
        className,
      )}
    >
      {loader ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};

export default LoadingButton;
