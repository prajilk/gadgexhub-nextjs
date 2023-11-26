import { cn } from "@/lib/utils";
import { Skeleton as NextUISkeleton } from "@nextui-org/skeleton";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <NextUISkeleton
      className={cn(
        "rounded-sm bg-default-200 before:!duration-1000",
        className,
      )}
    />
  );
};

export default Skeleton;
