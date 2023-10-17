import React from "react";
import Skeleton from "./skeleton";

const SkeletonCartItem = () => {
  return (
    <div className="flex w-full items-center gap-3 border-b px-5 py-5">
      <Skeleton className="h-20 w-20 flex-shrink-0" />
      <div>
        <Skeleton className="h-5" />
        <div className="flex items-center gap-2">
          <Skeleton className="mt-3 h-8 w-24" />
          <Skeleton className="mt-3 h-5 w-14" />
        </div>
      </div>
      <div className="ms-auto">
        <Skeleton className="mb-2 h-5 w-14" />
        <Skeleton className="h-5 w-14" />
      </div>
    </div>
  );
};

export default SkeletonCartItem;
