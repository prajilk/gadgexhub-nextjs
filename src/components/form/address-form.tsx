"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { Input, InputContainer } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { stateList } from "@/lib/data";
import { DialogClose, DialogFooter } from "../ui/dialog";
import LoadingButton from "../shared/loading-button";
import {
  AddressProps,
  AddressResProps,
  SingleAddressResProps,
} from "@/lib/types/types";
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
import { useRouter } from "next/navigation";
import { useDeleteAddress } from "@/api-hooks/address/delete-address";
import { useCreateAddress } from "@/api-hooks/address/create-address";
import { useUpdateAddress } from "@/api-hooks/address/update-address";

const AddressForm = ({
  address,
  action,
}: {
  address?: AddressProps;
  action: "edit" | "add";
}) => {
  const router = useRouter();

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
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>This is my default address</FormLabel>
                </div>
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
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input placeholder="Fullname" {...field} />
                  </InputContainer>
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
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input placeholder="Phone number" {...field} />
                  </InputContainer>
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
                <InputContainer className="max-w-lg bg-[#f5f5f5]">
                  <Input placeholder="Address" {...field} />
                </InputContainer>
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
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input placeholder="Locality" {...field} />
                  </InputContainer>
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
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input placeholder="District" {...field} />
                  </InputContainer>
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
                  className="scrollbar-thin select w-full rounded-lg border bg-[#f5f5f5] text-sm"
                >
                  <option value="" disabled selected hidden>
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
                  <InputContainer className="my-0 max-w-lg bg-[#f5f5f5]">
                    <Input placeholder="Pincode" {...field} />
                  </InputContainer>
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
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input placeholder="Landmark (optional)" {...field} />
                  </InputContainer>
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
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input
                      placeholder="Alternate Phone (optional)"
                      {...field}
                    />
                  </InputContainer>
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
          <div className="flex">
            <DialogClose
              type="button"
              className="btn w-fit rounded-none bg-white font-light text-black hover:bg-gray-50"
            >
              Cancel
            </DialogClose>
            <LoadingButton
              loader={create_mutation.isLoading || update_mutation.isLoading}
              disabled={
                !form.formState.isDirty ||
                create_mutation.isLoading ||
                update_mutation.isLoading
              }
              type="submit"
              className="w-fit rounded-none"
            >
              Save
            </LoadingButton>
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
      <AlertDialogTrigger>
        <span className="text-destructive">Delete</span>
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
