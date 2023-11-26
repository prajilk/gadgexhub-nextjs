import { Input, InputContainer } from "@/components/ui/input";
import { Ban, X } from "lucide-react";
import ImagePicker from "./image-picker";
import { AddColorSectionProps } from "@/lib/types/types";
import ImagePreview from "./image-preview";
import { useGlobalContext } from "@/context/store";
import { capitalizeSearchParam } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

const AddColorSection = ({
  variant,
  index,
  form,
  setDisable,
}: AddColorSectionProps) => {
  const { setColorVariants } = useGlobalContext();

  function addColor(color: string, index: number) {
    if (index === 0 && color === "default") setDisable(true);
    else setDisable(false);
    setColorVariants((prevVariant) =>
      prevVariant.map((value, i) =>
        i === index
          ? { ...value, color: capitalizeSearchParam(color)! }
          : value,
      ),
    );
  }

  function removeColorSection(index: number) {
    setColorVariants((prevVariant) =>
      prevVariant.filter((_, i) => i !== index),
    );
  }

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-sm">
          Color {index + 1}:{" "}
          {index === 0 && (
            <span className="text-xs text-gray-400">
              &#40;Type &apos;default&apos; if there is only a single color
              variant!&#41;
            </span>
          )}
        </h1>
        <button type="button" onClick={() => removeColorSection(index)}>
          <X size={20} />
        </button>
      </div>
      <div className="flex items-center gap-5">
        <InputContainer className="bg-gray-100">
          <Input
            type="text"
            onChange={(e) => addColor(e.target.value, index)}
            placeholder="Enter color"
          />
        </InputContainer>
      </div>
      <div className="relative overflow-hidden">
        <div
          className={`${
            variant.color === ""
              ? "fixed -z-30 -translate-y-[100%]"
              : "translate-y-0"
          } grid grid-cols-3 gap-3 border-b pb-5 duration-300 md:grid-cols-4 lg:grid-cols-5`}
        >
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed bg-gray-100 px-3 py-2">
            <span className="mb-2 text-xs">Thumbnail</span>
            <div className="h-20 w-20 md:h-16 md:w-16 lg:h-20 lg:w-20">
              {variant.thumbnail !== "" ? (
                <ImagePreview
                  image={variant.thumbnail}
                  variantIndex={index}
                  action="thumbnail"
                />
              ) : form.getValues("slug") !== "" ? (
                <div className="flex h-full items-center justify-center">
                  <ImagePicker
                    variant={variant}
                    variantIndex={index}
                    action="thumbnail"
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
              <div className="flex h-20 w-[340px] gap-2 overflow-x-scroll hide-scrollbar md:h-16 lg:h-20">
                {variant.others.map((image, othersIndex) => (
                  <ImagePreview
                    image={image}
                    imageIndex={othersIndex}
                    action="others"
                    variantIndex={index}
                    key={othersIndex}
                  />
                ))}
              </div>
              {form.getValues("slug") !== "" ? (
                <ImagePicker
                  variant={variant}
                  variantIndex={index}
                  action="others"
                />
              ) : (
                <Button
                  isIconOnly
                  aria-label="disable"
                  variant="flat"
                  className="bg-[rgba(0,111,238,0.15)] text-[#006FEE]"
                >
                  <Ban />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddColorSection;

function DisableImagePicker() {
  return (
    <Tooltip
      content="Images can only added after creating Slug!"
      placement="right"
      className="bg-white px-4 py-2"
    >
      <Button
        isIconOnly
        type="button"
        className="bg-[rgba(0,111,238,0.15)] text-[#006FEE]"
      >
        <Ban />
      </Button>
    </Tooltip>
  );
}
