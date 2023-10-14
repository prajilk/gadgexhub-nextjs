"use client";

import { CartItemProps, ColorVariant, LayoutProps } from "@/lib/types/types";
import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

type ContextProps = {
  cartItems: CartItemProps[];
  setCartItems: Dispatch<SetStateAction<CartItemProps[]>>;
  colorVariants: ColorVariant[];
  setColorVariants: Dispatch<SetStateAction<ColorVariant[]>>;
};

const GlobalContext = createContext<ContextProps>({
  cartItems: [],
  setCartItems: (): CartItemProps[] => [],
  colorVariants: [],
  setColorVariants: (): ColorVariant[] => [],
});

export const GlobalContextProvider = ({ children }: LayoutProps) => {
  const [cartItems, setCartItems] = useState<CartItemProps[] | []>([]);
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);
  return (
    <GlobalContext.Provider
      value={{ cartItems, setCartItems, colorVariants, setColorVariants }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
