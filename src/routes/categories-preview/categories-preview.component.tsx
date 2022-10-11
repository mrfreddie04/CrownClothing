import "./categories-preview.styles.scss";
//import { useCategoryContext } from "../../hooks/useCategoryContext";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {

  //const {categories, isReady} = useCategoryContext();
  const { categories } = useAppSelector(selectCategoriesMap);
  const { isLoading } = useAppSelector(selectCategoriesIsLoading);

  return (
    <div className="categories-preview-container">
      {isLoading && <Spinner/>}
      {!isLoading && Object.keys(categories).map( title => (
        <CategoryPreview key={title} title={title} products={categories[title]}/>
      ))}
    </div>
  )
}

export default CategoriesPreview;