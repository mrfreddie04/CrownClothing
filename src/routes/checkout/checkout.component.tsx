import CheckoutItemCard from "../../components/checkout-item-card/checkout-item-card.component";
import { useCartContext } from "../../hooks/useCartContext";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal }  = useCartContext();
  return (
    <div className="checkout-container">
      <div className="checkout-header"> 
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map( cartItem => (
        <CheckoutItemCard key={cartItem.id} cartItem={cartItem}/>
      ))}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  )
}

export default Checkout;