import React, { createContext, useEffect, useState } from 'react'
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

interface Props {
  children: React.ReactNode;
}

export interface CartContextInterface {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  setIsCartOpen: (IsCartOpen:boolean) => void;
  addItemToCart: (item: Product) => void;
  removeItemFromCart: (id: number) => void; 
  increaseQuantity: (id: number) => void; 
  decreaseQuantity: (id: number) => void; 
}

export const CartContext = createContext<CartContextInterface>(
  {
    cartItems: [], 
    isCartOpen: false, 
    cartCount: 0,
    cartTotal: 0,
    setIsCartOpen: (_: boolean) => {},
    addItemToCart: (_: Product) => {}, 
    removeItemFromCart: (_: number) => {}, 
    increaseQuantity: (_: number) => {}, 
    decreaseQuantity: (_: number) => {}    
  }
);

const increaseItemQuantity = (cartItems: CartItem[], id: number): CartItem[] => {
  return cartItems.map( cartItem => 
    (cartItem.id === id) 
      ? ({...cartItem, quantity: cartItem.quantity+1})
      : cartItem
  );
}  

const decreaseItemQuantity = (cartItems: CartItem[], id: number): CartItem[] => {
  return cartItems
    .map( cartItem => 
      (cartItem.id === id) 
        ? ({...cartItem, quantity: cartItem.quantity-1})
        : cartItem
        )  
    .filter( cartItem => !(cartItem.id === id && cartItem.quantity === 0 ));   
  //   const item = cartItems.find( item => item.id === id);
  //   if(item && item.quantity > 1) {
  //     return cartItems
  //       .map( cartItem => 
  //         (cartItem.id === id) 
  //           ? ({...cartItem, quantity: cartItem.quantity-1})
  //           : cartItem
  //           )
  //   }

  //  return removeCartItem(cartItems, id);
}  

const addCartItem = (cartItems: CartItem[], product: Product): CartItem[] => {
  const item = cartItems.find( item => item.id === product.id);
  if(item) {
    return increaseItemQuantity(cartItems, product.id);
  }      
  return [...cartItems, {...product, quantity:1}];
}

const removeCartItem = (cartItems: CartItem[], id: number): CartItem[] => {
  return cartItems.filter( cartItem => cartItem.id !== id);
}

const getItemsCount = (cartItems: CartItem[]): number => {
  return cartItems.reduce<number>( (total, item) => total + item.quantity , 0);
}

const getItemsTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce<number>( (total, item) => total + item.quantity*item.price , 0);
}

const CartContextProvider = ({children}: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    setCartCount(getItemsCount(cartItems));
  },[cartItems]);

  useEffect(() => {
    setCartTotal(getItemsTotal(cartItems));
  },[cartItems]);  

  const addItemToCart = (product: Product) => {
    setCartItems(addCartItem(cartItems, product));   
  }

  const removeItemFromCart = (id: number) => {
    setCartItems(removeCartItem(cartItems, id));   
  }

  const increaseQuantity= (id: number) => {
    setCartItems(increaseItemQuantity(cartItems, id));   
  }  

  const decreaseQuantity= (id: number) => {
    setCartItems(decreaseItemQuantity(cartItems, id));   
  }    

  const value: CartContextInterface = {
    cartItems, 
    isCartOpen, 
    cartCount,//: getItemsCount(cartItems), 
    cartTotal,
    setIsCartOpen, 
    addItemToCart,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value = {value}>      
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;
