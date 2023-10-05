"use client";

import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { stateList } from "@/lib/data";
import { DialogClose, DialogFooter } from "../ui/dialog";
import LoadingButton from "../shared/loading-button";
import { AddressProps, AddressResProps } from "@/lib/types/types";
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
import { createAddress } from "@/lib/api/address/create-address";
import { updateAddress } from "@/lib/api/address/update-address";
import { deleteAddress } from "@/lib/api/address/delete-address";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddressForm = ({
  address,
  action,
}: {
  address?: AddressProps;
  action: "edit" | "add";
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  //  Create and update address function
  async function onSubmit(values: z.infer<typeof ZodAddressSchema>) {
    setIsLoading(true);

    try {
      const result =
        action === "add"
          ? await createAddress(values)
          : await updateAddress({
              address_id: address?.address_id,
              data: values,
            });

      if (result.success) {
        toast.success("Address saved successfully.");
        if (action === "edit") form.reset(result.addresses);
        else form.reset();
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  // Delete address function
  async function handleDelete() {
    setDeleteLoading(true);
    try {
      const result = await deleteAddress(address?.address_id);
      if (result.success) {
        toast.success("Address deleted successfully.");
        // router.refresh();
      } else {
        if (result.isDefault)
          return toast.error(
            "Default address cannot be deleted before setting another default.",
          );
        toast.error("Error in deleting the address.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleDelete,
    onMutate: async (addressId: number) => {
      await queryClient.cancelQueries(["user", "address"]);
      const previousData: AddressResProps | undefined =
        queryClient.getQueryData(["user", "address"]);

      queryClient.setQueryData(["user", "address"], {
        ...previousData,
        addresses: previousData?.addresses?.filter(
          (address) => address.address_id !== addressId,
        ),
      });

      return { previousData };
    },
  });

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
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-[#f5f5f5] py-3">
                    <SelectTrigger className="focus:ring-0">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-72">
                    {stateList.map((state, i) => (
                      <SelectItem value={state} key={i}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              {!deleteLoading ? (
                <DeleteAddressModal
                  onDelete={() => mutation.mutate(address?.address_id!)}
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
              loader={isLoading}
              disabled={!form.formState.isDirty || isLoading}
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
