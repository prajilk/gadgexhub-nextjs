// import { createContext } from "react";

// const UploadsContext = createContext();
// const ProfileModalContext = createContext();

// export { UploadsContext, ProfileModalContext };

"use client";

import { LayoutProps } from "@/lib/types/types";
import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

export type ProductActionsProps = {
  id: string;
  title: string;
  image: string;
  variant: string;
  quantity: number;
  url: string;
};

type ContextProps = {
  cartItems: ProductActionsProps[];
  setCartItems: Dispatch<SetStateAction<ProductActionsProps[]>>;
};

const GlobalContext = createContext<ContextProps>({
  cartItems: [],
  setCartItems: (): ProductActionsProps[] => [],
});

export const GlobalContextProvider = ({ children }: LayoutProps) => {
  const [cartItems, setCartItems] = useState<ProductActionsProps[] | []>([]);
  return (
    <GlobalContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
