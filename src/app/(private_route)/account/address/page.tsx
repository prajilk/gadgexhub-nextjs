import AddressCard from "@/components/AddressCard";
import AddressDialog from "@/components/dialog/AddressDialog";
import { AddressResProps } from "@/lib/types/types";
import { MapPinOff } from "lucide-react";
import { headers } from "next/headers";

const Address = async () => {
  const result = await fetch(process.env.URL + "/api/user/address", {
    method: "GET",
    headers: headers(),
  });
  const addresses: AddressResProps = await result.json();

  return (
    <div className="mx-auto max-w-6xl px-3">
      <div className="rounded-md border bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Addresses</h1>
          <AddressDialog action="add" />
        </div>
        {addresses.addresses === null || addresses.addresses.length === 0 ? (
          <div className="my-10 flex w-full flex-col items-center justify-center space-y-3">
            <div className="w-fit rounded-full bg-gray-100 p-3">
              <MapPinOff size={60} className="animate-pulse" />
            </div>
            <h1>No addresses found!</h1>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {addresses.addresses.map((address, i) => (
              <AddressCard address={address} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
