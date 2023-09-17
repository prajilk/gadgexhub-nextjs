import { LinkButtonProps } from "@/types";
import Link from "next/link";

const LinkButton = ({ href, title, className }: LinkButtonProps) => {
    return (
        <Link
            href={href}
            className={`btn bg-black text-white rounded-none hover:bg-gray-800 ${className}`}
        >
            {title}
        </Link>
    );
};

export default LinkButton;
