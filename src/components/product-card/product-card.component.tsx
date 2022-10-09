import { useCartContext } from "../../hooks/useCartContext";
import { Product } from "../../models/product.model";
import Button from "../button/button.component";
import "./product-card.styles.scss";

interface Props {
  product: Product;
}

const ProductCard = ({product}: Props) => {
  const {imageUrl, name, price} = product;
  const { addItemToCart } = useCartContext();

  const addProductToCart = () => {
    addItemToCart(product);
  }
  
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>  
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard; 
