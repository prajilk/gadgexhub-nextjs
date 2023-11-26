import { LinkButtonProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const LinkButton = ({ children, href, className }: LinkButtonProps) => {
  return (
    <Button color="primary" as={Link} href={href} className={cn(className)}>
      {children}
    </Button>
  );
};

export default LinkButton;
