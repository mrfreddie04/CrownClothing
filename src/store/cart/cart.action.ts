import { CartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';
import { createAction } from './../../utils/reducer.utils';
import { CartActionType } from './cart.types';

export const setIsCartOpen = (isCartOpen: boolean) => createAction(CartActionType.SET_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems: CartItem[], product: Product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CartActionType.SET_CART_ITEMS, newCartItems);
}  

export const removeItemFromCart = (cartItems: CartItem[], id: number) => {
  const newCartItems = removeCartItem(cartItems, id);
  return createAction(CartActionType.SET_CART_ITEMS, newCartItems);
}  

export const increaseQuantity = (cartItems: CartItem[], id: number) => {
  const newCartItems = increaseItemQuantity(cartItems, id);
  return createAction(CartActionType.SET_CART_ITEMS, newCartItems);
}  

export const decreaseQuantity = (cartItems: CartItem[], id: number) => {
  const newCartItems = decreaseItemQuantity(cartItems, id);
  return createAction(CartActionType.SET_CART_ITEMS, newCartItems);
}  

function addCartItem(cartItems: CartItem[], product: Product): CartItem[]  {
  const item = cartItems.find( item => item.id === product.id);
  if(item) {
    return increaseItemQuantity(cartItems, product.id);
  }      
  return [...cartItems, {...product, quantity:1}];
}

function removeCartItem(cartItems: CartItem[], id: number): CartItem[]  {
  return cartItems.filter( cartItem => cartItem.id !== id);
}

function increaseItemQuantity(cartItems: CartItem[], id: number): CartItem[] {
  return cartItems.map( cartItem => 
    (cartItem.id === id) 
      ? ({...cartItem, quantity: cartItem.quantity+1})
      : cartItem
  );
}  
  
function decreaseItemQuantity(cartItems: CartItem[], id: number): CartItem[] {
  return cartItems
    .map( cartItem => 
      (cartItem.id === id) 
        ? ({...cartItem, quantity: cartItem.quantity-1})
        : cartItem
        )  
    .filter( cartItem => !(cartItem.id === id && cartItem.quantity === 0 ));   
}  
