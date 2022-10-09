import React, { createContext, useEffect, useState } from 'react'
import { getCollectionAndDocuments } from '../firebase/firebase.utils';
import { CategoryDb, CategoryMap } from '../models/category.model';
import { Product } from '../models/product.model';
//import { addCollectionAndDocuments } from '../firebase/firebase.utils';
//import { CategoryDb } from '../models/category.model';
//import shop_data from "../shop-data.js";

interface Props {
  children: React.ReactNode;
}

export interface CategoryContextInterface {
  categories: CategoryMap;
  isReady: boolean;
}

export const CategoryContext = createContext<CategoryContextInterface>(
  {categories: {}, isReady: false }
);

// const getProducts = () => {
//   return shop_data.flatMap( cat => cat.items.map( item => ({...item, category: cat.title})));
// }

const CategoryContextProvider = ({children}: Props) => {
  const [categories, setCategories] = useState<CategoryMap>({});
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // addCollectionAndDocuments<CategoryDb>(
    //   "categories", 
    //   shop_data,
    //   category => category.title.toLowerCase()
    // );

    getCollectionAndDocuments<CategoryDb,Product[]>(
        "categories",
        (object) => object.title.toLowerCase(),
        (object) => object.items)
      .then( data => {
        //console.log(data);
        setCategories(data);
        setIsReady(true);
      })
      .catch(err => console.log(err));  
  },[])

  return (
    <CategoryContext.Provider value = {{categories, isReady}}>      
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider;
