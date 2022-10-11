import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { useAppSelector } from "../../hooks/useAppSelector";
//import { useCategoryContext } from "../../hooks/useCategoryContext";
import { Product } from "../../models/product.model";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/category.selector";
import "./category.styles.scss";

const Category = () => {
  //const { categories } = useCategoryContext();
  const { categories } = useAppSelector(selectCategoriesMap);
  const { isLoading } = useAppSelector(selectCategoriesIsLoading);
  const { category } = useParams();
  const [products, setProducts] = useState<Product[] | null>(categories[category || ""]);

  useEffect(() => {
    //console.log("Category useEffect", category,categories);
    if(category && categories) {
      setProducts(categories[category]);
    }
  },[category, categories])

  return (
    <>
      {category && <h2 className="category-title">{category.toUpperCase()}</h2>}
      {isLoading && <Spinner/>}
      {!isLoading && products && 
        <>
          <div className="category-container">
            { 
              products.map( product =>(<ProductCard key={product.id} product={product}/>))
            }          
          </div>      
        </>
      }
    </>
  )
}

export default Category;