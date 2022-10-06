import { Category } from '../../models/category.model';
import "./category-item.styles.scss";

interface Props {
  category: Category;
}

const CategoryItem = ({category}: Props) => {
  const {imageUrl, title} = category;

  return (
    <div className='category-container'>
      <div className='background-image' 
        style={{backgroundImage: `url(${imageUrl})`}}></div>
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoryItem;