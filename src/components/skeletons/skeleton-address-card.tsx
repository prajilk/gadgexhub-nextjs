import React from "react";
import Skeleton from "./skeleton";
import { repeat } from "@/lib/utils";

const SkeletonAddressCard = () => {
  return (
    <div className="space-y-2 rounded-md border bg-white p-4 text-sm">
      <div className="relative">
        <Skeleton className="h-5 w-[60%] rounded-none" />
        <Skeleton className="absolute right-0 top-0 h-7 w-7 rounded-full" />
      </div>
      <Skeleton className="h-3.5 w-[80%] rounded-none" />
      {repeat(5).map((index) => (
        <Skeleton className="h-3.5 w-[70%] rounded-none" key={index} />
      ))}
    </div>
  );
};

export default SkeletonAddressCard;
