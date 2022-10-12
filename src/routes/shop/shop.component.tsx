import "./shop.styles.scss";
import { Route, Routes } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useEffect } from "react";
import { fetchCategoriesStart } from "../../store/category/category.action";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Shop = () => {
  const dispatch = useAppDispatch();
  //const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(fetchCategoriesAsync());
    dispatch(fetchCategoriesStart());
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