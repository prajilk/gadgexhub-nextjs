"use client";

import { useCategories } from "@/api-hooks/get-categories";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputContainer } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormProps } from "@/lib/types/types";

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
            <FormLabel>Title</FormLabel>
            <FormControl>
              <InputContainer className="bg-gray-50">
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
          <FormItem className="mt-3">
            <FormLabel>Slug</FormLabel>
            <FormControl style={{ margin: "0" }}>
              <div className="flex items-center gap-2">
                <InputContainer className="w-full bg-gray-50">
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
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Short Description{" "}
              <span className="text-xs lowercase text-gray-400">
                &#40;optional&#41;
              </span>
            </FormLabel>
            <FormControl>
              <InputContainer className="bg-gray-50">
                <Input
                  placeholder="Short Description"
                  {...field}
                  className=""
                />
              </InputContainer>
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Description"
                {...field}
                className="bg-gray-50"
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
              <FormLabel className="capitalize">Category Id</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-50 py-[1.35rem] outline-none focus:ring-0">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem
                      value={category.id.toString()}
                      key={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Stock</FormLabel>
              <FormControl>
                <InputContainer className="max-w-lg bg-gray-50">
                  <Input
                    className="placeholder:capitalize"
                    placeholder="Stock"
                    {...field}
                  />
                </InputContainer>
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
              <FormItem>
                <FormLabel className="capitalize">
                  {item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </FormLabel>
                <FormControl>
                  <InputContainer className="max-w-lg bg-gray-50">
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
