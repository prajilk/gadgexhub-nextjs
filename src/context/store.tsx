"use client";

import { AddressProps, CartItemProps, LayoutProps } from "@/lib/types/types";
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
  deliveryAddress: AddressProps | undefined;
  setDeliveryAddress: Dispatch<SetStateAction<AddressProps | undefined>>;
};

const GlobalContext = createContext<ContextProps>({
  cartItems: [],
  setCartItems: (): CartItemProps[] => [],
  deliveryAddress: undefined,
  setDeliveryAddress: (): AddressProps | undefined => undefined,
});

export const GlobalContextProvider = ({ children }: LayoutProps) => {
  const [cartItems, setCartItems] = useState<CartItemProps[] | []>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<
    AddressProps | undefined
  >();
  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        setCartItems,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
