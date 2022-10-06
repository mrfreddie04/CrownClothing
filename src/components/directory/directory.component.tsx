import { Category } from '../../models/category.model';
import CategoryItem from '../category-item/category-item.component';
import "./directory.styles.scss";

interface Props {
  categories: Category[];
}

const Directory = ({categories}: Props) => {
  return (
    <div className='directory-container'>
      { categories.map( category => (
        <CategoryItem category={category} key={category.id}/>
      ))}                      
    </div>
  )
}

export default Directory;