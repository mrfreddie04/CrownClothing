import "./shop.styles.scss";
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useEffect } from "react";
import { getCollectionAndDocuments } from "../../firebase/firebase.utils";
import { CategoryDoc } from "../../models/category.model";
import { setCategories } from "../../store/category/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("Dispatch Categories")
    getCollectionAndDocuments<CategoryDoc>("categories")
      .then( categories => {
        //console.log(categories);
        dispatch(setCategories(categories));
      })
      .catch(err => console.log(err));  
  // eslint-disable-next-line  
  },[]); 
    
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<Category/>} />
    </Routes>    
  )
}

export default Shop;