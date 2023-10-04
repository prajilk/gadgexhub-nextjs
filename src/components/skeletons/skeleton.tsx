import { cn } from "@/lib/utils";
import React from "react";

const Skeleton = ({ className }: { className?: string }) => {
  return <div className={cn("skeleton-pulse rounded-sm", className)} />;
};

export default Skeleton;
