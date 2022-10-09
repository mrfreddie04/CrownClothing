import { useNavigate } from 'react-router-dom';
import { Category } from '../../models/category.model';
import "./directory-item.styles.scss";

interface Props {
  category: Category;
}

const DirectoryItem = ({category}: Props) => {
  const {imageUrl, title} = category;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${title}`);
  }

  return (
    <div className='directory-item-container' onClick={handleClick}>
      <div className='background-image' 
        style={{backgroundImage: `url(${imageUrl})`}}>          
      </div>
      <div className='body'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default DirectoryItem;