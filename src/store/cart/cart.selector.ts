import { createSelector } from "reselect";
import { CartItem } from "../../models/cart.model";
import { RootState } from "../store";

export const selectCartSlice = (state: RootState) => state.cart;

const selectCartSliceIsOpen = (state: RootState) => state.cart.isCartOpen;
const selectCartSliceCartItems = (state: RootState) => state.cart.cartItems;

export const selectCartIsOpen = createSelector(
  [selectCartSliceIsOpen],
  (isCartOpen) => ({isCartOpen: isCartOpen})
)   

//we can also use this combined selector in place individual selectors
//for items, count, and total. As when we update the items - total & count need to be updated too
export const selectCart = createSelector(
  [selectCartSliceCartItems],
  (cartItems) => {
    //console.log("selectCart")
    return {
      cartItems,
      cartCount: getItemsCount(cartItems),
      cartTotal: getItemsTotal(cartItems)
    }
  }  
);

export const selectCartItems = createSelector(
  [selectCartSliceCartItems],
  (cartItems) => {
    //console.log("selectCartItems")
    return {
      cartItems
    }
  }  
);

export const selectCartCount = createSelector(
  [selectCartSliceCartItems],
  (cartItems) => {
    //console.log("selectCartCount")
    return {
      cartCount: getItemsCount(cartItems)
    }
  }  
);

export const selectCartTotal = createSelector(
  [selectCartSliceCartItems],
  (cartItems) => {
    //console.log("selectCartTotal")
    return {
      cartTotal: getItemsTotal(cartItems)
    }
  }  
);

function getItemsTotal(cartItems: CartItem[]): number {
  return cartItems.reduce<number>( (total, item) => total + item.quantity*item.price , 0);
}

function getItemsCount(cartItems: CartItem[]): number {
  return cartItems.reduce<number>( (total, item) => total + item.quantity , 0);
}