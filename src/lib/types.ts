import { JsxElement } from "typescript";
import { ZodAuthSchema } from "./zodSchemas";
import { z } from "zod";

export type LayoutProps = {
    children: React.ReactNode;
};
export type ValidateFormDataProps = z.infer<typeof ZodAuthSchema>;
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
export type LinkButtonProps = {
    title: string;
    href: string;
    className?: React.HTMLProps<HTMLElement>["className"];
};
export type ButtonProps = {
    children?: React.ReactNode;
    type?: "button" | "reset" | "submit" | undefined;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
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
