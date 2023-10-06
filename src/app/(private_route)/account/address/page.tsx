import Addresses from "@/components/address/addresses";
import AddressDialog from "@/components/dialog/address-dialog";
import getQueryClient from "@/lib/query-utils/get-query-client";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { headers } from "next/headers";
import axios from "@/config/axios.config";
import { AddressResProps } from "@/lib/types/types";

async function getAddressServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");

  const { data } = await axios.get("/api/user/address", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as AddressResProps;
}

const Address = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user", "address"], getAddressServer);
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
      </div>
    </div>
  );
};

export default Address;
