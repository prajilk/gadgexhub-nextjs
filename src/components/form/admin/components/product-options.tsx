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
import { Ban, Plus } from "lucide-react";
import AddColorSection from "./add-color-section";
import { useGlobalContext } from "@/context/store";

const ProductOptions = ({ form }: ProductFormProps) => {
  const { colorVariants, setColorVariants } = useGlobalContext();
  const [disable, setDisable] = useState(false);

  function addColorSection() {
    setColorVariants((prevVariant) => [
      ...prevVariant,
      { color: "", thumbnail: "", others: [] },
    ]);
  }

  return (
    <div className="flex-1 p-5">
      <div className="mb-3 flex w-full justify-between">
        <p className="font-medium">Color</p>
        <button
          className="btn btn-xs btn-solid-primary float-right"
          type="button"
          disabled={disable}
          onClick={addColorSection}
        >
          {disable ? <Ban /> : <Plus />}
        </button>
      </div>
      <hr />
      <div>
        {colorVariants.map((variant, i) => (
          <AddColorSection
            form={form}
            index={i}
            variant={variant}
            setDisable={setDisable}
            key={i}
          />
        ))}
      </div>
      <hr />
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

export default ProductOptions;
