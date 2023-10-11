"use client";

import LoadingButton from "@/components/shared/loading-button";
import { Form } from "@/components/ui/form";
import { ZodProductSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductDetails from "./product-details";
import ProductOptions from "./product-options";

const AddProductForm = () => {
  const form = useForm<z.infer<typeof ZodProductSchema>>({
    resolver: zodResolver(ZodProductSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      category: "",
      stock: "",
      basePrice: "",
      offerPrice: "",
      color: "",
      variantName: "",
      variantValues: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ZodProductSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <ProductDetails form={form} />
          <ProductOptions form={form} />
        </div>
        <LoadingButton
          loader={false}
          type="submit"
          className="max-w-lg"
          disabled={!form.formState.isDirty || false}
        >
          Add Product
        </LoadingButton>
      </form>
    </Form>
  );
};

export default AddProductForm;
