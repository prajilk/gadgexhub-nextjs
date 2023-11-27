import { LinkButtonProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@nextui-org/button";
import Link from "next/link";

const LinkButton = ({
  children,
  href,
  className,
  ...ButtonProps
}: LinkButtonProps & ButtonProps) => {
  return (
    <Button
      color="primary"
      as={Link}
      href={href}
      className={cn(className)}
      {...ButtonProps}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
