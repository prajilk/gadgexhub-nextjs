"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { Input } from "../ui/input";
import { stateList } from "@/lib/data";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { AddressProps } from "@/lib/types/types";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useDeleteAddress } from "@/api-hooks/address/delete-address";
import { useCreateAddress } from "@/api-hooks/address/create-address";
import { useUpdateAddress } from "@/api-hooks/address/update-address";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";

const AddressForm = ({
  address,
  action,
}: {
  address?: AddressProps;
  action: "edit" | "add";
}) => {
  const form = useForm<z.infer<typeof ZodAddressSchema>>({
    resolver: zodResolver(ZodAddressSchema),
    defaultValues: address ?? {
      is_default: false,
      name: "",
      phone: "",
      address: "",
      locality: "",
      district: "",
      state: "",
      pincode: "",
      landmark: "",
      alternate_phone: "",
    },
  });

  const onSuccess = () => {
    toast.success("Address saved successfully.");
    form.reset();
  };

  const create_mutation = useCreateAddress(onSuccess);
  const update_mutation = useUpdateAddress();

  //  Create and update address function
  async function onSubmit(values: z.infer<typeof ZodAddressSchema>) {
    if (action === "add") {
      create_mutation.mutate(values);
    } else {
      update_mutation.mutate({
        address_id: address?.address_id,
        data: values,
      });
    }
  }

  // Delete address function
  const delete_mutation = useDeleteAddress();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* isDefault Check box */}
        {!form.control._defaultValues.is_default && (
          <FormField
            control={form.control}
            name="is_default"
            render={({ field }) => (
              <FormItem className="my-3 flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    name="is_default"
                    classNames={{
                      label: "text-sm font-medium",
                    }}
                  >
                    This is my default address
                  </Checkbox>
                </FormControl>
              </FormItem>
            )}
          />
        )}
        {/* Input fullname and phone  */}
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Fullname"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone number"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />
        </div>
        {/* Input address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Address"
                  {...field}
                  className="bg-gray-50"
                />
              </FormControl>
              <FormMessage className="text-start" />
            </FormItem>
          )}
        />
        {/* Input locality and address */}
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="locality"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Locality"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="District"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />
        </div>
        {/* Input state and district */}
        <div className="grid grid-cols-2 items-center gap-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <select
                  onChange={field.onChange}
                  defaultValue={field.value}
                  name=""
                  id=""
                  className="scrollbar-thin select w-full rounded-lg border bg-gray-50 py-2.5 text-sm"
                >
                  <option value="" disabled hidden>
                    State
                  </option>
                  {stateList.map((state, i) => (
                    <option value={state} key={i}>
                      {state}
                    </option>
                  ))}
                </select>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Pincode"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />
        </div>
        {/* Input landmark and alternate phone */}
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Landmark (optional)"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alternate_phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Alternate Phone (optional)"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="flex flex-row items-center justify-between">
          {action === "edit" && (
            <div className="md:w-full">
              {!delete_mutation.isLoading ? (
                <DeleteAddressModal
                  onDelete={() => delete_mutation.mutate(address?.address_id!)}
                />
              ) : (
                <Loader2 className="animate-spin text-destructive" />
              )}
            </div>
          )}
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="light" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              isLoading={create_mutation.isLoading || update_mutation.isLoading}
              isDisabled={!form.formState.isDirty}
              type="submit"
              color="primary"
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};
export default AddressForm;

function DeleteAddressModal({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button color="danger" variant="light">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete address?</AlertDialogTitle>
          <AlertDialogDescription>
            Existing orders are not affected.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
