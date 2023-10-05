import React from "react";
import Skeleton from "./skeleton";
import { repeat } from "@/lib/utils";
import SkeletonAddressCard from "./skeleton-address-card";

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
            <SkeletonAddressCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonAddressPage;
