import { Link } from "react-router-dom";
import { Product } from "../../models/product.model";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

interface Props {
  title: string;
  products: Product[];
}

const CategoryPreview = ({title, products}: Props) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link> 
      </h2>
      <div className="preview">
        { products
            .filter((_,idx) => idx <= 3 )
            .map( product =>(
              <ProductCard key={product.id} product={product}/>))
        }          
      </div>      
    </div>
  )
}

export default CategoryPreview;
