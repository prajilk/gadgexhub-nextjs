"use client";

import { AddressResProps } from "@/lib/types/types";
import AddressCard from "./address-card";
import { useQuery } from "@tanstack/react-query";
import { MapPinOff } from "lucide-react";
import axios from "@/config/axios.config";
import SkeletonAddressCard from "../skeletons/skeleton-address-card";

async function getAddressClient() {
  const { data } = await axios.get("/api/user/address");
  return data as AddressResProps;
}

const Addresses = () => {
  const { data: addresses, isLoading } = useQuery(
    ["user", "address"],
    getAddressClient,
  );

  if (isLoading) return <SkeletonAddressCard />;

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
