"use client";

import {
  AddressProps,
  CartItemProps,
  ColorVariant,
  LayoutProps,
} from "@/lib/types/types";
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
  deliveryAddress: AddressProps | undefined;
  setDeliveryAddress: Dispatch<SetStateAction<AddressProps | undefined>>;
};

const GlobalContext = createContext<ContextProps>({
  cartItems: [],
  setCartItems: (): CartItemProps[] => [],
  colorVariants: [],
  setColorVariants: (): ColorVariant[] => [],
  deliveryAddress: undefined,
  setDeliveryAddress: (): AddressProps | undefined => undefined,
});

export const GlobalContextProvider = ({ children }: LayoutProps) => {
  const [cartItems, setCartItems] = useState<CartItemProps[] | []>([]);
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<
    AddressProps | undefined
  >();
  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        setCartItems,
        colorVariants,
        setColorVariants,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
