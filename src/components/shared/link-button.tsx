import { LinkButtonProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LinkButton = ({ children, href, className }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "btn rounded-none bg-black font-light text-white hover:bg-gray-700",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
