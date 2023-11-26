import { cn } from "@/lib/utils";
import { Skeleton as NextUISkeleton } from "@nextui-org/skeleton";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <NextUISkeleton
      className={cn(
        "before:!duration-[1300ms] rounded-sm bg-default-200",
        className,
      )}
    />
  );
};

export default Skeleton;
