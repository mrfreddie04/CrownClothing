import { Dispatch, AnyAction } from 'redux';
import { getCollectionAndDocuments } from '../../firebase/firebase.utils';
import { CategoryDoc } from '../../models/category.model';
import { createAction } from '../../utils/reducer.utils';
import { CategoriesActionType } from './category.types';

// export const setCategories = (categories: CategoryDoc[]) => 
//   createAction(CategoriesActionType.SET_CATEGORIES, categories);

//Thunk actions
export const fetchCategoriesAsync = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchCategoriesStart());
    try {
      const categories = await getCollectionAndDocuments<CategoryDoc>("categories");
      console.log("SUCCESS", categories);
      dispatch(fetchCategoriesSuccess(categories));
    } catch(err) {
      dispatch(fetchCategoriesFailed(err));
    }
  }
}

//Regular Synchronous action
export const fetchCategoriesStart = () => {
  return createAction(CategoriesActionType.FETCH_CATEGORIES_START);  
}  

export const fetchCategoriesSuccess = (categories: CategoryDoc[]) => {
  return createAction(CategoriesActionType.FETCH_CATEGORIES_SUCCESS, categories);  
}  

export const fetchCategoriesFailed = (error: any) => {
  return createAction(CategoriesActionType.FETCH_CATEGORIES_FAILED, error);  
}  

