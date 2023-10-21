import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddressProps } from "@/lib/types/types";
import Button from "../shared/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio";
import LinkButton from "../shared/link-button";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const ChangeAddressDialog = ({
  addresses,
  setDeliveryAddress,
}: {
  addresses?: AddressProps[] | null;
  setDeliveryAddress: Dispatch<SetStateAction<AddressProps | undefined>>;
}) => {
  const [selectedAddress, setSelectedAddress] = useState<
    AddressProps | undefined
  >(addresses?.find((address) => address.is_default));
  function changeDeliveryAddress() {
    toast.success("Delivery address changed successfully.");
    setDeliveryAddress(selectedAddress);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <span className="btn btn-xs rounded-md bg-black text-white">
          Change
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle>Choose Delivery Address</DialogTitle>
          <RadioGroup defaultValue={selectedAddress?.address_id.toString()}>
            {addresses?.map((address, i) => (
              <label htmlFor={address.address_id.toString()} key={i}>
                <AddressCard
                  address={address}
                  setSelectedAddress={setSelectedAddress}
                />
              </label>
            ))}
          </RadioGroup>
          <div className="flex w-full justify-end gap-3">
            <LinkButton href="/account/address" className="btn-sm rounded-md">
              Add new
            </LinkButton>
            <Button
              className="btn-sm w-fit rounded-md"
              onClick={changeDeliveryAddress}
            >
              Select
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddressDialog;

function AddressCard({
  address,
  setSelectedAddress,
}: {
  address: AddressProps;
  setSelectedAddress: Dispatch<SetStateAction<AddressProps | undefined>>;
}) {
  return (
    <div className="relative flex items-center justify-between gap-3 rounded-md border border-gray-300 p-2 text-sm">
      <div className="space-y-2 text-left">
        <h2 className="flex-shrink-0 font-semibold">
          {address.name}{" "}
          {address.is_default && (
            <span className="rounded-sm bg-gray-200 px-2 py-0.5 text-xs font-normal text-gray-600">
              Default
            </span>
          )}
        </h2>
        <div className="flex flex-wrap items-center gap-1">
          <p className="flex-shrink-0">{address.address},</p>
          <p className="flex-shrink-0">{address.locality},</p>
          <p className="flex-shrink-0">{address.district},</p>
          <p className="flex-shrink-0">
            {address.state} - {address.pincode}
          </p>
        </div>
        <p className="me-2 inline-block">{address.phone},</p>
        <p className="inline-block">{address.alternate_phone}</p>
      </div>
      <RadioGroupItem
        value={address.address_id.toString()}
        id={address.address_id.toString()}
        onFocus={() => setSelectedAddress(address)}
      />
    </div>
  );
}
