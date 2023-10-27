import Addresses from "@/components/address/addresses";
import AddressDialog from "@/components/dialog/address-dialog";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient } from "@tanstack/react-query";
import { getAddressServer } from "@/lib/api/address/get-address";

const Address = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["user", "address"], getAddressServer);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mx-auto max-w-6xl px-3">
      <div className="rounded-md border bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Addresses</h1>
          <AddressDialog action="add">
            <span className="rounded-sm bg-gray-100 px-3 py-1 text-sm">
              + Add
            </span>
          </AddressDialog>
        </div>
        <Hydrate state={dehydratedState}>
          <Addresses />
        </Hydrate>
      </div>
    </div>
  );
};

export default Address;
