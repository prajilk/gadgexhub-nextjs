import AddressForm from "../form/address-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddressProps, LayoutProps } from "@/lib/types/types";

const AddressDialog = ({
  action,
  address,
  children,
}: {
  action: "edit" | "add";
  address?: AddressProps;
} & LayoutProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
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
