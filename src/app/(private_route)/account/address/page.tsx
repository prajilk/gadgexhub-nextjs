import Addresses from "@/components/address/addresses";
import AddressDialog from "@/components/dialog/address-dialog";
import { getAddress } from "@/lib/api/address/get-address";
// import { AddressResProps } from "@/lib/types/types";
// import { MapPinOff } from "lucide-react";
import getQueryClient from "@/lib/query-utils/get-query-client";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/lib/query-utils/hydrate-client";

const Address = async () => {
  // const addresses: AddressResProps = await getAddress();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user", "address"], getAddress);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mx-auto max-w-6xl px-3">
      <div className="rounded-md border bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Addresses</h1>
          <AddressDialog action="add" />
        </div>
        <Hydrate state={dehydratedState}>
          <Addresses />
        </Hydrate>
        {/* {addresses?.addresses === null || addresses?.addresses.length === 0 ? (
          <div className="my-10 flex w-full flex-col items-center justify-center space-y-3">
            <div className="w-fit rounded-full bg-gray-100 p-3">
              <MapPinOff size={60} className="animate-pulse" />
            </div>
            <h1>No addresses found!</h1>
          </div>
        ) : (
          <></>
          // <Addresses addresses={addresses?.addresses} />
        )} */}
      </div>
    </div>
  );
};

export default Address;
