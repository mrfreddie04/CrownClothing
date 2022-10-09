import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../hooks/useCartContext";
import Button from "../button/button.component";
import CartItem from "../cart-item-card/cart-item-card.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useCartContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  }
  
  return (
    <div className="cart-dropdown-container">
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.length > 0 && (
        <>
          <div className="cart-items">
            {cartItems.map( cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem}/>
            ))}  
          </div>
          <Button onClick={handleCheckout}>Go to Checkout</Button>
        </>
      )}
    </div>
  )
}

export default CartDropdown;

/* <div style={{display:"inlineBlock",whiteSpace:"nowrap"}}>Item 1 very </div>
<div>Item 2</div>
<div>Item 3</div>
<div>Item 4</div>
<div>Item 5</div>
<div>Item 6</div>
<div>Item 7</div>
<div>Item 8</div>
<div>Item 9</div>
<div>Item 10</div>
<div>Item 11</div>
<div>Item 12</div>
<div>Item 13</div>
<div>Item 14</div>
<div>Item 15</div> */