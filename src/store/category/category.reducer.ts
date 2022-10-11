import { CategoryDoc } from '../../models/category.model';
import { CategoriesActionType } from './category.types';

export type CategoryAction = {type: CategoriesActionType.SET_CATEGORIES; payload: CategoryDoc[];}

export type CategoryState = {
  categories: CategoryDoc[];
  isReady: boolean;
}

const INITIAL_STATE: CategoryState = {categories: [], isReady: false};

export const categoriesReducer //: (state: CategoryState, action: CategoryAction) => CategoryState
    = (state: CategoryState = INITIAL_STATE, action: CategoryAction): CategoryState => {
  //console.log("dispatch categories", action);
  switch(action.type) {
    case CategoriesActionType.SET_CATEGORIES:
      return {...state, categories: action.payload, isReady: true};  
    default:
      return state;
  }
}