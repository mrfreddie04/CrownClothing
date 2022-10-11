import "./cart-icon.styles.scss";
import { useDispatch } from 'react-redux';
import { ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg"
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectCartCount, selectCartIsOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  //const { isCartOpen, cartCount, setIsCartOpen } = useCartContext();
  const { cartCount } = useAppSelector(selectCartCount);
  const { isCartOpen } = useAppSelector(selectCartIsOpen);
  const dispatch = useDispatch();

  const handleCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  }

  return (
    <div className="cart-icon-container" onClick={handleCartOpen}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon;