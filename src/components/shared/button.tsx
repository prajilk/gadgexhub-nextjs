import { ButtonProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={cn(
        "btn w-full rounded-full bg-black font-light text-white hover:bg-gray-700",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
