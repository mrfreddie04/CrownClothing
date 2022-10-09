import "./categories-preview.styles.scss";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {

  const {categories, isReady} = useCategoryContext();

  return (
    <div className="categories-preview-container">
      { isReady && Object.keys(categories).map( title => (
        <CategoryPreview key={title} title={title} products={categories[title]}/>
      ))}
    </div>
  )
}

export default CategoriesPreview;