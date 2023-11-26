"use client";

import LinkButton from "../shared/link-button";
import AddressDialog from "../dialog/address-dialog";
import ChangeAddressDialog from "../dialog/change-address-dialog";
import { useGetAddress } from "@/api-hooks/address/get-address";
import SkeletonDeliveryAddress from "../skeletons/skeleton-delivery-address";
import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { useGlobalContext } from "@/context/store";

const DeliveryAddress = () => {
  const { deliveryAddress, setDeliveryAddress } = useGlobalContext();
  const { data, isLoading, isFetching } = useGetAddress();

  const defaultAddress = data?.addresses?.find((address) => address.is_default);

  useEffect(() => {
    setDeliveryAddress(defaultAddress);
  }, [defaultAddress, setDeliveryAddress]);

  return (
    <div className="mb-3 h-fit bg-white shadow">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-muted-foreground">Delivery address</h2>
        {(deliveryAddress || !isLoading) && (
          <ChangeAddressDialog addresses={data?.addresses} />
        )}
      </div>
      {deliveryAddress ? (
        <div className="relative space-y-2 p-4 text-sm">
          <h2 className="flex-shrink-0 font-semibold">
            {deliveryAddress.name}
          </h2>
          <div className="flex flex-wrap items-center gap-1">
            <p className="flex-shrink-0">{deliveryAddress.address},</p>
            <p className="flex-shrink-0">{deliveryAddress.locality},</p>
            <p className="flex-shrink-0">{deliveryAddress.district},</p>
            <p className="flex-shrink-0">
              {deliveryAddress.state} - {deliveryAddress.pincode}
            </p>
          </div>
          <p className="me-2 inline-block">{deliveryAddress.phone},</p>
          <p className="inline-block">{deliveryAddress.alternate_phone}</p>
          <div className="absolute right-3 top-1">
            <AddressDialog action="edit" address={deliveryAddress}>
              <Pencil size={15} />
            </AddressDialog>
          </div>
        </div>
      ) : isLoading || isFetching ? (
        <SkeletonDeliveryAddress />
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-3 p-5">
          <h1 className="text-sm text-muted-foreground">
            No delivery addresses found, please add a new one
          </h1>
          <LinkButton href="/account/address">Add new</LinkButton>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
