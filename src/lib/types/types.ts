import { JsxElement } from "typescript";
import { z } from "zod";
import { ZodAddressSchema, ZodProductSchema } from "../zodSchemas";
import { UseFormReturn } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

type Res = {
  success: boolean;
  message: string;
};

export type LayoutProps = {
  children: React.ReactNode;
};
export type DropdownItemProps = {
  title: string;
  subItems?: {
    title: string;
    url: string;
  }[];
};
export type NavProps = {
  title: string;
  subItems?: {
    title: string;
    url: string;
  }[];
  url?: string;
};
export type ProductCardProps = {
  title: string;
  imgUrl: string;
  description: string;
  price: number;
  href: string;
};
export type SlideProps = {
  title: string;
  description: string;
  basePrice: number;
  discountedPrice: number;
  href: string;
  url: string;
  urlSm: string;
};
export type LinkButtonProps = LayoutProps & {
  href: string;
  className?: React.HTMLProps<HTMLElement>["className"];
};
export type ButtonProps = {
  children?: React.ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};
export type LoadingButtonProps = ButtonProps & {
  loader: boolean;
};
export type CustomInputProps = {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  containerStyle?: React.HTMLProps<HTMLElement>["className"];
  inputStyle?: React.HTMLProps<HTMLElement>["className"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactElement<JsxElement>;
};
export type AccountCardProps = {
  icon: React.ReactElement<JsxElement>;
  title: string;
};

export type UserResProps = Res & {
  user: {
    id?: string;
    email?: string;
    name?: string;
    gender?: string | null;
    phone?: string | null;
  };
};

export type AddressProps = z.infer<typeof ZodAddressSchema> & {
  address_id: number;
};

export type AddressResProps = {
  success: boolean;
  addresses: AddressProps[] | null;
  message: string;
};

export type SingleAddressResProps = Res & {
  addresses: AddressProps;
  isDefault?: boolean;
};

export type ColorVariantRes = {
  color: string | null;
  images: {
    id: number;
    url: string;
  }[];
};

export type MakeColorVariant = {
  colors: string | null;
  images: {
    id: number;
    imagePublicId: string;
    productId: string;
  }[];
};

export type ProductPrice = {
  basePrice: number;
  offerPrice: number;
};

export type ProductPriceRes = Res & {
  data: ProductPrice | null;
};

export type ProductProps = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  description: string;
  categoryId: number;
  stock: number;
  variantName: string;
  variantValues: string;
  createdAt: Date;
  colorVariants: ColorVariantRes[];
} & ProductPrice;

export type ProductResProps = Res & {
  product: ProductProps;
};

export type CartItemProps = {
  id: string;
  slug: string;
  title: string;
  image: string;
  color: string | null;
  quantity: number;
  url: string;
};

export type ProductFormProps = {
  form: UseFormReturn<z.infer<typeof ZodProductSchema>, any, undefined>;
};

export type AddColorSectionProps = {
  variant: ColorVariant;
  index: number;
  setDisable: Dispatch<SetStateAction<boolean>>;
} & ProductFormProps;

export type ColorVariant = {
  color: string;
  thumbnail: string;
  others: string[];
};

export type ImagePreviewProps = {
  image: string;
  variantIndex: number;
  imageIndex?: number;
  action: "thumbnail" | "others";
};

export type ImagePickerProps = {
  action: "thumbnail" | "others";
  variant: ColorVariant;
  variantIndex: number;
};

export type AddProductResProps = Res & {
  info: any;
};
