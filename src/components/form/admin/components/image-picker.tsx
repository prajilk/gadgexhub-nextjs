import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImagePickerProps } from "@/lib/types/types";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import ImagePreview from "./image-preview";
import { useGlobalContext } from "@/context/store";

const ImagePicker = ({ action, variant, variantIndex }: ImagePickerProps) => {
  const { setColorVariants } = useGlobalContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const binaryStr = reader.result;
        if (action === "thumbnail") {
          setColorVariants((prevVariant) =>
            prevVariant.map((value, i) => ({
              ...value,
              thumbnail:
                i === variantIndex && typeof binaryStr === "string"
                  ? binaryStr
                  : value.thumbnail,
            })),
          );
        } else {
          setColorVariants((prevVariant) =>
            prevVariant.map((value, i) => ({
              ...value,
              others:
                i === variantIndex
                  ? [
                      ...value.others,
                      typeof binaryStr === "string" ? binaryStr : "",
                    ]
                  : value.others,
            })),
          );
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="btn btn-sm btn-solid-primary popover-trigger my-2"
          type="button"
        >
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Product Images.</DialogTitle>
        </DialogHeader>
        <Dropzone
          onDrop={onDrop}
          accept={{
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
          }}
          multiple={action !== "thumbnail"}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              className={`${
                isDragActive ? "border-blue-500" : "border-gray-300"
              } h-28 w-full rounded-lg border-2 border-dashed bg-gray-100`}
            >
              <div
                {...getRootProps({
                  className:
                    "flex h-full items-center justify-center p-5 text-center",
                  onDrop: (event) => event.stopPropagation(),
                })}
              >
                <input {...getInputProps()} />
                <div className="flex h-full cursor-default items-center justify-center p-5 text-center">
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag &apos;n&apos; drop images here, or click to select
                      files
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Dropzone>
        {action === "others" && (
          <div className="flex h-20 w-full gap-3 overflow-x-scroll hide-scrollbar">
            {variant.others.map((image, i) => (
              <ImagePreview
                image={image}
                imageIndex={i}
                action="others"
                variantIndex={variantIndex}
                key={i}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImagePicker;
