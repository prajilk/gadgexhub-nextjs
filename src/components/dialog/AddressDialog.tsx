import { Pencil } from "lucide-react";
import AddressForm from "../form/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddressProps } from "@/lib/types/types";

const AddressDialog = ({
  action,
  address,
}: {
  action: "edit" | "add";
  address?: AddressProps;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        {action === "add" ? (
          <span className="rounded-sm bg-gray-100 px-3 py-1 text-sm">
            + Add
          </span>
        ) : (
          <Pencil className="absolute right-3 top-3" size={15} />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "add" ? "Add Address" : "Edit Address"}
          </DialogTitle>
          <AddressForm address={address} action={action} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
