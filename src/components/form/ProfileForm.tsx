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
import { ZodProfileSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputContainer } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import { Loader2, Unplug } from "lucide-react";
import useUser from "@/lib/swr/use-user";
import { UserProps } from "@/lib/types/types";
import { useSession } from "next-auth/react";
import LoadingButton from "../shared/LoadingButton";
import toast from "react-hot-toast";

const ProfileForm = () => {
  const { data, error, isLoading } = useUser();
  const { data: session, update } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ZodProfileSchema>>({
    resolver: zodResolver(ZodProfileSchema),
    defaultValues: {
      name: data?.user.fullname || "",
      gender: data?.user.gender || "",
      phone: data?.user.phone || "",
    },
  });

  async function updateSession(updatedData: z.infer<typeof ZodProfileSchema>) {
    await update({
      ...session,
      user: {
        ...session?.user,
        name: updatedData.name,
      },
    });
  }

  async function onSubmit(values: z.infer<typeof ZodProfileSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result: UserProps = await response.json();
      if (result.success) {
        updateSession(values);
        toast.success("Profile updated successfully.");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
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
      <h1 className="my-2 text-xl font-semibold">Personal Information</h1>
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
        <LoadingButton
          loader={isSubmitting}
          type="submit"
          className="max-w-lg"
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Save profile
        </LoadingButton>
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
