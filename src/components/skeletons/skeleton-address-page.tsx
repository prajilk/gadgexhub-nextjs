import React from "react";
import Skeleton from "./skeleton";
import repeat from "@/lib/utils";

const SkeletonAddressPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-3">
      <div className="rounded-md border bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Addresses</h1>
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {repeat(2).map((index) => (
            <div
              className="space-y-2 rounded-md border bg-white p-4 text-sm"
              key={index}
            >
              <div className="relative">
                <Skeleton className="h-5 w-32 rounded-none" />
                <Skeleton className="absolute right-0 top-0 h-7 w-7 rounded-full" />
              </div>
              <Skeleton className="h-3.5 w-48 rounded-none" />
              {repeat(5).map((index) => (
                <Skeleton className="h-3.5 w-40 rounded-none" key={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonAddressPage;
