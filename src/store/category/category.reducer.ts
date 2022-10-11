import { CategoryDoc } from '../../models/category.model';
import { CategoriesActionType } from './category.types';

export type CategoryAction = 
  {type: CategoriesActionType.FETCH_CATEGORIES_START; }
  | {type: CategoriesActionType.FETCH_CATEGORIES_FAILED; payload: any;}
  | {type: CategoriesActionType.FETCH_CATEGORIES_SUCCESS; payload: CategoryDoc[];}

export type CategoryState = {
  categories: CategoryDoc[];
  isReady: boolean;
  isLoading: boolean;
  error: any;
}

const CATEGORY_INITIAL_STATE: CategoryState = {
  categories: [], 
  isReady: false,
  isLoading: false,
  error: null
};

export const categoriesReducer //: (state: CategoryState, action: CategoryAction) => CategoryState
    = (state: CategoryState = CATEGORY_INITIAL_STATE, action: CategoryAction): CategoryState => {
  //console.log("dispatch categories", action);
  switch(action.type) {
    case CategoriesActionType.FETCH_CATEGORIES_START:
      return {...state, isLoading: true, isReady: false};    
    case CategoriesActionType.FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.payload, isReady: true, isLoading: false};  
    case CategoriesActionType.FETCH_CATEGORIES_FAILED:
      return {...state, error: action.payload, isReady: true, isLoading: false};        
    default:
      return state;
  }
}