import "./shop.styles.scss";
import { Route, Routes } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useEffect } from "react";
import { fetchCategoriesStartAsync } from "../../store/category/category.action";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Shop = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStartAsync());
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