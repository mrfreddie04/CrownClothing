import "./checkout-item-card.styles.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { CartItem } from "../../models/cart.model";
import { selectCartItems } from "../../store/cart/cart.selector";
import { decreaseQuantity, increaseQuantity, removeItemFromCart } from "../../store/cart/cart.action";

interface Props {
  cartItem: CartItem;
}

const CheckoutItemCard = ({cartItem}: Props) => {
  const dispatch = useDispatch();  
  const { cartItems } = useAppSelector(selectCartItems);

  const { id, name, imageUrl, price, quantity } = cartItem;
  //const { removeItemFromCart, increaseQuantity, decreaseQuantity}  = useCartContext();

  const handleDecreaseQty = () => {
    dispatch(decreaseQuantity(cartItems, id))
  }

  const handleIncreaseQty = () => {
    dispatch(increaseQuantity(cartItems, id))
  }  

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(cartItems, id))
  }    

  return (
    <div className="checkout-item-container">
      <div className="image-container" >
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={handleDecreaseQty}>&#10094;</span>  
        <span className="value">{quantity}</span>  
        <span className="arrow" onClick={handleIncreaseQty}>&#10095;</span>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={handleRemoveItem}>&#10005;</div>
    </div>
  )
}

export default CheckoutItemCard;