export type RootLayoutProps = {
    children: React.ReactNode;
};
export type ShowNavBarProps = {
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
export type LinkButtonProps = {
    title: string;
    href: string;
    className?: React.HTMLProps<HTMLElement>["className"];
};
