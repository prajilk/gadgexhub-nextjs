"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { ZodProfileSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { UserResProps } from "@/lib/types/types";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import FailedFetch from "../failed-fetch";
import { useUser } from "@/api-hooks/user/get-user";
import { useUpdateUser } from "@/api-hooks/user/update-user";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const ProfileForm = () => {
  const { data, error, isLoading } = useUser();
  const { data: session, update } = useSession();
  const router = useRouter();

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

  const onSuccess = (data: UserResProps) => {
    toast.success("Profile updated successfully.");
    const values = {
      gender: data.user.gender || "",
      phone: data.user.phone || "",
    };
    updateSession({
      name: data.user.name || "",
      ...values,
    });
    form.reset({
      name: data.user.name,
      ...values,
    });
    router.refresh();
  };

  const mutation = useUpdateUser(onSuccess);

  async function onSubmit(values: z.infer<typeof ZodProfileSchema>) {
    mutation.mutate(values);
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
              <FormControl>
                <Input
                  {...field}
                  label="Fullname"
                  labelPlacement="outside"
                  placeholder="Fullname"
                  radius="sm"
                  classNames={{
                    inputWrapper: "bg-gray-50 border border-slate-200 mt-5",
                    label: "font-medium",
                  }}
                />
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
              <FormControl>
                <RadioGroup
                  label="Gender"
                  onChange={field.onChange}
                  defaultValue={field.value}
                  size="sm"
                  classNames={{
                    label: "text-sm font-medium text-black",
                  }}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
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
              <FormControl>
                <Input
                  {...field}
                  label="Phone number"
                  labelPlacement="outside"
                  placeholder="Phone number"
                  radius="sm"
                  classNames={{
                    inputWrapper: "bg-gray-50 border border-slate-200 mt-5",
                    label: "font-medium",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={mutation.isLoading}
          type="submit"
          isDisabled={!form.formState.isDirty}
          color="primary"
          className="w-full"
          radius="full"
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
