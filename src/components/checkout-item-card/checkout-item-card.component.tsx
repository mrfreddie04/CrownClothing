import { useCartContext } from "../../hooks/useCartContext";
import { CartItem } from "../../models/cart.model";
import "./checkout-item-card.styles.scss";

interface Props {
  cartItem: CartItem;
}

const CheckoutItemCard = ({cartItem}: Props) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  const { removeItemFromCart, increaseQuantity, decreaseQuantity}  = useCartContext();

  return (
    <div className="checkout-item-container">
      <div className="image-container" >
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={()=>decreaseQuantity(id)}>&#10094;</span>  
        <span className="value">{quantity}</span>  
        <span className="arrow" onClick={()=>increaseQuantity(id)}>&#10095;</span>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={()=>removeItemFromCart(id)}>&#10005;</div>
    </div>
  )
}

export default CheckoutItemCard;