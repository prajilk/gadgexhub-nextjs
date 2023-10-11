import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputContainer } from "@/components/ui/input";
import { ProductFormProps } from "@/lib/types/types";
import { useState } from "react";
import { Ban, Plus, Trash2 } from "lucide-react";
import ImagePicker from "./image-picker";
import Image from "next/image";

type ColorVariant = {
  color: string;
  thumbnail: string;
  others: string[];
};
type ColorVariantsProps = ColorVariant[];

const ProductOptions = ({ form }: ProductFormProps) => {
  const [colorVariants, setColorVariants] = useState<ColorVariantsProps>([]);

  function handleDeleteThumbnail(index: number) {
    setColorVariants((prevVariant) => {
      const updatedVariants = prevVariant.map((value, i) =>
        i === index ? { ...value, thumbnail: "" } : { ...value },
      );

      return updatedVariants;
    });
  }
  function handleDeleteOthers(variantIndex: number, imageIndex: number) {
    setColorVariants((prevVariant) => {
      const updatedVariants = prevVariant.map((value, i) =>
        i === variantIndex
          ? {
              ...value,
              others: value.others.filter((_, index) => index !== imageIndex),
            }
          : { ...value },
      );

      return updatedVariants;
    });
  }

  const handleChange = (value: string) => {
    if (value === "") {
      setColorVariants([]);
      return;
    }
    if (value.endsWith(",")) {
      const parts = value.split(",").map((part) => part.trim());
      const filteredParts = parts.filter((part) => part !== "");
      setColorVariants((prevVariant) => [
        ...prevVariant,
        {
          color: filteredParts[filteredParts.length - 1],
          thumbnail: "",
          others: [],
        },
      ]);
    }
  };

  return (
    <div className="flex-1 p-5">
      <FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Color{" "}
              <span className="text-xs text-gray-400">&#40;optional&#41;</span>
            </FormLabel>
            <FormControl>
              <InputContainer className="max-w-l bg-[#f5f5f5]">
                <Input
                  placeholder="Color (separate with commas if multiple)"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChange(e.target.value);
                  }}
                />
              </InputContainer>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        {colorVariants.map((variant, i) => (
          <div key={i} className="mt-3">
            <h1 className="my-3 font-medium">
              <span>Color {i + 1}: </span>
              {variant.color}
            </h1>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed bg-gray-100 px-3 py-2">
                <span className="mb-2 text-xs">Thumbnail</span>
                <div className="h-20 w-20 md:h-16 md:w-16 lg:h-20 lg:w-20">
                  {variant.thumbnail !== "" ? (
                    <div className="relative h-full w-full">
                      <Image
                        fill
                        priority
                        className="bg-gray-200"
                        src={variant.thumbnail}
                        alt="Product image"
                        sizes="100vw"
                      />
                      <button
                        type="button"
                        className="absolute -right-3 top-0 z-50 rounded-full bg-red-500 p-1"
                        onClick={() => handleDeleteThumbnail(i)}
                      >
                        <Trash2 className="text-white" size={15} />
                      </button>
                    </div>
                  ) : form.getValues("slug") !== "" ? (
                    <div className="flex h-full items-center justify-center">
                      <ImagePicker
                        color={variant.color}
                        slug={form.getValues("slug")}
                        action="thumbnail"
                        setColorVariants={setColorVariants}
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <DisableImagePicker />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2 flex w-full flex-col justify-center overflow-hidden rounded-md bg-gray-100 px-3 py-2 md:col-span-3 lg:col-span-4">
                <span className="mb-2 self-start text-xs">Other images</span>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex h-20 w-[340px] gap-2 overflow-x-scroll hide-scrollbar">
                    {variant.others.map((image, othersIndex) => (
                      <div
                        className="relative h-full w-20 flex-shrink-0"
                        key={othersIndex}
                      >
                        <Image
                          fill
                          priority
                          className="bg-gray-200"
                          src={image}
                          alt="Product image"
                          sizes="100vw"
                        />
                        <button
                          type="button"
                          className="absolute -right-3 top-0 z-50 rounded-full bg-red-500 p-1"
                          onClick={() => handleDeleteOthers(i, othersIndex)}
                        >
                          <Trash2 className="text-white" size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {form.getValues("slug") !== "" ? (
                    <ImagePicker
                      color={variant.color}
                      slug={form.getValues("slug")}
                      setColorVariants={setColorVariants}
                      action="others"
                    />
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-solid-primary popover-trigger my-2"
                    >
                      <Ban />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["variantName", "variantValues"] as const).map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {item.replace(/([a-z])([A-Z])/g, "$1 $2")}{" "}
                  <span className="text-xs lowercase text-gray-400">
                    &#40;optional&#41;
                  </span>
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

export default ProductOptions;

function DisableImagePicker() {
  return (
    <div className="popover popover-hover">
      <label className="btn btn-sm btn-solid-primary popover-trigger my-2">
        <Ban />
      </label>
      <div className="popover-content">
        <div className="popover-arrow"></div>
        <div className="p-4 text-sm text-black">
          Colors can only added after creating Slug!
        </div>
      </div>
    </div>
  );
}
