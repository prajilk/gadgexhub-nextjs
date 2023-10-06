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
import { Loader2 } from "lucide-react";
import useUser from "@/lib/swr/use-user";
import { UserProps } from "@/lib/types/types";
import { useSession } from "next-auth/react";
import LoadingButton from "../shared/loading-button";
import { toast } from "sonner";
import FailedFetch from "../failed-fetch";

const ProfileForm = () => {
  const { data, error, isLoading } = useUser();
  const { data: session, update } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ZodProfileSchema>>({
    resolver: zodResolver(ZodProfileSchema),
    defaultValues: {
      name: data?.user.name || "",
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
        form.reset({
          name: result.user.name,
          gender: result.user.gender || "",
          phone: result.user.phone || "",
        });
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
        name: data.user.name,
        gender: data.user.gender || "",
        phone: data.user.phone || "",
      });
    }
  }, [data, form]);

  if (error) return <FailedFetch />;
  if (isLoading) return Loading();

  return (
    <Form {...form}>
      <h1 className="my-2 text-xl font-semibold">Personal Information</h1>
      <p className="my-5 text-sm">
        Email:{" "}
        <span className="text-muted-foreground">{session?.user.email}</span>
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <InputContainer className="max-w-lg bg-[#f5f5f5]">
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
                    <FormLabel className="cursor-pointer font-normal">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="female"
                        checked={form.getValues("gender") === "female"}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      Female
                    </FormLabel>
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
                <InputContainer className="max-w-lg bg-[#f5f5f5]">
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
          disabled={!form.formState.isDirty || isSubmitting}
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
