import { Category } from '../../models/category.model';
import DirectoryItem from '../directory-item/directory-item.component';
import "./directory.styles.scss";

interface Props {
  categories: Category[];
}

const Directory = ({categories}: Props) => {
  return (
    <div className='directory-container'>
      { categories.map( category => (
        <DirectoryItem category={category} key={category.id}/>
      ))}                      
    </div>
  )
}

export default Directory;