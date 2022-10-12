import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Product } from "../../models/product.model";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { ButtonTypes } from "../button/button.component";
import "./product-card.styles.scss";

interface Props {
  product: Product;
}

const ProductCard = ({product}: Props) => {
  const {imageUrl, name, price} = product;
  //const { addItemToCart } = useCartContext();
  const dispatch = useDispatch();  
  const { cartItems } = useAppSelector(selectCartItems);  

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  }
  
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>  
        <span className="price">{price}</span>
      </div>
      <Button buttonType={ButtonTypes.Inverted} onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard; 
