import "./categories-preview.styles.scss";
//import { useCategoryContext } from "../../hooks/useCategoryContext";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectCategoriesMap } from "../../store/category/category.selector";

const CategoriesPreview = () => {

  //const {categories, isReady} = useCategoryContext();
  const categories = useAppSelector(selectCategoriesMap);

  return (
    <div className="categories-preview-container">
      { Object.keys(categories).map( title => (
        <CategoryPreview key={title} title={title} products={categories[title]}/>
      ))}
    </div>
  )
}

export default CategoriesPreview;