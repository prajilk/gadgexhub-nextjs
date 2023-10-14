"use client";

import LoadingButton from "@/components/shared/loading-button";
import { Form } from "@/components/ui/form";
import { ZodProductSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductDetails from "./components/product-details";
import ProductOptions from "./components/product-options";
import { useGlobalContext } from "@/context/store";
import { toast } from "sonner";
import { useAddProduct } from "@/api-hooks/admin/products/add-product";

const AddProductForm = () => {
  const { colorVariants, setColorVariants } = useGlobalContext();

  const form = useForm<z.infer<typeof ZodProductSchema>>({
    resolver: zodResolver(ZodProductSchema),
    defaultValues: {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      categoryId: "",
      stock: "",
      basePrice: "",
      offerPrice: "",
      colors: [{}],
      variantName: "",
      variantValues: "",
    },
  });

  const onSuccess = () => {
    toast.success("Product added successfully.");
    form.reset();
    setColorVariants([]);
  };

  const add_product_mutation = useAddProduct(onSuccess);

  function setColors() {
    form.setValue("colors", colorVariants);
  }

  async function onSubmit(values: z.infer<typeof ZodProductSchema>) {
    add_product_mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <ProductDetails form={form} />
          <ProductOptions form={form} />
        </div>
        <LoadingButton
          loader={add_product_mutation.isLoading}
          type="submit"
          onClick={setColors}
          className="max-w-lg"
          disabled={!form.formState.isDirty || add_product_mutation.isLoading}
        >
          Add Product
        </LoadingButton>
      </form>
    </Form>
  );
};

export default AddProductForm;
