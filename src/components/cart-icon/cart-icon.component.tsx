import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg"
import { useCartContext } from "../../hooks/useCartContext";

const CartIcon = () => {
  const { isCartOpen, cartCount, setIsCartOpen } = useCartContext();

  return (
    <div className="cart-icon-container" onClick={()=>setIsCartOpen(!isCartOpen)}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon;