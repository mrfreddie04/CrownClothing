import { createSelector } from "reselect";
import { Product } from "../../models/product.model";
import { RootState } from "../store";

const selectCategorySlice = (state: RootState) => state.categories;
const selectCategorySliceIsLoading = (state: RootState) => state.categories.isLoading;
//const selectCategorySliceMap = (state: RootState) => state.categories.categories;

export const selectCategories = createSelector(
  [selectCategorySlice],
  (categoriesSlice) => {
    //console.log("selectCategories",categoriesSlice);
    return categoriesSlice.categories;
  }  
);

export const selectCategoriesMap =  createSelector(
  [selectCategories],
  (categories) => ({
    //console.log("selectCategoriesMap",categories);
    categories: categories.reduce<{[key: string]: Product[]}>( (acc, category) => {
      acc[category.title.toLowerCase()] = category.items;
      return acc;
    },{})    
  })  
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategorySliceIsLoading],
  (isLoading) => ({isLoading})
);

// export const selectCategoriesMapFull =  createSelector(
//   [selectCategorySlice],
//   (categoriesSlice) => {
//     const categoriesMap = categoriesSlice.categories.reduce<{[key: string]: Product[]}>( (acc, category) => {
//       acc[category.title.toLowerCase()] = category.items;
//       return acc;
//     },{});    
//     return {
//       isReady: categoriesSlice.isReady,
//       categories: categoriesMap
//     }
//   }
// );

// export const selectCategoriesMapOld = (state: RootState): {isReady:boolean, categories: CategoryMap} => {  
//   const { isReady, categories } = state.categories;
//   return {
//     isReady,
//     categories: categories.reduce<{[key: string]: Product[]}>( (acc, category) => {
//       acc[category.title.toLowerCase()] = category.items;
//       return acc;
//     },{})
//   };
// }  

