"use client";

import { useCategories } from "@/api-hooks/get-categories";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectItem } from "@nextui-org/select";
import { ProductFormProps } from "@/lib/types/types";
import { Button } from "@nextui-org/button";
import { Textarea, Input } from "@nextui-org/input";

const ProductDetails = ({ form }: ProductFormProps) => {
  function generateSlug() {
    const name = form.getValues("title");
    const slug = name.replaceAll(" ", "-").toLowerCase();
    form.setValue("slug", slug);
  }

  const { data: categories } = useCategories();

  return (
    <div className="flex-1 p-5">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                isRequired
                label="Title"
                labelPlacement="outside"
                placeholder="Title"
                variant="faded"
                radius="sm"
                classNames={{
                  label: "font-medium",
                  inputWrapper: "border border-slate-200 bg-gray-50",
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem className="mt-3">
            <FormControl style={{ margin: "0" }}>
              <div className="flex items-end gap-2">
                <Input
                  {...field}
                  isRequired
                  label="Slug"
                  labelPlacement="outside"
                  placeholder="Slug"
                  variant="faded"
                  radius="sm"
                  classNames={{
                    label: "font-medium",
                    inputWrapper: "border border-slate-200 bg-gray-50",
                  }}
                />
                <Button type="button" onClick={generateSlug} variant="bordered">
                  Generate
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem className="mt-9">
            <FormControl>
              <Input
                {...field}
                label="Short Description"
                labelPlacement="outside"
                placeholder="Short Description (optional)"
                variant="faded"
                radius="sm"
                classNames={{
                  label: "font-medium",
                  inputWrapper: "border border-slate-200 bg-gray-50",
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="mt-3">
            <FormControl>
              <Textarea
                placeholder="Description"
                label="Description"
                labelPlacement="outside"
                radius="sm"
                variant="faded"
                classNames={{
                  label: "text-sm font-medium",
                  inputWrapper: "border border-slate-200 bg-gray-50",
                }}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  placeholder="Select a category"
                  label="Category Id"
                  labelPlacement="outside"
                  disabledKeys={["empty"]}
                  onChange={field.onChange}
                  radius="sm"
                  isRequired
                  variant="bordered"
                  classNames={{
                    value: "text-black",
                    label: "text-sm font-medium",
                    popoverContent: "bg-white",
                    trigger:
                      "border border-slate-200 bg-gray-50 mt-1 h-unit-10",
                  }}
                >
                  {categories ? (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key={1} value={"empty"}>
                      No items to select!
                    </SelectItem>
                  )}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="mt-1">
              <FormControl>
                <Input
                  {...field}
                  isRequired
                  label="Stock"
                  labelPlacement="outside"
                  placeholder="Stock"
                  variant="faded"
                  radius="sm"
                  classNames={{
                    label: "font-medium",
                    inputWrapper: "border border-slate-200 bg-gray-50",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["basePrice", "offerPrice"] as const).map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item}
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormControl>
                  <Input
                    {...field}
                    isRequired
                    label={item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    labelPlacement="outside"
                    placeholder={item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    variant="faded"
                    radius="sm"
                    classNames={{
                      label: "font-medium capitalize",
                      input: "placeholder:capitalize",
                      inputWrapper: "border border-slate-200 bg-gray-50",
                    }}
                  />
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
