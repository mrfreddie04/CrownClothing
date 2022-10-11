import { Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo} from "../../assets/crown.svg";
//import { useAuthContext } from '../../hooks/useAuthContext';
import { signOutAuthUser } from '../../firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { Navigation, Logo, NavLinks, NavLink, MainContent } from "./navigation.styles";
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCartIsOpen } from '../../store/cart/cart.selector';
import { selectUser } from '../../store/user/user.selector';

const NavBar = () => {
  
  //const { user } = useAuthContext();
  const { user }  = useAppSelector(selectUser);
  const { isCartOpen } = useAppSelector(selectCartIsOpen);   

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
      <Navigation>
        <Logo to="/">
          <CrownLogo />
        </Logo>
        <NavLinks>
          {user && 
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shop">Shop</NavLink>
            </>
          }  
          {!user && <NavLink to="/auth">Sign In</NavLink>}
          {user &&
            <>
              <NavLink as="span" onClick={handleSignOut}>Logout</NavLink>
              <CartIcon />
            </>
          }          
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </Navigation>
      <MainContent>
        <Outlet></Outlet>
      </MainContent>
    </>
  );
}

export default NavBar;

//              {/* <span className='nav-link'>Hello, {user.displayName}</span> */}