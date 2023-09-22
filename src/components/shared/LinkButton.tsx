import { LinkButtonProps } from "@/lib/types/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LinkButton = ({ href, title, className }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "btn rounded-none bg-black text-white hover:bg-gray-800",
        className,
      )}
    >
      {title}
    </Link>
  );
};

export default LinkButton;
