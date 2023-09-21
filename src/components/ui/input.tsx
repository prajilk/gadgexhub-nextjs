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
                "flex justify-between items-center gap-1 rounded-lg w-full ps-4 pe-2 py-0 my-2 bg-white",
                className
            )}
        >
            {children}
            <div className="text-gray-400 ms-1 cursor-pointer">{icon}</div>
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
                    "relative w-full py-3 outline-none border-none placeholder:text-sm text-sm bg-transparent foc",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { InputContainer, Input };
