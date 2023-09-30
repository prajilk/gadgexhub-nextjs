import * as React from "react";
import { cn } from "@/lib/utils";
import { JsxElement } from "typescript";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputContainer = ({
  children,
  className,
  icon,
}: {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactElement<JsxElement>;
}) => {
  return (
    <div
      className={cn(
        "my-2 flex w-full items-center justify-between gap-1 rounded-lg border bg-white py-0 pe-2 ps-4",
        className,
      )}
    >
      {children}
      <div className="ms-1 cursor-pointer text-gray-400">{icon}</div>
    </div>
  );
};
InputContainer.displayName = "InputContainer";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "relative w-full border-none bg-transparent py-3 text-sm text-black outline-none placeholder:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { InputContainer, Input };
