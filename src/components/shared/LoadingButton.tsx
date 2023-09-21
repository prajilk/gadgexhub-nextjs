import { LoadingButtonProps } from "@/lib/types";
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
            className={`btn rounded-full bg-black w-full font-light ${className}`}
        >
            {loader ? <Loader2 className="animate-spin" /> : children}
        </m.button>
    );
};

export default LoadingButton;
