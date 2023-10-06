"use client";

import AddressCard from "./address-card";
import { MapPinOff } from "lucide-react";
import SkeletonAddressCard from "../skeletons/skeleton-address-card";
import { useGetAddress } from "@/api-hooks/address/get-address";
import { AddressResProps } from "@/lib/types/types";
import FailedFetch from "../failed-fetch";

const Addresses = () => {
  const { data: response, isLoading, error } = useGetAddress();

  const addresses: AddressResProps = response?.data;

  if (isLoading)
    return (
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <SkeletonAddressCard />;
      </div>
    );
  if (error)
    return (
      <div className="mt-5 flex justify-center py-10">
        <FailedFetch />
      </div>
    );

  return (
    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
      {addresses?.addresses === null || addresses?.addresses.length === 0 ? (
        <div className="my-10 flex w-full flex-col items-center justify-center space-y-3">
          <div className="w-fit rounded-full bg-gray-100 p-3">
            <MapPinOff size={60} className="animate-pulse" />
          </div>
          <h1>No addresses found!</h1>
        </div>
      ) : (
        addresses?.addresses.map((address, i) => (
          <AddressCard address={address} key={i} />
        ))
      )}
    </div>
  );
};

export default Addresses;
