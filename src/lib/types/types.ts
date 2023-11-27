import { JsxElement } from "typescript";
import { z } from "zod";
import { ZodAddressSchema, ZodProductSchema } from "../zodSchemas";
import { UseFormReturn } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { BestDeal, Image, Product } from "@prisma/client";

type Res = {
  user: null | undefined;
  success: boolean;
  message: string;
};

export type LayoutProps = {
  children: React.ReactNode;
};

export type ProductCardProps = {
  title: string;
  imgUrl: string;
  description: string;
  price: number;
  href: string;
};
export type LinkButtonProps = LayoutProps & {
  href: string;
  className?: React.HTMLProps<HTMLElement>["className"];
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

export type UserResProps = {
  success: boolean;
  message: string;
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
  images: Image[];
};

export type ProductProps = Omit<Product, "color"> & {
  colorVariants: ColorVariantRes[];
};

export type ProductResProps = Res & {
  product: ProductProps | null;
};

export type CartItemProps = {
  itemId: number;
  pid: string;
  slug: string;
  title: string;
  image: string;
  basePrice: number;
  offerPrice: number;
  color: string | null;
  quantity: number;
  url: string;
};

export type CheckoutItemProps = {
  productId: string;
  quantity: number;
  color: string | null;
};

export type CheckoutItemRes = Res & { products: ItemSummaryProps[] | null };

export type ItemSummaryProps = {
  id: string;
  quantity: number;
  basePrice: number;
  offerPrice: number;
  title: string;
  image: string;
};

export type CartItemRes = Res & { item: CartItemProps | null };
export type CartItemsRes = Res & { item: CartItemProps[] | null };

export type CartItemQuantity = {
  itemId: number;
  quantity: number;
};

export type CartItemQuantityRes = Res & { item: CartItemQuantity | null };

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

export type PaymentRes = Res & {
  id: string;
  currency: string;
  amount: string | number;
  orderId: string;
};

export type ItemSummary = {
  productId: string;
  slug: string;
  color: string | null;
  title: string;
  quantity: number;
  basePrice: number;
  offerPrice: number;
  imageUrl: string;
};

export type SingleOrderRes = Res & {
  order: {
    orderDate: Date;
    address: AddressProps;
    orderItems: ItemSummary[];
    method?: string;
    via?: string;
  } | null;
};

export type AllOrdersRes = Res & {
  orders: {
    imageUrl: string[];
    orderId: string;
    orderDate: Date;
    status: string;
  }[];
};

export type BestDealRes = Res & {
  deal: BestDeal | null;
};

export interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

export type NavbarCategories = {
  parent: string;
  child: string[];
};

export interface CategoryStructure {
  parents: string[];
  selected: string;
  child: string[];
}

export type CategoryProducts = {
  pid: string;
  slug: string;
  image: string;
  title: string;
  offerPrice: number;
  basePrice: number;
  stock: number;
}[];
