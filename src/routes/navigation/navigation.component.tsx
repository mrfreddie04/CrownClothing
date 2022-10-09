import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo} from "../../assets/crown.svg";
import { useAuthContext } from '../../hooks/useAuthContext';
import { signOutAuthUser } from '../../firebase/firebase.utils';

import "./navigation.styles.scss";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { useCartContext } from '../../hooks/useCartContext';

const NavBar = () => {
  
  const { user } = useAuthContext();
  const { isCartOpen } = useCartContext();

  //console.log("Navbar render");
  const handleSignOut = async () => {
    try {
      await signOutAuthUser();
    } catch(err: any) {
      console.log("Logout failed: ", err.message);      
    }
  }

  return (
    <>
      <nav className='navigation'>
        <Link to="/" className='logo-container'>
          <CrownLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          {user && 
            <>
              <Link to="/" className='nav-link'>Home</Link>
              <Link to="/shop" className='nav-link'>Shop</Link>
            </>
          }  
          {!user && <Link to="/auth" className='nav-link'>Sign In</Link>}
          {user &&
            <>
              {/* <span className='nav-link'>Hello, {user.displayName}</span> */}
              <span className='nav-link' onClick={handleSignOut} >Logout</span>
              <CartIcon />
            </>
          }          
        </div>
        {isCartOpen && <CartDropdown/>}
      </nav>
      <div className='main-content'>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default NavBar;