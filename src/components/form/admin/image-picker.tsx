import { Plus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import cuid from "cuid";

type ColorVariant = {
  color: string;
  thumbnail: string;
  others: string[];
};
type ColorVariantsProps = ColorVariant[];

type ImagePickerProps = {
  slug: string;
  color: string;
  action: "thumbnail" | "others";
  setColorVariants: Dispatch<SetStateAction<ColorVariantsProps>>;
};

const ImagePicker = ({
  slug,
  color,
  action,
  setColorVariants,
}: ImagePickerProps) => {
  function onUpload(result: any) {
    console.log(result.info);

    if (action === "thumbnail") {
      setColorVariants((prevVariant) => {
        const variantIndex = prevVariant.findIndex(
          (value) => value.color === color,
        );
        const updatedVariants = prevVariant.map((value, i) =>
          i === variantIndex
            ? { ...value, thumbnail: result.info.secure_url }
            : { ...value },
        );

        return updatedVariants;
      });
    } else {
      setColorVariants((prevVariant) => {
        const variantIndex = prevVariant.findIndex(
          (value) => value.color === color,
        );
        const updatedVariants = prevVariant.map((value, i) =>
          i === variantIndex
            ? { ...value, others: [...value.others, result.info.secure_url] }
            : { ...value },
        );

        return updatedVariants;
      });
    }
  }

  return (
    <CldUploadWidget
      uploadPreset="tp8anoex"
      onUpload={onUpload}
      options={{
        sources: ["local"],
        multiple: action !== "thumbnail",
        folder: `products/${slug}/${color.replaceAll(" ", "-").toLowerCase()}`,
        publicId: action === "thumbnail" ? "thumbnail" : "",
        singleUploadAutoClose: false,
      }}
    >
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open();
        }
        return (
          <button
            className="btn btn-sm btn-solid-primary popover-trigger my-2"
            onClick={handleOnClick}
            type="button"
          >
            <Plus />
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImagePicker;
