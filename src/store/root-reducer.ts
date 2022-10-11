import { combineReducers, CombinedState, Reducer } from "redux";
import { cartReducer, CartState } from "./cart/cart.reducer";
import { categoriesReducer, CategoryState } from "./category/category.reducer";
import { userReducer, UserState } from "./user/user.reducer";

type RootReducer = Reducer<CombinedState<{
  user: UserState,
  category: CategoryState,
  cart: CartState
}>>

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer
})