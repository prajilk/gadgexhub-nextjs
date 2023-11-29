import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddressProps } from "@/lib/types/types";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import AddressDialog from "./address-dialog";
import { useGlobalContext } from "@/context/store";
import { Button } from "@nextui-org/button";
import { Radio, RadioGroup, RadioProps } from "@nextui-org/radio";
import { cn } from "@nextui-org/system";

const ChangeAddressDialog = ({
  addresses,
}: {
  addresses?: AddressProps[] | null;
}) => {
  const { setDeliveryAddress } = useGlobalContext();
  const [selectedAddress, setSelectedAddress] = useState<
    AddressProps | undefined
  >(addresses?.find((address) => address.is_default));

  function changeDeliveryAddress() {
    toast.success("Delivery address changed successfully.");
    setDeliveryAddress(selectedAddress);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="primary" size="sm">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle>Choose Delivery Address</DialogTitle>
          <RadioGroup
            label="Addresses"
            defaultValue={selectedAddress?.address_id.toString()}
            description="Selected address cannot be changed after order placed."
            classNames={{
              label: "text-sm font-medium text-black",
            }}
            onValueChange={(address_id) =>
              setSelectedAddress(
                addresses?.find(
                  (address) => address.address_id === Number(address_id),
                ),
              )
            }
          >
            {addresses?.map((address, i) => (
              <CustomRadio value={address.address_id.toString()} key={i}>
                <AddressCard address={address} />
              </CustomRadio>
            ))}
          </RadioGroup>
          <AddressDialog action="add">
            <div className="float-left flex w-fit items-center gap-1 rounded-md border border-gray-600 bg-white px-1 py-1.5 text-sm font-normal text-black hover:bg-gray-100">
              <Plus size={20} />
              Create new address
            </div>
          </AddressDialog>
          <div className="flex w-full justify-end gap-3">
            <Button onClick={changeDeliveryAddress}>Select</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddressDialog;

export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-white hover:bg-gray-50 max-w-full items-center justify-between",
          "flex-row-reverse cursor-pointer rounded-lg gap-4 p-2 border border-slate-300",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

function AddressCard({ address }: { address: AddressProps }) {
  return (
    <div className="space-y-1 text-left">
      <h2 className="flex-shrink-0 font-semibold">
        {address.name}{" "}
        {address.is_default && (
          <span className="rounded-sm bg-gray-200 px-2 py-0.5 text-xs font-normal text-gray-600">
            Default
          </span>
        )}
      </h2>
      <div className="flex flex-wrap items-center gap-1 text-sm">
        <p className="flex-shrink-0">{address.address},</p>
        <p className="flex-shrink-0">{address.locality},</p>
        <p className="flex-shrink-0">{address.district},</p>
        <p className="flex-shrink-0">
          {address.state} - {address.pincode}
        </p>
      </div>
      <p className="me-2 inline-block text-sm">{address.phone},</p>
      <p className="inline-block text-sm">{address.alternate_phone}</p>
    </div>
  );
}
