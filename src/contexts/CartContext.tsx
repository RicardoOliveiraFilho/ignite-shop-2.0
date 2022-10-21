import { createContext, ReactNode, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: IProduct[];
  cartTotal: number;
  cartQuantity: number;
  addToCart: (product: IProduct) => void;
  removeCartItem: (productId: string) => void;
  checkIfItemAlreadyExists: (productId: string) => boolean;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([])

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice
  }, 0)

  const cartQuantity = cartItems.length

  function addToCart(product: IProduct) {
    setCartItems((prevState) => [ ...prevState, product ])
  }

  function removeCartItem(productId: string) {
    setCartItems((prevState) => prevState.filter((product) => product.id !== productId))
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      cartQuantity,
      addToCart,
      removeCartItem,
      checkIfItemAlreadyExists
    }}>
      {children}
    </CartContext.Provider>
  )
}