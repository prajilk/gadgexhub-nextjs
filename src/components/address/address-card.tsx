import { AddressProps } from "@/lib/types/types";
import AddressDialog from "../dialog/address-dialog";
import { Pencil } from "lucide-react";

const AddressCard = ({ address }: { address: AddressProps }) => {
  return (
    <>
      <div className="relative space-y-2 rounded-md border bg-white p-4 text-sm">
        {address.is_default && (
          <span className="rounded-sm bg-gray-200 px-2 py-1 text-xs font-normal text-gray-600">
            Default
          </span>
        )}
        <h2 className="font-semibold">{address.name}</h2>
        <p>{address.address}</p>
        <p>{address.locality}</p>
        <p>{address.district}</p>
        <p>
          {address.state} - {address.pincode}
        </p>
        <p>{address.phone}</p>
        <p>{address.alternate_phone}</p>
        <AddressDialog action="edit" address={address}>
          <Pencil className="absolute right-3 top-3" size={15} />
        </AddressDialog>
      </div>
    </>
  );
};

export default AddressCard;
