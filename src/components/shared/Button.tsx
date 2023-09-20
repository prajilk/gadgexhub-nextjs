import { ButtonProps } from "@/lib/types";
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
            className={`btn rounded-full bg-black w-full font-light ${className}`}
        >
            {children}
        </m.button>
    );
};

export default Button;
