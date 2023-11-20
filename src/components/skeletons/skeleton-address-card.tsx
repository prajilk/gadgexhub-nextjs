import React from "react";
import Skeleton from "./skeleton";
import { repeat } from "@/lib/utils";

const SkeletonAddressCard = () => {
  return (
    <div className="space-y-2 rounded-md border bg-white p-4 text-sm">
      <div className="relative">
        <Skeleton className="h-6 w-[60%]" />
        <Skeleton className="absolute right-0 top-0 h-7 w-7 rounded-full" />
      </div>
      <Skeleton className="h-[1.15rem] w-[80%]" />
      {repeat(5).map((index) => (
        <Skeleton className="h-[1.15rem] w-[70%]" key={index} />
      ))}
    </div>
  );
};

export default SkeletonAddressCard;
