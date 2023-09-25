"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import useSWR from "swr";
import { ZodProfileSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetcher } from "@/lib/utils";
import { Input, InputContainer } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio";
import { UserProps } from "@/lib/types/types";
import { useEffect } from "react";
import Button from "../shared/Button";
import { Loader2, Unplug } from "lucide-react";

const ProfileForm = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useSWR<UserProps>(
    // `/api/user?id=${id}`,
    `/api/user/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

  const form = useForm<z.infer<typeof ZodProfileSchema>>({
    resolver: zodResolver(ZodProfileSchema),
    defaultValues: {
      name: data?.user.fullname || "",
      gender: data?.user.gender || "",
      phone: data?.user.phone || "",
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof ZodProfileSchema>) {
    console.log(values);
  }

  useEffect(() => {
    // Update the form default values when data is available
    if (data) {
      form.reset({
        name: data.user.fullname,
        gender: data.user.gender || "",
        phone: data.user.phone || "",
      });
    }
  }, [data]);

  if (error) return Failed();
  if (isLoading) return Loading();

  return (
    <Form {...form}>
      <h1 className="my-2 text-xl font-medium">Personal Information</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <InputContainer className="max-w-lg md:bg-[#f5f5f5]">
                  <Input placeholder="Fullname" {...field} />
                </InputContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="male"
                        checked={form.getValues("gender") === "male"}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="female"
                        checked={form.getValues("gender") === "female"}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <InputContainer className="max-w-lg md:bg-[#f5f5f5]">
                  <Input placeholder="Phone number" {...field} />
                </InputContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="max-w-lg"
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Save profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;

const Loading = () => {
  return (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

const Failed = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-fit rounded-full bg-gray-100 p-3">
        <Unplug size={60} className="animate-pulse" />
      </div>
      <span className="text-xl font-medium">Failed to fetch data</span>
    </div>
  );
};
