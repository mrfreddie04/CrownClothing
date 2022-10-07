import { Link, Outlet } from 'react-router-dom';
import "./navigation.styles.scss";
import { ReactComponent as CrownLogo} from "../../assets/crown.svg";

const NavBar = () => {
  return (
    <>
      <nav className='navigation'>
        <Link to="/" className='logo-container'>
          <CrownLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/shop" className='nav-link'>Shop</Link>
          <Link to="/auth" className='nav-link'>Sign In</Link>
          <Link to="/about" className='nav-link'>About</Link>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default NavBar;