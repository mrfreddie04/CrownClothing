import { CategoryDoc } from '../../models/category.model';
import { createAction } from '../../utils/reducer.utils';
import { CategoriesActionType } from './category.types';

export const setCategories = (categories: CategoryDoc[]) => 
  createAction(CategoriesActionType.SET_CATEGORIES, categories);