import { JsxElement } from "typescript";

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
export type UserProps = {
  success: boolean;
  user: {
    id: string;
    email: string;
    fullname: string;
    gender: string | null;
    phone: string | null;
  };
  message: string;
};
