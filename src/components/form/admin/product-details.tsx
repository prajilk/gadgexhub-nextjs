"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputContainer } from "@/components/ui/input";
import { ProductFormProps } from "@/lib/types/types";

const ProductDetails = ({ form }: ProductFormProps) => {
  function generateSlug() {
    const name = form.getValues("title");
    const slug = name.replaceAll(" ", "-").toLowerCase();
    form.setValue("slug", slug);
  }

  return (
    <div className="flex-1 p-5">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <InputContainer className="bg-[#f5f5f5]">
                <Input placeholder="Title" {...field} />
              </InputContainer>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <InputContainer className="w-full bg-[#f5f5f5]">
                  <Input {...field} />
                </InputContainer>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={generateSlug}
                >
                  Generate
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <InputContainer className="bg-[#f5f5f5]">
                <Input placeholder="Description" {...field} />
              </InputContainer>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["category", "stock"] as const).map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{item}</FormLabel>
                <FormControl>
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input
                      className="placeholder:capitalize"
                      placeholder={item}
                      {...field}
                    />
                  </InputContainer>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["basePrice", "offerPrice"] as const).map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </FormLabel>
                <FormControl>
                  <InputContainer className="max-w-lg bg-[#f5f5f5]">
                    <Input
                      className="placeholder:capitalize"
                      placeholder={item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                      {...field}
                    />
                  </InputContainer>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
