import React, { createContext, Reducer, useReducer } from 'react'
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

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

const addCartItem = (cartItems: CartItem[], product: Product): CartItem[] => {
  const item = cartItems.find( item => item.id === product.id);
  if(item) {
    return increaseItemQuantity(cartItems, product.id);
  }      
  return [...cartItems, {...product, quantity:1}];
}

interface State {
  cartItems: CartItem[]; 
  isCartOpen: boolean; 
  cartCount: number; 
  cartTotal: number;
}

enum CartActions {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_CART_OPEN = "SET_CART_OPEN"
}

type Action =  
  {type: CartActions.SET_CART_ITEMS, payload: Partial<State>;} 
  | {type: CartActions.SET_CART_OPEN, payload: boolean;};

const cartReducer: Reducer<State,Action> = (state: State, action: Action): State => {
  switch (action.type) {
    case CartActions.SET_CART_ITEMS:
      return {...state, ...action.payload};    
    case CartActions.SET_CART_OPEN:  
      return {...state, isCartOpen: action.payload};    
    default:
      throw new Error('Unhandled Cart action type');
  }
}

interface Props {
  children: React.ReactNode;
}

const CartContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(cartReducer, 
    {cartItems: [], isCartOpen: false, cartCount: 0, cartTotal: 0});

  const updateCartItemsReducer = (newCartItems: CartItem[]): void => {
    const newCartCount = getItemsCount(newCartItems); 
    const newCartTotal = getItemsTotal(newCartItems);      
    dispatch({type: CartActions.SET_CART_ITEMS, 
      payload: { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal }});    
  } 
    
  const setIsCartOpen = (isCartOpen: boolean) => dispatch({type: CartActions.SET_CART_OPEN, payload: isCartOpen});
  const addItemToCart = (product: Product) => updateCartItemsReducer(addCartItem(state.cartItems, product));
  const removeItemFromCart = (id: number) => updateCartItemsReducer(removeCartItem(state.cartItems, id));
  const increaseQuantity = (id: number) => updateCartItemsReducer(increaseItemQuantity(state.cartItems, id));
  const decreaseQuantity = (id: number) => updateCartItemsReducer(decreaseItemQuantity(state.cartItems, id));
  
  const value: CartContextInterface = {
    ...state,
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
