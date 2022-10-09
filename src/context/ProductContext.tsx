import React, { createContext, useEffect, useState } from 'react'
import { Product } from '../models/product.model';
import shop_data from "../shop-data.json";

interface Props {
  children: React.ReactNode;
}

export interface ProductContextInterface {
  products: Product[];
  isReady: boolean;
  setProducts: (products: Product[]) => void;
}

export const ProductContext = createContext<ProductContextInterface>(
  {products: [], isReady: false, setProducts: (products: Product[]) => {} }
);

const ProductContextProvider = ({children}: Props) => {
  const [products, setProducts] = useState<Product[]>(shop_data);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(true);
  },[])

  return (
    <ProductContext.Provider value = {{products, isReady, setProducts}}>      
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider;
