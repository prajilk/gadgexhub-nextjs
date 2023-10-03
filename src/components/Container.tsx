import { LayoutProps } from "@/lib/types/types";
import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: LayoutProps & { className?: string }) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-2 py-32 md:py-40", className)}
    >
      {children}
    </div>
  );
};

export default Container;
