import { CartItem } from "../../models/cart.model";
import { CartActionType } from "./cart.types";

export interface CartState {
  cartItems: CartItem[]; 
  isCartOpen: boolean; 
}

export type CartAction =  
  {type: CartActionType.SET_CART_ITEMS, payload: CartItem[];} 
  | {type: CartActionType.SET_CART_OPEN, payload: boolean;};

const CART_INITIAL_STATE: CartState = {cartItems: [], isCartOpen: false };  

export const cartReducer //: (state: CartState, action: CartAction) => CartState
    = (state: CartState = CART_INITIAL_STATE, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.SET_CART_ITEMS:
      return {...state, cartItems: action.payload};    
    case CartActionType.SET_CART_OPEN:  
      return {...state, isCartOpen: action.payload};    
    default:
      return state;
  }
}